import { sleep } from "../utils/helpers.js";
const MOCK = [
  { id: 1, name: "Pizzarella", category: "restaurants", rating: 4.7, reviews: 1240, price: "₹₹", area: "Indiranagar", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800", tags: ["Italian", "Pizza"], desc: "Wood-fired Neapolitan pizzas with imported ingredients." },
  { id: 2, name: "Sushi Ono", category: "restaurants", rating: 4.8, reviews: 890, price: "₹₹₹", area: "Koramangala", img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800", tags: ["Japanese", "Sushi"], desc: "Authentic Edomae-style sushi and sashimi." },
  { id: 3, name: "Green Bowl", category: "restaurants", rating: 4.6, reviews: 640, price: "₹₹", area: "HSR", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", tags: ["Healthy", "Salads"], desc: "Farm-to-table salads and grain bowls." },
  { id: 4, name: "Brick & Fire", category: "restaurants", rating: 4.5, reviews: 512, price: "₹₹₹", area: "MG Road", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", tags: ["BBQ", "Grill"], desc: "Slow-smoked meats and craft cocktails." },
  { id: 5, name: "CodeCamp", category: "coaching", rating: 4.9, reviews: 320, price: "₹₹", area: "BTM", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800", tags: ["Coding", "Bootcamp"], desc: "Full-stack coding bootcamps and mentorship." },
  { id: 6, name: "Bloom Beauty", category: "beauty", rating: 4.6, reviews: 470, price: "₹₹", area: "Whitefield", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800", tags: ["Spa", "Salon"], desc: "Premium salon and spa experience." },
  { id: 7, name: "CityCabs", category: "transport", rating: 4.4, reviews: 2100, price: "₹", area: "City-wide", img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800", tags: ["Cabs", "Rides"], desc: "On-demand cabs across the city." },
  { id: 8, name: "FitZone Gym", category: "fitness", rating: 4.7, reviews: 380, price: "₹₹", area: "Jayanagar", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800", tags: ["Gym", "Trainer"], desc: "Modern gym with certified trainers." },
];
const listingService = {
  async list({ category, q, page = 1, pageSize = 12 } = {}) {
    await sleep(250);
    let items = [...MOCK];
    if (category && category !== "all") items = items.filter((i) => i.category === category);
    if (q) items = items.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()));
    const total = items.length;
    const start = (page - 1) * pageSize;
    return { items: items.slice(start, start + pageSize), total, page, pageSize };
  },
  async get(id) {
    await sleep(200);
    const item = MOCK.find((i) => String(i.id) === String(id));
    if (!item) throw new Error("Listing not found");
    return {
      ...item,
      gallery: [item.img, item.img, item.img, item.img],
      hours: "Mon–Sun · 11 AM – 11 PM",
      address: `${item.area}, Bengaluru`,
      phone: "+91 98765 43210",
      offers: [
        { code: "SAVE20", title: "20% off on total bill", expiry: "Dec 31" },
        { code: "FREEDESSERT", title: "Free dessert with any main", expiry: "Nov 30" },
      ],
      reviews: [
        { user: "Aarav", rating: 5, comment: "Absolutely loved it!", date: "2 days ago" },
        { user: "Meera", rating: 4, comment: "Great vibe and service.", date: "1 week ago" },
        { user: "Rohan", rating: 5, comment: "Best in the city.", date: "2 weeks ago" },
      ],
    };
  },
};
export default listingService;