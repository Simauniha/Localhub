import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MenuIcon, CloseIcon, BellIcon, UserIcon } from "../icons/index.jsx";
import ThemeToggle from "../ThemeToggle/ThemeToggle.jsx";
import useAuth from "../../hooks/useAuth.js";
import { NAV_LINKS } from "../../utils/constants.js";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <nav className="sticky top-0 z-40 glass border-b border-white/40 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-brand-gradient grid place-items-center text-white font-bold">L</div>
          <span className="font-extrabold text-lg">LocalHub</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                "text-sm font-semibold transition " +
                (isActive ? "text-brand" : "text-slate-600 dark:text-slate-300 hover:text-brand")
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/notifications" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hidden sm:inline-flex" aria-label="Notifications">
            <BellIcon className="w-5 h-5" />
          </Link>
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/profile" className="btn-ghost text-sm flex items-center gap-2">
                <UserIcon className="w-4 h-4" /> {user?.name?.split(" ")[0]}
              </Link>
              <button onClick={logout} className="btn-primary text-sm">Logout</button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="btn-ghost text-sm">Login</Link>
              <Link to="/register" className="btn-primary text-sm">Sign up</Link>
            </div>
          )}
          <button className="md:hidden p-2" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="px-4 py-3 flex flex-col gap-2">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setOpen(false)} className="py-2 font-semibold">
                {l.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <button onClick={() => { logout(); setOpen(false); }} className="btn-primary mt-2">Logout</button>
            ) : (
              <div className="flex gap-2 mt-2">
                <Link to="/login" onClick={() => setOpen(false)} className="btn-ghost flex-1 text-center">Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="btn-primary flex-1 text-center">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}