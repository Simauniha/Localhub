import { useEffect, useState } from "react";
import AnalyticsCard from "../components/AnalyticsCard/AnalyticsCard.jsx";
import ProfileCard from "../components/ProfileCard/ProfileCard.jsx";
import Loader from "../components/Loader/Loader.jsx";
import useAuth from "../hooks/useAuth.js";
import partnerService from "../services/partnerService.js";
import { formatCurrency } from "../utils/helpers.js";
import { TagIcon, DollarIcon, CalendarIcon, StarIcon } from "../components/icons/index.jsx";
export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  useEffect(() => { partnerService.stats().then(setStats); }, []);
  if (!stats) return <Loader />;
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-extrabold">Welcome back, {user?.name?.split(" ")[0]} 👋</h1>
      <p className="text-slate-500 mt-1">Here's what's happening in your account today.</p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard label="Total redemptions" value={stats.redemptions} delta={12} icon={<TagIcon className="w-5 h-5" />} tone="rose" />
        <AnalyticsCard label="Total savings" value={formatCurrency(stats.revenue / 4)} delta={8} icon={<DollarIcon className="w-5 h-5" />} tone="emerald" />
        <AnalyticsCard label="Bookings" value="24" delta={-3} icon={<CalendarIcon className="w-5 h-5" />} tone="sky" />
        <AnalyticsCard label="Loyalty points" value="1,240" delta={22} icon={<StarIcon className="w-5 h-5" />} tone="amber" />
      </div>
      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-lg">Recent activity</h3>
          <ul className="mt-4 divide-y divide-slate-100 dark:divide-slate-700">
            {stats.recent.map((r) => (
              <li key={r.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{r.customer}</div>
                  <div className="text-xs text-slate-500">Code {r.code} · {r.time}</div>
                </div>
                <div className="font-bold text-brand">{formatCurrency(r.amount)}</div>
              </li>
            ))}
          </ul>
        </div>
        <ProfileCard user={user} />
      </div>
    </div>
  );
}