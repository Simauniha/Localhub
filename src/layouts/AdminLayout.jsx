import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import { ShieldIcon, UsersIcon, BuildingIcon, TagIcon, CheckIcon, BarChartIcon, CogIcon } from "../components/icons/index.jsx";
const links = [
  { to: "/admin", label: "Overview", icon: <ShieldIcon className="w-5 h-5" /> },
  { to: "/admin?tab=users", label: "Users", icon: <UsersIcon className="w-5 h-5" /> },
  { to: "/admin?tab=partners", label: "Partners", icon: <BuildingIcon className="w-5 h-5" /> },
  { to: "/admin?tab=listings", label: "Listings", icon: <TagIcon className="w-5 h-5" /> },
  { to: "/admin?tab=approvals", label: "Approvals", icon: <CheckIcon className="w-5 h-5" /> },
  { to: "/admin?tab=reports", label: "Reports", icon: <BarChartIcon className="w-5 h-5" /> },
  { to: "/admin?tab=settings", label: "Settings", icon: <CogIcon className="w-5 h-5" /> },
];
export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="flex-1 flex max-w-[1400px] w-full mx-auto">
        <Sidebar links={links} title="Admin" />
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
