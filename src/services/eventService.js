import api from "./api.js";

const DEFAULT_EVENT_IMG = "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800";

function transformEvent(e) {
  if (!e) return null;
  const imgUrl = e.imageUrl || DEFAULT_EVENT_IMG;

  let formattedDate = "Upcoming";
  if (e.eventDate) {
    try {
      const dt = new Date(e.eventDate);
      formattedDate = dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      formattedDate = e.eventDate;
    }
  }

  const isFree = !e.ticketPrice || Number(e.ticketPrice) === 0;
  const formattedPrice = isFree ? "Free" : `₹${e.ticketPrice}`;

  return {
    ...e,
    id: e.id,
    title: e.title || "Local Event",
    img: imgUrl,
    imageUrl: imgUrl,
    date: formattedDate,
    eventDate: e.eventDate,
    venue: e.venue || (e.city ? `Venue in ${e.city}` : "Local Venue"),
    city: e.city || "",
    price: formattedPrice,
    ticketPrice: e.ticketPrice,
    free: isFree,
    description: e.description || "",
    totalTickets: e.totalTickets,
    availableTickets: e.availableTickets,
    status: e.status,
    partnerBusinessName: e.partnerBusinessName,
    listingTitle: e.listingTitle,
  };
}

const eventService = {
  // Public APIs
  async list(listingId, city) {
    const params = {};
    if (listingId) params.listingId = listingId;
    if (city) params.city = city;

    const res = await api.get("/events", { params });
    return (res.data || []).map(transformEvent);
  },

  async get(id) {
    const res = await api.get(`/events/${id}`);
    return transformEvent(res.data);
  },

  async create(data) {
    const res = await api.post("/events", data);
    return transformEvent(res.data);
  },

  async update(id, data) {
    const res = await api.put(`/events/${id}`, data);
    return transformEvent(res.data);
  },

  async remove(id) {
    const res = await api.delete(`/events/${id}`);
    return res.data;
  },

  async updateStatus(id, status) {
    const res = await api.patch(`/events/${id}/status`, { status });
    return transformEvent(res.data);
  },

  // Ticket APIs
  async claim(eventId, quantity = 1) {
    const res = await api.post("/tickets/claim", { eventId, quantity });
    return res.data;
  },

  async myTickets() {
    const res = await api.get("/tickets/my-tickets");
    return res.data || [];
  },

  async partnerEventTickets(eventId) {
    const res = await api.get(`/tickets/event/${eventId}`);
    return res.data || [];
  },

  async verifyTicket(ticketCode) {
    const res = await api.post("/tickets/verify", { ticketCode });
    return res.data;
  },

  async cancelTicket(id) {
    const res = await api.post(`/tickets/${id}/cancel`);
    return res.data;
  },

  // Admin APIs
  async adminList(status) {
    const params = {};
    if (status) params.status = status;
    const res = await api.get("/admin/events", { params });
    return (res.data || []).map(transformEvent);
  },

  async adminUpdateStatus(id, status) {
    const res = await api.patch(`/admin/events/${id}/status`, { status });
    return transformEvent(res.data);
  },
};

export default eventService;
