import api from "./api.js";

const partnerService = {
  async getProfile() {
    const res = await api.get("/partners/me");
    return res.data;
  },

  async updateProfile(data) {
    const res = await api.post("/partners/me", data);
    return res.data;
  },

  async register(data) {
    const payload = {
      businessName: data.businessName || data.business || "",
      businessType: data.businessType || data.category || "Restaurant",
      contactEmail: data.contactEmail || "",
      contactPhone: data.contactPhone || data.phone || "",
      address: data.address || "",
      city: data.city || "Mohali",
    };
    const res = await api.post("/partners/me", payload);
    return res.data;
  },

  async stats() {
    let profile = null;
    let myListings = [];
    let redemptions = [];
    let deals = [];

    try {
      const res = await api.get("/partners/me");
      profile = res.data;
    } catch { /* noop */ }

    try {
      const res = await api.get("/listings/my-listings");
      myListings = res.data || [];
    } catch { /* noop */ }

    try {
      const res = await api.get("/redemptions/partner-history");
      redemptions = res.data || [];
    } catch { /* noop */ }

    try {
      const res = await api.get("/deals");
      deals = res.data || [];
    } catch { /* noop */ }

    const recent = redemptions.map((r) => ({
      id: r.id,
      customer: r.userEmail ? r.userEmail.split("@")[0] : "Customer",
      code: r.redemptionCode || "REDEEM",
      time: r.redeemedAt
        ? new Date(r.redeemedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : "Recently",
      amount: 250,
    }));

    const views = myListings.reduce((acc, l) => acc + (l.reviewCount || 0) * 10 + 50, 0);
    const avgRating =
      myListings.length > 0
        ? (myListings.reduce((acc, l) => acc + (l.averageRating || 0), 0) / myListings.length).toFixed(1)
        : "0.0";

    return {
      profile,
      listingsCount: myListings.length,
      dealsCount: deals.length,
      redemptionsCount: redemptions.length,
      revenue: redemptions.length * 250,
      redemptions: redemptions.length,
      views,
      rating: Number(avgRating),
      recent,
      myListings,
      activeDeals: deals,
    };
  },
};

export default partnerService;
