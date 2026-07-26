import { useState } from "react";
import ProfileCard from "../components/ProfileCard/ProfileCard.jsx";
import useAuth from "../hooks/useAuth.js";
import useNotify from "../hooks/useNotify.js";
export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: "+91 98765 43210", city: "Bengaluru" });
  const { notify } = useNotify();
  const change = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    notify("Profile updated ", "success");
  };
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 fade-in">
      <ProfileCard user={user} />
      <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
        <h2 className="text-xl font-bold">Edit profile</h2>
        <form onSubmit={onSubmit} className="mt-4 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Full name</label>
            <input value={form.name} onChange={change("name")} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-brand" />
          </div>
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input type="email" value={form.email} onChange={change("email")} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-brand" />
          </div>
          <div>
            <label className="text-sm font-semibold">Phone</label>
            <input value={form.phone} onChange={change("phone")} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-brand" />
          </div>
          <div>
            <label className="text-sm font-semibold">City</label>
            <input value={form.city} onChange={change("city")} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-brand" />
          </div>
          <button className="btn-primary sm:col-span-2">Save changes</button>
        </form>
      </div>
    </div>
  );
}