import { NavLink } from "react-router-dom";
export default function Sidebar({ links = [], title = "Menu" }) {
  return (
    <aside className="hidden md:block w-64 shrink-0 p-4 border-r border-slate-200 dark:border-slate-800 min-h-[calc(100vh-4rem)]">
      <div className="text-xs uppercase tracking-wider text-slate-400 mb-3 px-2">{title}</div>
      <nav className="space-y-1">
        {links.map((l) => (
          <NavLink
            key={l.to + l.label}
            to={l.to}
            end
            className={({ isActive }) => "side-link " + (isActive ? "active" : "")}
          >
            <span className="text-lg">{l.icon}</span>
            <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
