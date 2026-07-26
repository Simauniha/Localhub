export const formatCurrency = (n, currency = "INR") =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
export const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
export const classNames = (...c) => c.filter(Boolean).join(" ");
export const truncate = (s, n = 100) => (s && s.length > n ? s.slice(0, n) + "…" : s);
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
