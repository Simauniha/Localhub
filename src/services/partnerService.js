import { sleep } from "../utils/helpers.js";
const partnerService = {
  async register(data) { await sleep(400); return { ok: true, id: Date.now(), ...data }; },
  async stats() {
    await sleep(200);
    return {
      revenue: 128450,
      redemptions: 342,
      views: 15680,
      rating: 4.7,
      recent: [
        { id: 1, code: "PIZZA50", customer: "Aarav S.", time: "2m ago", amount: 480 },
        { id: 2, code: "BLOOM30", customer: "Meera K.", time: "18m ago", amount: 720 },
        { id: 3, code: "PIZZA50", customer: "Rohan M.", time: "1h ago", amount: 550 },
        { id: 4, code: "FIREJUICE", customer: "Isha D.", time: "3h ago", amount: 150 },
      ],
    };
  },
};
export default partnerService;
