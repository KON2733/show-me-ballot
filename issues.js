// The issue list people can pick from on the opening screen.
// Keep this in sync with ISSUES in public/app.jsx (ids only).
export const ISSUE_IDS = [
  "taxes",
  "schools",
  "safety",
  "health",
  "housing",
  "jobs",
  "roads",
  "environment",
  "abortion",
  "guns",
];
export const MAX_PICKS = 5;

/**
 * Checks a POST /api/issues body. Returns { ok: true, issues } with a clean,
 * de-duplicated list, or { ok: false, error }. Only known issue ids are accepted,
 * so nothing free-form (names, addresses, etc.) can be stored.
 */
export function validatePicks(body) {
  const raw = body && body.issues;
  if (!Array.isArray(raw)) return { ok: false, error: "issues must be a list" };
  const issues = [...new Set(raw)];
  if (issues.length < 1) return { ok: false, error: "Pick at least one issue" };
  if (issues.length > MAX_PICKS) return { ok: false, error: `Pick at most ${MAX_PICKS} issues` };
  if (!issues.every((id) => typeof id === "string" && ISSUE_IDS.includes(id))) {
    return { ok: false, error: "Unknown issue" };
  }
  return { ok: true, issues };
}
