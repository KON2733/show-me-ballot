import express from "express";
import path from "path";
import pg from "pg";
import { fileURLToPath } from "url";
import { lookupDistrictsForAddress } from "./districts.js";
import { ISSUE_IDS, validatePicks } from "./issues.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Render (and most hosts) put a proxy in front of the app. Needed so the
// rate limiter below sees the real visitor address.
app.set("trust proxy", 1);
app.use(express.json({ limit: "2kb" }));

// Serve the frontend (public/index.html + anything else in public/)
app.use(express.static(path.join(__dirname, "public")));

// ---------------------------------------------------------------------------
// Anonymous issue counts
// Stores ONLY which issues someone picked and when. No name, address, contact
// info, IP address, or device id is stored. Needs a Postgres database; set the
// DATABASE_URL environment variable (see ISSUES-DATABASE.md). Without it the
// app still runs and /api/issues just reports that nothing was stored.
// ---------------------------------------------------------------------------
const pool = process.env.DATABASE_URL
  ? new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
    })
  : null;

async function initDb() {
  if (!pool) {
    console.warn("DATABASE_URL is not set: issue picks will not be stored.");
    return;
  }
  await pool.query(`
    CREATE TABLE IF NOT EXISTS issue_picks (
      id        BIGSERIAL PRIMARY KEY,
      picked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      issues    TEXT[] NOT NULL
    )
  `);
}

// Light abuse protection. Lives in memory only and is never written to the
// database, so the visitor address is not kept.
const hits = new Map();
function tooMany(ip) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || rec.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }
  rec.count += 1;
  return rec.count > 20;
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, rec] of hits) if (rec.resetAt < now) hits.delete(ip);
}, 10 * 60 * 1000).unref();

// POST /api/issues  { "issues": ["taxes", "schools"] }
app.post("/api/issues", async (req, res) => {
  if (tooMany(req.ip)) return res.status(429).json({ error: "Too many requests" });
  const result = validatePicks(req.body);
  if (!result.ok) return res.status(400).json({ error: result.error });
  if (!pool) return res.status(202).json({ stored: false });
  try {
    await pool.query("INSERT INTO issue_picks (issues) VALUES ($1)", [result.issues]);
    res.status(201).json({ stored: true });
  } catch (err) {
    console.error("issue_picks insert failed:", err.message);
    res.status(500).json({ error: "Could not save" });
  }
});

// GET /api/issues/summary  -> how many people picked each issue
app.get("/api/issues/summary", async (req, res) => {
  if (!pool) return res.json({ responses: 0, counts: {} });
  try {
    const total = await pool.query("SELECT count(*)::int AS n FROM issue_picks");
    const rows = await pool.query(
      "SELECT issue, count(*)::int AS n FROM issue_picks, unnest(issues) AS issue GROUP BY issue"
    );
    const counts = Object.fromEntries(ISSUE_IDS.map((id) => [id, 0]));
    for (const r of rows.rows) counts[r.issue] = r.n;
    res.json({ responses: total.rows[0].n, counts });
  } catch (err) {
    console.error("issue summary failed:", err.message);
    res.status(500).json({ error: "Could not read counts" });
  }
});

// GET /api/lookup-district?address=8640+Holmes+Rd,+Kansas+City,+MO+64131
app.get("/api/lookup-district", async (req, res) => {
  const address = (req.query.address || "").trim();

  if (!address) {
    return res.status(400).json({ error: "Missing ?address=" });
  }

  try {
    const result = await lookupDistrictsForAddress(address);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

initDb()
  .catch((err) => console.error("Database setup failed:", err.message))
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`Show-Me Ballot running at http://localhost:${PORT}`);
    });
  });
