import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import useNotify from "../hooks/useNotify.js";
export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { notify } = useNotify();
  const navigate = useNavigate();
  const change = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      notify("Passwords do not match", "error");
      return;
    }
    setLoading(true);
    try {
      await register(form);
      notify("Account created 🎉", "success");
      navigate("/dashboard");
    } catch {
      notify("Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-6">
      <div className="w-full max-w-xl glass rounded-3xl p-8 shadow-2xl">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-brand-gradient grid place-items-center text-white font-bold">L</div>
          <span className="font-extrabold">LocalHub</span>
        </Link>
        <h1 className="text-3xl font-extrabold">Create your account</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">Join thousands of locals saving daily.</p>
        <form onSubmit={onSubmit} className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-sm font-semibold">Full name</label>
            <input required value={form.name} onChange={change("name")} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-brand" />
          </div>
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input required type="email" value={form.email} onChange={change("email")} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-brand" />
          </div>
          <div>
            <label className="text-sm font-semibold">Phone</label>
            <input required type="tel" value={form.phone} onChange={change("phone")} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-brand" />
          </div>
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input required type="password" value={form.password} onChange={change("password")} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-brand" />
          </div>
          <div>
            <label className="text-sm font-semibold">Confirm password</label>
            <input required type="password" value={form.confirm} onChange={change("confirm")} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-brand" />
          </div>
          <label className="sm:col-span-2 flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input type="checkbox" required className="mt-1" />
            <span>I agree to the <Link to="/terms" className="text-brand font-semibold">Terms</Link> and <Link to="/privacy" className="text-brand font-semibold">Privacy Policy</Link>.</span>
          </label>
          <button disabled={loading} className="btn-primary sm:col-span-2">{loading ? "Creating..." : "Create account"}</button>
        </form>
        <p className="text-sm text-center mt-6">Already have an account? <Link to="/login" className="text-brand font-semibold">Log in</Link></p>
      </div>
    </div>
  );
}
