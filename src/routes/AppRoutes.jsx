import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Listings from "../pages/Listings.jsx";
import ListingDetails from "../pages/ListingDetails.jsx";
import Deals from "../pages/Deals.jsx";
import Events from "../pages/Events.jsx";
import QRRedemption from "../pages/QRRedemption.jsx";
import PartnerRegister from "../pages/PartnerRegister.jsx";
import PartnerDashboard from "../pages/PartnerDashboard.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import Notifications from "../pages/Notifications.jsx";
import Profile from "../pages/Profile.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Privacy from "../pages/Privacy.jsx";
import Terms from "../pages/Terms.jsx";
import NotFound from "../pages/NotFound.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/events" element={<Events />} />
        <Route path="/qr" element={<QRRedemption />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/partner" element={<PartnerRegister />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/partner/dashboard" element={<ProtectedRoute roles={["PARTNER", "ADMIN"]}><PartnerDashboard /></ProtectedRoute>} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<ProtectedRoute roles={["ADMIN"]}><AdminDashboard /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}