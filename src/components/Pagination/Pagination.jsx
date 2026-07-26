import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
export default function Pagination({ page = 1, totalPages = 1, onChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button
        onClick={() => onChange?.(Math.max(1, page - 1))}
        className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40"
        disabled={page === 1}
      >
        <FiChevronLeft />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange?.(p)}
          className={
            "w-9 h-9 rounded-lg text-sm font-semibold " +
            (p === page ? "bg-brand-gradient text-white" : "border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800")
          }
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange?.(Math.min(totalPages, page + 1))}
        className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40"
        disabled={page === totalPages}
      >
        <FiChevronRight />
      </button>
    </div>
  );
}
