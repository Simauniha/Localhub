import api from "./api.js";

const authService = {
  async login(email, password) {
    const res = await api.post("/auth/login", { email, password });
    const data = res.data;
    const userObj = {
      ...data.user,
      token: data.token,
      tokenType: data.tokenType || "Bearer",
    };
    return userObj;
  },

  async register(data) {
    const res = await api.post("/auth/register", data);
    const resData = res.data;
    const userObj = {
      ...resData.user,
      token: resData.token,
      tokenType: resData.tokenType || "Bearer",
    };
    return userObj;
  },

  async me() {
    const res = await api.get("/auth/me");
    return res.data;
  },

  async forgotPassword(email) {
    return { ok: true, email };
  },
};

export default authService;
