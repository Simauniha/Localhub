import { sleep } from "../utils/helpers.js";
const adminService = {
  async stats() {
    await sleep(200);
    return {
      users: 12480,
      partners: 342,
      listings: 986,
      revenue: 2840500,
      pendingApprovals: [
        { id: 1, name: "Cafe Aroma", type: "Restaurant", submitted: "1h ago" },
        { id: 2, name: "SpeakUp Coaching", type: "Coaching", submitted: "3h ago" },
        { id: 3, name: "GlamNest Spa", type: "Beauty", submitted: "1d ago" },
      ],
      recentUsers: [
        { id: 1, name: "Aarav Sharma", email: "aarav@example.com", joined: "Today" },
        { id: 2, name: "Meera Kapoor", email: "meera@example.com", joined: "Yesterday" },
        { id: 3, name: "Rohan Mehta", email: "rohan@example.com", joined: "2d ago" },
      ],
    };
  },
  async approve(id) { await sleep(200); return { ok: true, id }; },
  async reject(id) { await sleep(200); return { ok: true, id }; },
};
export default adminService;