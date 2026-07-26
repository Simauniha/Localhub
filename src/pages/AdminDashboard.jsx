import { useEffect, useState } from "react";
import AnalyticsCard from "../components/AnalyticsCard/AnalyticsCard.jsx";
import Loader from "../components/Loader/Loader.jsx";
import adminService from "../services/adminService.js";
import useNotify from "../hooks/useNotify.js";
import { formatCurrency } from "../utils/helpers.js";
export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const { notify } = useNotify();
  useEffect(() => { adminService.stats().then(setStats); }, []);
  if (!stats) return <Loader />;
  const act = async (fn, id) => { await fn(id); await adminService.stats().then(setStats); };
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-extrabold">Admin overview</h1>
      <p className="text-slate-500 mt-1">Platform health at a glance.</p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard label="Users" value={stats.users.toLocaleString()} delta={11} icon="👥" tone="sky" />
        <AnalyticsCard label="Partners" value={stats.partners} delta={7} icon="🏪" tone="rose" />
        <AnalyticsCard label="Listings" value={stats.listings} delta={4} icon="📋" tone="amber" />
        <AnalyticsCard label="Revenue" value={formatCurrency(stats.revenue)} delta={18} icon="💰" tone="emerald" />
      </div>
      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-lg">Pending approvals</h3>
          <ul className="mt-3 divide-y divide-slate-100 dark:divide-slate-700">
            {stats.pendingApprovals.map((a) => (
              <li key={a.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{a.name}</div>
                  <div className="text-xs text-slate-500">{a.type} · {a.submitted}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { act(adminService.approve, a.id); notify("Approved ✅", "success"); }} className="btn-primary text-xs">Approve</button>
                  <button onClick={() => { act(adminService.reject, a.id); notify("Rejected", "error"); }} className="btn-ghost text-xs">Reject</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-lg">Recent users</h3>
          <ul className="mt-3 divide-y divide-slate-100 dark:divide-slate-700">
            {stats.recentUsers.map((u) => (
              <li key={u.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{u.name}</div>
                  <div className="text-xs text-slate-500">{u.email}</div>
                </div>
                <div className="text-xs text-slate-500">{u.joined}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
        <h3 className="font-bold text-lg">Reports</h3>
        <div className="mt-4 grid sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900"><div className="text-2xl font-extrabold text-brand">98.7%</div><div className="text-xs text-slate-500">Uptime</div></div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900"><div className="text-2xl font-extrabold text-brand">3.2s</div><div className="text-xs text-slate-500">Avg. response</div></div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900"><div className="text-2xl font-extrabold text-brand">4.8/5</div><div className="text-xs text-slate-500">Customer sat.</div></div>
        </div>
      </div>
    </div>
  );
}
