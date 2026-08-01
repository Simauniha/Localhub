import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AnalyticsCard from "../components/AnalyticsCard/AnalyticsCard.jsx";
import Loader from "../components/Loader/Loader.jsx";
import adminService from "../services/adminService.js";
import useNotify from "../hooks/useNotify.js";
import { formatCurrency } from "../utils/helpers.js";
import { UsersIcon, BuildingIcon, TagIcon, DollarIcon } from "../components/icons/index.jsx";
import AdminSettings from "./AdminSettings.jsx";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "overview";
  const { notify } = useNotify();

  const loadData = async () => {
    const s = await adminService.stats();
    setStats(s);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!stats) return <Loader />;

  const handlePartnerStatus = async (id, status) => {
    try {
      await adminService.updatePartnerStatus(id, status);
      notify(`Partner ${status.toLowerCase()} successfully`, "success");
      await loadData();
    } catch {
      notify("Failed to update partner status", "error");
    }
  };

  const handleListingStatus = async (id, status) => {
    try {
      await adminService.updateListingStatus(id, status);
      notify(`Listing ${status.toLowerCase()} successfully`, "success");
      await loadData();
    } catch {
      notify("Failed to update listing status", "error");
    }
  };

  const renderContent = () => {
    if (tab === "settings") {
      return <AdminSettings />;
    }

    if (tab === "users") {
      const usersList = stats.rawUsers || [];
      return (
        <div>
          <h1 className="text-3xl font-extrabold">Users</h1>
          <p className="text-slate-500 mt-1">Platform user accounts ({usersList.length} total).</p>
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 overflow-x-auto">
            {usersList.length === 0 ? (
              <p className="text-slate-500 text-sm py-4">No users found.</p>
            ) : (
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400">
                    <th className="pb-3 font-semibold">User</th>
                    <th className="pb-3 font-semibold">Email</th>
                    <th className="pb-3 font-semibold">Phone</th>
                    <th className="pb-3 font-semibold">Role</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50">
                      <td className="py-3 font-medium">{u.name || u.fullName || u.email?.split("@")[0]}</td>
                      <td className="py-3 text-slate-500">{u.email}</td>
                      <td className="py-3 text-slate-500">{u.phone || "—"}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          u.role === "ADMIN" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" :
                          u.role === "PARTNER" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300" :
                          "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                        }`}>
                          {u.role || "USER"}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="text-xs text-emerald-600 font-semibold">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );
    }

    if (tab === "partners") {
      const partnersList = stats.rawPartners || [];
      return (
        <div>
          <h1 className="text-3xl font-extrabold">Partners</h1>
          <p className="text-slate-500 mt-1">Registered partner profiles ({partnersList.length} total).</p>
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 overflow-x-auto">
            {partnersList.length === 0 ? (
              <p className="text-slate-500 text-sm py-4">No partners registered yet.</p>
            ) : (
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400">
                    <th className="pb-3 font-semibold">Business Name</th>
                    <th className="pb-3 font-semibold">Category / Type</th>
                    <th className="pb-3 font-semibold">City</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {partnersList.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50">
                      <td className="py-3 font-medium">{p.businessName || "Partner"}</td>
                      <td className="py-3 text-slate-500">{p.businessType || "Business"}</td>
                      <td className="py-3 text-slate-500">{p.city || "—"}</td>
                      <td className="py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          p.status === "APPROVED" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" :
                          p.status === "REJECTED" ? "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300" :
                          "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                        }`}>
                          {p.status || "PENDING"}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          {p.status !== "APPROVED" && (
                            <button onClick={() => handlePartnerStatus(p.id, "APPROVED")} className="btn-primary text-xs py-1 px-2.5">Approve</button>
                          )}
                          {p.status !== "REJECTED" && (
                            <button onClick={() => handlePartnerStatus(p.id, "REJECTED")} className="btn-ghost text-xs py-1 px-2.5">Reject</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );
    }

    if (tab === "listings") {
      const listingsList = stats.rawListings || [];
      return (
        <div>
          <h1 className="text-3xl font-extrabold">Listings</h1>
          <p className="text-slate-500 mt-1">Platform business listings ({listingsList.length} total).</p>
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 overflow-x-auto">
            {listingsList.length === 0 ? (
              <p className="text-slate-500 text-sm py-4">No listings found.</p>
            ) : (
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400">
                    <th className="pb-3 font-semibold">Title</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">City</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {listingsList.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50">
                      <td className="py-3 font-medium">{l.title}</td>
                      <td className="py-3 text-slate-500">{l.categoryName || l.category?.name || "General"}</td>
                      <td className="py-3 text-slate-500">{l.city || "—"}</td>
                      <td className="py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          l.status === "APPROVED" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" :
                          l.status === "REJECTED" ? "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300" :
                          "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                        }`}>
                          {l.status || "PENDING"}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          {l.status !== "APPROVED" && (
                            <button onClick={() => handleListingStatus(l.id, "APPROVED")} className="btn-primary text-xs py-1 px-2.5">Approve</button>
                          )}
                          {l.status !== "REJECTED" && (
                            <button onClick={() => handleListingStatus(l.id, "REJECTED")} className="btn-ghost text-xs py-1 px-2.5">Reject</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );
    }

    if (tab === "approvals") {
      const pendingPartners = (stats.rawPartners || []).filter((p) => p.status === "PENDING");
      const pendingListings = (stats.rawListings || []).filter((l) => l.status === "PENDING");
      const totalPending = pendingPartners.length + pendingListings.length;

      return (
        <div>
          <h1 className="text-3xl font-extrabold">Approvals</h1>
          <p className="text-slate-500 mt-1">Manage pending partner applications and listings ({totalPending} pending).</p>

          <div className="mt-8 space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-lg mb-4">Pending Partner Registrations ({pendingPartners.length})</h3>
              {pendingPartners.length === 0 ? (
                <p className="text-slate-500 text-sm py-2">No pending partner applications.</p>
              ) : (
                <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                  {pendingPartners.map((p) => (
                    <li key={p.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{p.businessName || "Partner"}</div>
                        <div className="text-xs text-slate-500">{p.businessType || "Business"} · {p.city || "N/A"}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handlePartnerStatus(p.id, "APPROVED")} className="btn-primary text-xs">Approve</button>
                        <button onClick={() => handlePartnerStatus(p.id, "REJECTED")} className="btn-ghost text-xs">Reject</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-lg mb-4">Pending Business Listings ({pendingListings.length})</h3>
              {pendingListings.length === 0 ? (
                <p className="text-slate-500 text-sm py-2">No pending listings.</p>
              ) : (
                <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                  {pendingListings.map((l) => (
                    <li key={l.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{l.title}</div>
                        <div className="text-xs text-slate-500">{l.categoryName || l.category?.name || "Listing"} · {l.city || "N/A"}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleListingStatus(l.id, "APPROVED")} className="btn-primary text-xs">Approve</button>
                        <button onClick={() => handleListingStatus(l.id, "REJECTED")} className="btn-ghost text-xs">Reject</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (tab === "reports") {
      return (
        <div>
          <h1 className="text-3xl font-extrabold">Reports & System Health</h1>
          <p className="text-slate-500 mt-1">Comprehensive metric performance and system reports.</p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnalyticsCard label="Total Users" value={stats.users.toLocaleString()} delta={11} icon={<UsersIcon className="w-5 h-5" />} tone="sky" />
            <AnalyticsCard label="Total Partners" value={stats.partners} delta={7} icon={<BuildingIcon className="w-5 h-5" />} tone="rose" />
            <AnalyticsCard label="Active Listings" value={stats.listings} delta={4} icon={<TagIcon className="w-5 h-5" />} tone="amber" />
            <AnalyticsCard label="Est. Revenue" value={formatCurrency(stats.revenue)} delta={18} icon={<DollarIcon className="w-5 h-5" />} tone="emerald" />
          </div>

          <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-lg mb-4">System Performance Metrics</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900">
                <div className="text-2xl font-extrabold text-brand">98.7%</div>
                <div className="text-xs text-slate-500 mt-1">Platform Uptime</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900">
                <div className="text-2xl font-extrabold text-brand">3.2s</div>
                <div className="text-xs text-slate-500 mt-1">Average Response Time</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900">
                <div className="text-2xl font-extrabold text-brand">4.8/5</div>
                <div className="text-xs text-slate-500 mt-1">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <h1 className="text-3xl font-extrabold">Admin overview</h1>
        <p className="text-slate-500 mt-1">Platform health at a glance.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnalyticsCard label="Users" value={stats.users.toLocaleString()} delta={11} icon={<UsersIcon className="w-5 h-5" />} tone="sky" />
          <AnalyticsCard label="Partners" value={stats.partners} delta={7} icon={<BuildingIcon className="w-5 h-5" />} tone="rose" />
          <AnalyticsCard label="Listings" value={stats.listings} delta={4} icon={<TagIcon className="w-5 h-5" />} tone="amber" />
          <AnalyticsCard label="Revenue" value={formatCurrency(stats.revenue)} delta={18} icon={<DollarIcon className="w-5 h-5" />} tone="emerald" />
        </div>
        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-lg">Pending approvals</h3>
            {stats.pendingApprovals.length === 0 ? (
              <p className="text-xs text-slate-500 mt-3">No pending approvals.</p>
            ) : (
              <ul className="mt-3 divide-y divide-slate-100 dark:divide-slate-700">
                {stats.pendingApprovals.map((a) => (
                  <li key={a.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{a.name}</div>
                      <div className="text-xs text-slate-500">{a.type} · {a.submitted}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handlePartnerStatus(a.id, "APPROVED")} className="btn-primary text-xs">Approve</button>
                      <button onClick={() => handlePartnerStatus(a.id, "REJECTED")} className="btn-ghost text-xs">Reject</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
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
      </>
    );
  };

  return (
    <div className="fade-in">
      {renderContent()}
    </div>
  );
}
