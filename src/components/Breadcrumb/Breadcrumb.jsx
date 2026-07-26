import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-slate-500 mb-4">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <FiChevronRight className="text-slate-300" />}
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
