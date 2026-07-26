import { useState } from "react";
import useNotify from "../hooks/useNotify.js";
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { notify } = useNotify();
  const change = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    notify("Message sent — we'll get back to you soon 💌", "success");
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <div className="max-w-5xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 fade-in">
      <div>
        <h1 className="text-4xl font-extrabold">Get in touch</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">We usually respond within one business day.</p>
        <ul className="mt-6 space-y-3 text-sm">
          <li>📧 hello@localhub.app</li>
          <li>📞 +91 98765 43210</li>
          <li>📍 100 Innov8 St, Bengaluru</li>
        </ul>
      </div>
      <form onSubmit={onSubmit} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 space-y-4">
        <div>
          <label className="text-sm font-semibold">Name</label>
          <input required value={form.name} onChange={change("name")} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-brand" />
        </div>
        <div>
          <label className="text-sm font-semibold">Email</label>
          <input required type="email" value={form.email} onChange={change("email")} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-brand" />
        </div>
        <div>
          <label className="text-sm font-semibold">Message</label>
          <textarea required rows="5" value={form.message} onChange={change("message")} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-brand" />
        </div>
        <button className="btn-primary w-full">Send message</button>
      </form>
    </div>
  );
}