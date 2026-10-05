import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { lookupDistrictsForAddress } from "./districts.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Serve the frontend (public/index.html + anything else in public/)
app.use(express.static(path.join(__dirname, "public")));

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

app.listen(PORT, () => {
  console.log(`Show-Me Ballot running at http://localhost:${PORT}`);
});
