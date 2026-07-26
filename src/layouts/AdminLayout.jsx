import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
const links = [
  { to: "/admin", label: "Overview", icon: "🛡️" },
  { to: "/admin?tab=users", label: "Users", icon: "👥" },
  { to: "/admin?tab=partners", label: "Partners", icon: "🏪" },
  { to: "/admin?tab=listings", label: "Listings", icon: "📋" },
  { to: "/admin?tab=approvals", label: "Approvals", icon: "✅" },
  { to: "/admin?tab=reports", label: "Reports", icon: "📈" },
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
