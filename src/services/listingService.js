import api from "./api.js";

const DEFAULT_IMG = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800";

function transformListing(l) {
  if (!l) return null;
  const imgUrl = l.imageUrl || DEFAULT_IMG;
  return {
    ...l,
    id: l.id,
    name: l.title || l.name || "Untitled Listing",
    title: l.title || l.name || "Untitled Listing",
    img: imgUrl,
    imageUrl: imgUrl,
    rating: l.averageRating !== undefined && l.averageRating !== null ? l.averageRating : 4.5,
    reviews: l.reviewCount !== undefined && l.reviewCount !== null ? l.reviewCount : 0,
    price: l.priceRange || "₹₹",
    area: l.city || l.address || "Local Area",
    address: l.address || (l.city ? `City Center, ${l.city}` : "Local Address"),
    phone: l.phone || "+91 98765 43210",
    hours: l.openingHours || "Mon–Sun · 11 AM – 11 PM",
    desc: l.description || "Local business listing offering quality products and services.",
    description: l.description || "Local business listing offering quality products and services.",
    category: l.categoryName ? l.categoryName.toLowerCase() : "general",
    categoryName: l.categoryName || "General",
    tags: l.categoryName ? [l.categoryName] : [],
    gallery: [imgUrl, imgUrl, imgUrl, imgUrl],
    offers: l.offers || [],
    reviewsList: l.reviewsList || [],
  };
}

const listingService = {
  async list({ category, q, page = 1, pageSize = 8, city } = {}) {
    const params = {};
    if (q) params.search = q;
    if (city) params.city = city;

    const res = await api.get("/listings", { params });
    let items = (res.data || []).map(transformListing);

    if (category && category !== "all") {
      const catLower = category.toLowerCase();
      items = items.filter(
        (item) =>
          item.category === catLower ||
          item.categoryName.toLowerCase() === catLower ||
          item.categoryName.toLowerCase().includes(catLower)
      );
    }

    const total = items.length;
    const start = (page - 1) * pageSize;
    const sliced = items.slice(start, start + pageSize);

    return {
      items: sliced,
      total,
      page,
      pageSize,
    };
  },

  async get(id) {
    const res = await api.get(`/listings/${id}`);
    return transformListing(res.data);
  },

  async myListings() {
    const res = await api.get("/listings/my-listings");
    return (res.data || []).map(transformListing);
  },

  async create(data) {
    const res = await api.post("/listings", data);
    return transformListing(res.data);
  },

  async update(id, data) {
    const res = await api.put(`/listings/${id}`, data);
    return transformListing(res.data);
  },

  async remove(id) {
    const res = await api.delete(`/listings/${id}`);
    return res.data;
  },
};

export default listingService;