import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import useNotify from "../hooks/useNotify.js";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { notify } = useNotify();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      notify("Welcome back! 👋", "success");
      navigate(from, { replace: true });
    } catch {
      notify("Login failed. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-6">
      <div className="w-full max-w-md glass rounded-3xl p-8 shadow-2xl">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-brand-gradient grid place-items-center text-white font-bold">L</div>
          <span className="font-extrabold">LocalHub</span>
        </Link>
        <h1 className="text-3xl font-extrabold">Welcome back</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">Log in to your account.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-brand" />
          </div>
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-brand" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>
            <a href="#" className="text-brand font-semibold">Forgot password?</a>
          </div>
          <button disabled={loading} className="btn-primary w-full">{loading ? "Signing in..." : "Sign in"}</button>
        </form>
        <p className="text-sm text-center mt-6">New here? <Link to="/register" className="text-brand font-semibold">Create an account</Link></p>
      </div>
    </div>
  );
}