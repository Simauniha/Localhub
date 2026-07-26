import { sleep } from "../utils/helpers.js";
const NOTES = [
  { id: 1, icon: "🏷️", title: "50% off at Pizzarella", body: "Ends in 3 days. Redeem before it expires!", time: "2m ago", unread: true, tone: "rose" },
  { id: 2, icon: "🎟️", title: "Sunset Jazz — tonight at 8", body: "Reminder: Your ticket QR is ready.", time: "1h ago", unread: true, tone: "fuchsia" },
  { id: 3, icon: "✅", title: "Booking confirmed", body: "Table for 2 at Sushi Ono, Nov 24 · 8:00 PM.", time: "3h ago", unread: true, tone: "emerald" },
  { id: 4, icon: "🚕", title: "15% off cab rides this weekend", body: "Use code RIDE15 at checkout.", time: "Yesterday", unread: false, tone: "sky" },
];
const notificationService = {
  async list() { await sleep(150); return NOTES; },
  async markAllRead() { await sleep(100); return { ok: true }; },
};
export default notificationService;