import api from "./api.js";

const GRADIENTS = [
  "from-rose-500 to-fuchsia-600",
  "from-amber-500 to-rose-500",
  "from-indigo-500 to-fuchsia-500",
  "from-emerald-500 to-teal-500",
  "from-sky-500 to-indigo-500",
  "from-orange-500 to-rose-500",
];

function transformDeal(d, index = 0) {
  if (!d) return null;
  const bg = GRADIENTS[index % GRADIENTS.length];

  let formattedExpiry = "Ongoing";
  if (d.endDate) {
    try {
      const dt = new Date(d.endDate);
      formattedExpiry = dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      formattedExpiry = d.endDate;
    }
  }

  return {
    ...d,
    id: d.id,
    title: d.title || "Special Offer",
    business: d.partnerBusinessName || d.listingTitle || "Local Partner",
    listingTitle: d.listingTitle || "",
    listingId: d.listingId,
    partnerId: d.partnerId,
    expiry: formattedExpiry,
    code: d.promoCode || (d.qrCode ? d.qrCode.substring(0, 10) : "DEAL" + d.id),
    bg: bg,
    category: "food",
    description: d.description || "",
    discountPercentage: d.discountPercentage,
    discountAmount: d.discountAmount,
    terms: d.termsAndConditions || "Terms apply",
    status: d.status,
    qrCode: d.qrCode,
    redemptionCount: d.redemptionCount || 0,
  };
}

const dealService = {
  async list(category, listingId) {
    const params = {};
    if (listingId) params.listingId = listingId;
    const res = await api.get("/deals", { params });
    let items = (res.data || []).map((d, idx) => transformDeal(d, idx));

    if (category && category !== "all") {
      const catLower = category.toLowerCase();
      items = items.filter(
        (i) =>
          i.category === catLower ||
          (i.business && i.business.toLowerCase().includes(catLower)) ||
          (i.title && i.title.toLowerCase().includes(catLower))
      );
    }
    return items;
  },

  async get(id) {
    const res = await api.get(`/deals/${id}`);
    return transformDeal(res.data);
  },

  async create(data) {
    const res = await api.post("/deals", data);
    return transformDeal(res.data);
  },

  async update(id, data) {
    const res = await api.put(`/deals/${id}`, data);
    return transformDeal(res.data);
  },

  async remove(id) {
    const res = await api.delete(`/deals/${id}`);
    return res.data;
  },

  async updateStatus(id, status) {
    const res = await api.patch(`/deals/${id}/status`, { status });
    return transformDeal(res.data);
  },

  // Redemption endpoints
  async claim(dealId) {
    const res = await api.post(`/redemptions/claim/${dealId}`);
    return res.data;
  },

  async myRedemptions() {
    const res = await api.get("/redemptions/my-history");
    return res.data || [];
  },

  async partnerRedemptions() {
    const res = await api.get("/redemptions/partner-history");
    return res.data || [];
  },

  async verifyRedemption(redemptionCode) {
    const res = await api.post("/redemptions/verify", { redemptionCode });
    return res.data;
  },

  // Admin endpoints
  async adminList(status) {
    const params = {};
    if (status) params.status = status;
    const res = await api.get("/admin/deals", { params });
    return (res.data || []).map((d, idx) => transformDeal(d, idx));
  },

  async adminUpdateStatus(id, status) {
    const res = await api.patch(`/admin/deals/${id}/status`, { status });
    return transformDeal(res.data);
  },
};

export default dealService;