// Daily keep-alive for the free Supabase databases (scheduled in vercel.json).
// Free projects pause after ~7 days without activity; one request a day prevents that.
// Database URLs and keys come from the project's environment variables.
// Vercel sends "Authorization: Bearer <CRON_SECRET>" with its cron requests, so only the cron can run this.
const { timingSafeEqual } = require("crypto");

const TARGETS = [
  {
    name: "registru",
    url: process.env.SUPABASE_REGISTRU_URL,
    key: process.env.SUPABASE_REGISTRU_KEY,
    // limit=0: the query runs (counts as activity) but returns no rows
    path: "/rest/v1/app_settings?select=*&limit=0",
    method: "GET",
  },
  {
    name: "cv",
    url: process.env.SUPABASE_CV_URL,
    key: process.env.SUPABASE_CV_KEY,
    path: "/rest/v1/rpc/ping",
    method: "POST",
    body: JSON.stringify({ source: "vercel-cron" }),
  },
];

function authorized(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // no secret configured: stay closed
  const given = Buffer.from(req.headers.authorization || "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!authorized(req)) return res.status(401).json({ ok: false });

  const results = await Promise.all(TARGETS.map(async (t) => {
    if (!t.url || !t.key) return { name: t.name, ok: false, error: "missing env vars" };
    try {
      const r = await fetch(t.url + t.path, {
        method: t.method,
        headers: { apikey: t.key, "Content-Type": "application/json" },
        body: t.body,
        signal: AbortSignal.timeout(15000),
      });
      return { name: t.name, ok: r.ok, status: r.status };
    } catch (e) {
      return { name: t.name, ok: false, error: String(e) };
    }
  }));
  const ok = results.every((r) => r.ok);
  // Details go to the private Vercel logs, never to the public response.
  if (!ok) console.error("keepalive failed", results);
  res.status(ok ? 200 : 502).json({ ok, at: new Date().toISOString() });
};
