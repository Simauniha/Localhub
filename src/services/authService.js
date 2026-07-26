import { sleep } from "../utils/helpers.js";
// import api from "./api.js"; // wire up when Spring Boot is ready
const authService = {
  async login(email, password) {
    await sleep(400);
    // return (await api.post("/auth/login", { email, password })).data;
    return { id: 1, name: "Demo User", email, token: "mock-token", role: "user" };
  },
  async register(data) {
    await sleep(400);
    // return (await api.post("/auth/register", data)).data;
    return { id: 2, name: data.name || "New User", email: data.email, token: "mock-token", role: "user" };
  },
  async forgotPassword(email) {
    await sleep(300);
    return { ok: true, email };
  },
};
export default authService;
