import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import { BarChartIcon, BuildingIcon, TagIcon, BellIcon, UserIcon } from "../components/icons/index.jsx";
const links = [
  { to: "/dashboard", label: "Overview", icon: <BarChartIcon className="w-5 h-5" /> },
  { to: "/partner/dashboard", label: "Partner Hub", icon: <BuildingIcon className="w-5 h-5" /> },
  { to: "/listings", label: "Listings", icon: <TagIcon className="w-5 h-5" /> },
  { to: "/deals", label: "Deals", icon: <TagIcon className="w-5 h-5" /> },
  { to: "/notifications", label: "Notifications", icon: <BellIcon className="w-5 h-5" /> },
  { to: "/profile", label: "Profile", icon: <UserIcon className="w-5 h-5" /> },
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
