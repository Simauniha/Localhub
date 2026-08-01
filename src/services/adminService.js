import api from "./api.js";

const adminService = {
  async getUsers() {
    const res = await api.get("/admin/users");
    return res.data || [];
  },

  async getPartners(status) {
    const params = status ? { status } : {};
    const res = await api.get("/admin/partners", { params });
    return res.data || [];
  },

  async updatePartnerStatus(id, status) {
    const res = await api.patch(`/admin/partners/${id}/status`, { status });
    return res.data;
  },

  async getListings(status) {
    const params = status ? { status } : {};
    const res = await api.get("/admin/listings", { params });
    return res.data || [];
  },

  async updateListingStatus(id, status) {
    const res = await api.patch(`/admin/listings/${id}/status`, { status });
    return res.data;
  },

  async getDeals(status) {
    const params = status ? { status } : {};
    const res = await api.get("/admin/deals", { params });
    return res.data || [];
  },

  async updateDealStatus(id, status) {
    const res = await api.patch(`/admin/deals/${id}/status`, { status });
    return res.data;
  },

  async getEvents(status) {
    const params = status ? { status } : {};
    const res = await api.get("/admin/events", { params });
    return res.data || [];
  },

  async updateEventStatus(id, status) {
    const res = await api.patch(`/admin/events/${id}/status`, { status });
    return res.data;
  },

  async stats() {
    let users = [];
    let partners = [];
    let listings = [];

    try {
      users = await adminService.getUsers();
    } catch { /* noop */ }

    try {
      partners = await adminService.getPartners();
    } catch { /* noop */ }

    try {
      listings = await adminService.getListings();
    } catch { /* noop */ }

    const pendingApprovals = partners
      .filter((p) => p.status === "PENDING")
      .map((p) => ({
        id: p.id,
        name: p.businessName || "Partner",
        type: p.businessType || "Business",
        submitted: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "Recently",
      }));

    const recentUsers = users.slice(0, 5).map((u) => ({
      id: u.id,
      name: u.name || u.fullName || (u.email ? u.email.split("@")[0] : "User"),
      email: u.email,
      joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "Recently",
    }));

    return {
      usersCount: users.length,
      users: users.length,
      partnersCount: partners.length,
      partners: partners.length,
      listingsCount: listings.length,
      listings: listings.length,
      revenue: listings.length * 1500,
      pendingApprovals,
      recentUsers,
      rawUsers: users,
      rawPartners: partners,
      rawListings: listings,
    };
  },

  async approve(id) {
    return adminService.updatePartnerStatus(id, "APPROVED");
  },

  async reject(id) {
    return adminService.updatePartnerStatus(id, "REJECTED");
  },

  async getSettings() {
    const res = await api.get("/admin/settings");
    return res.data || {};
  },

  async updateSettings(settings) {
    const res = await api.put("/admin/settings", settings);
    return res.data || {};
  },

  async testGooglePlaces(apiKey) {
    const res = await api.post("/admin/settings/test-google-places", { google_places_api_key: apiKey });
    return res.data;
  },
};

export default adminService;