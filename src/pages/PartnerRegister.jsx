import { useState } from "react";
import partnerService from "../services/partnerService.js";
import useNotify from "../hooks/useNotify.js";
import useAuth from "../hooks/useAuth.js";
import { CheckIcon } from "../components/icons/index.jsx";

export default function PartnerRegister() {
  const { user } = useAuth();
  const [form, setForm] = useState({ business: "", phone: "", category: "Restaurant", address: "" });
  const [loading, setLoading] = useState(false);
  const { notify } = useNotify();

  const change = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await partnerService.register({
        businessName: form.business,
        businessType: form.category,
        contactEmail: user?.email || "",
        contactPhone: form.phone,
        address: form.address,
        city: user?.city || "Mohali",
      });
      notify("Partner profile saved! 🎉", "success");
      setForm({ business: "", phone: "", category: "Restaurant", address: "" });
    } catch (err) {
      const msg = err?.response?.data?.message || "Partner registration failed. Make sure you are logged in as a Partner.";
      notify(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-10 items-start fade-in">
      <div>
        <span className="text-xs bg-fuchsia-100 text-fuchsia-700 font-semibold px-3 py-1 rounded-full">For Business</span>
        <h1 className="mt-4 text-4xl font-extrabold">Grow your local business with LocalHub</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">List your business, launch deals, sell tickets, and reach 500k+ nearby customers.</p>
        <ul className="mt-6 space-y-3 text-sm">
          <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-emerald-500 shrink-0" />Zero setup fee — pay only per redemption</li>
          <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-emerald-500 shrink-0" />Analytics dashboard & customer insights</li>
          <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-emerald-500 shrink-0" />QR redemption, no POS integration needed</li>
          <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-emerald-500 shrink-0" />Marketing across app, web & push</li>
        </ul>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-xl">
        <h2 className="text-xl font-bold">Register your business</h2>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold">Business name</label>
            <input required value={form.business} onChange={change("business")} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-brand" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Phone</label>
              <input required type="tel" value={form.phone} onChange={change("phone")} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none" />
            </div>
            <div>
              <label className="text-sm font-semibold">Category</label>
              <select value={form.category} onChange={change("category")} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                <option>Restaurant</option><option>Salon</option><option>Coaching</option><option>Transport</option><option>Event Organiser</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold">Address</label>
            <textarea required rows="3" value={form.address} onChange={change("address")} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none" />
          </div>
          <button disabled={loading} className="btn-primary w-full">{loading ? "Submitting..." : "Submit application"}</button>
        </form>
      </div>
    </div>
  );
}