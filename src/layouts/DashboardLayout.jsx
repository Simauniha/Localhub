import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
const links = [
  { to: "/dashboard", label: "Overview", icon: "📊" },
  { to: "/partner/dashboard", label: "Partner Hub", icon: "🏪" },
  { to: "/listings", label: "Listings", icon: "📋" },
  { to: "/deals", label: "Deals", icon: "🏷️" },
  { to: "/notifications", label: "Notifications", icon: "🔔" },
  { to: "/profile", label: "Profile", icon: "👤" },
];
export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="flex-1 flex max-w-[1400px] w-full mx-auto">
        <Sidebar links={links} title="Dashboard" />
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
