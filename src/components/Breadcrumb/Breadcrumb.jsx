import { Link } from "react-router-dom";
import { ChevronRightIcon } from "../icons/index.jsx";
export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-slate-500 mb-4">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRightIcon className="w-4 h-4 text-slate-300" />}
          {it.to ? (
            <Link to={it.to} className="hover:text-brand">{it.label}</Link>
          ) : (
            <span className="text-slate-900 dark:text-slate-100 font-semibold">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
