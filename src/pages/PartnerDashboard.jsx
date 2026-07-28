import { useEffect, useState } from "react";
import AnalyticsCard from "../components/AnalyticsCard/AnalyticsCard.jsx";
import Loader from "../components/Loader/Loader.jsx";
import partnerService from "../services/partnerService.js";
import { formatCurrency } from "../utils/helpers.js";
import { DollarIcon, TagIcon, EyeIcon, StarIcon } from "../components/icons/index.jsx";
export default function PartnerDashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => { partnerService.stats().then(setStats); }, []);
  if (!stats) return <Loader />;
  const chartBars = [30, 45, 38, 62, 55, 78, 90, 72, 84, 66, 92, 100];
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-extrabold">Partner Hub</h1>
      <p className="text-slate-500 mt-1">Track redemptions, revenue & customer insights.</p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard label="Revenue (this month)" value={formatCurrency(stats.revenue)} delta={14} icon={<DollarIcon className="w-5 h-5" />} tone="emerald" />
        <AnalyticsCard label="Redemptions" value={stats.redemptions} delta={9} icon={<TagIcon className="w-5 h-5" />} tone="rose" />
        <AnalyticsCard label="Listing views" value={stats.views.toLocaleString()} delta={22} icon={<EyeIcon className="w-5 h-5" />} tone="sky" />
        <AnalyticsCard label="Avg. rating" value={stats.rating} delta={2} icon={<StarIcon className="w-5 h-5" />} tone="amber" />
      </div>
      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Redemptions — last 12 weeks</h3>
            <span className="text-xs text-slate-500">Chart preview</span>
          </div>
          <div className="flex items-end gap-2 h-48">
            {chartBars.map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-brand to-accent rounded-t-md" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-lg">Recent redemptions</h3>
          <ul className="mt-3 divide-y divide-slate-100 dark:divide-slate-700">
            {stats.recent.map((r) => (
              <li key={r.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">{r.customer}</div>
                  <div className="text-xs text-slate-500">{r.code} · {r.time}</div>
                </div>
                <div className="font-bold text-brand text-sm">{formatCurrency(r.amount)}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-lg">My listings</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700"><span>Pizzarella</span><span className="text-emerald-600 font-semibold">Active</span></li>
            <li className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700"><span>Green Bowl</span><span className="text-emerald-600 font-semibold">Active</span></li>
            <li className="flex items-center justify-between py-2"><span>Brick & Fire</span><span className="text-amber-600 font-semibold">Pending</span></li>
          </ul>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-lg">Active deals</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700"><span>PIZZA50 — 50% off</span><span className="text-slate-500">42 redeemed</span></li>
            <li className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700"><span>BOWLFREE — Free dessert</span><span className="text-slate-500">18 redeemed</span></li>
            <li className="flex items-center justify-between py-2"><span>FIREJUICE — Free mocktail</span><span className="text-slate-500">12 redeemed</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
