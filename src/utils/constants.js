import { FaUtensils, FaGraduationCap, FaCalendarAlt, FaTaxi, FaSpa, FaDumbbell, FaShoppingBag, FaWrench } from "react-icons/fa";

export const APP_NAME = "LocalHub";
export const CATEGORIES = [
  { id: "restaurants", name: "Restaurants", icon: FaUtensils, color: "from-rose-500 to-fuchsia-600" },
  { id: "coaching", name: "Coaching", icon: FaGraduationCap, color: "from-indigo-500 to-fuchsia-500" },
  { id: "events", name: "Events", icon: FaCalendarAlt, color: "from-amber-500 to-rose-500" },
  { id: "transport", name: "Transport", icon: FaTaxi, color: "from-sky-500 to-indigo-500" },
  { id: "beauty", name: "Beauty & Spa", icon: FaSpa, color: "from-pink-500 to-rose-500" },
  { id: "fitness", name: "Fitness", icon: FaDumbbell, color: "from-emerald-500 to-teal-500" },
  { id: "shopping", name: "Shopping", icon: FaShoppingBag, color: "from-purple-500 to-indigo-500" },
  { id: "services", name: "Services", icon: FaWrench, color: "from-orange-500 to-red-500" },
];
export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/listings", label: "Listings" },
  { to: "/deals", label: "Deals" },
  { to: "/events", label: "Events" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8081/api/v1";
