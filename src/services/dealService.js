import { sleep } from "../utils/helpers.js";
const DEALS = [
  { id: 1, title: "50% off wood-fired pizza", business: "Pizzarella", expiry: "Dec 31", code: "PIZZA50", bg: "from-rose-500 to-fuchsia-600", category: "food" },
  { id: 2, title: "30% off haircut & spa", business: "Bloom Beauty", expiry: "Nov 30", code: "BLOOM30", bg: "from-amber-500 to-rose-500", category: "beauty" },
  { id: 3, title: "Buy 1 Get 1 — coding course", business: "CodeCamp", expiry: "Jan 15", code: "CODE2X", bg: "from-indigo-500 to-fuchsia-500", category: "coaching" },
  { id: 4, title: "Free dessert with mains", business: "Green Bowl", expiry: "Dec 05", code: "BOWLFREE", bg: "from-emerald-500 to-teal-500", category: "food" },
  { id: 5, title: "15% off cab rides", business: "CityCabs", expiry: "Dec 20", code: "RIDE15", bg: "from-sky-500 to-indigo-500", category: "transport" },
  { id: 6, title: "Complimentary mocktail", business: "Brick & Fire", expiry: "Dec 31", code: "FIREJUICE", bg: "from-orange-500 to-rose-500", category: "food" },
];
const dealService = {
  async list(category) {
    await sleep(200);
    if (!category || category === "all") return DEALS;
    return DEALS.filter((d) => d.category === category);
  },
  async redeem(code) {
    await sleep(300);
    return { ok: true, code, redeemedAt: new Date().toISOString() };
  },
};
export default dealService;