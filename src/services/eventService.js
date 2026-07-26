import { sleep } from "../utils/helpers.js";
const EVENTS = [
  { id: 1, img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800", title: "Sunset Jazz Night", date: "Nov 24", venue: "Marina Amphitheatre", price: "Free", free: true },
  { id: 2, img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800", title: "TechTalks Meetup", date: "Dec 02", venue: "Innov8 HSR", price: "₹299", free: false },
  { id: 3, img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800", title: "Food Truck Festival", date: "Dec 10", venue: "Cubbon Park", price: "Free", free: true },
  { id: 4, img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", title: "Indie Film Screening", date: "Dec 14", venue: "PVR Forum", price: "₹199", free: false },
  { id: 5, img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800", title: "Marathon 10K", date: "Dec 22", venue: "MG Road", price: "₹499", free: false },
  { id: 6, img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800", title: "NYE Rooftop Party", date: "Dec 31", venue: "Sky Bar", price: "₹1,999", free: false },
];
const eventService = {
  async list() { await sleep(200); return EVENTS; },
  async claim(id) { await sleep(300); return { ok: true, ticketId: `TKT-${id}-${Date.now()}` }; },
};
export default eventService;
