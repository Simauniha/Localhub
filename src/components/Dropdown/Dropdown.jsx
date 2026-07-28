import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "../icons/index.jsx";
export default function Dropdown({ label, options = [], value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const selected = options.find((o) => o.value === value);
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="btn-ghost text-sm flex items-center gap-2"
      >
        {selected?.label || label} <ChevronDownIcon className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-30">
          {options.map((o) => (
            <button
              key={o.value}
              onClick={() => { onChange?.(o.value); setOpen(false); }}
              className={"w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 " + (o.value === value ? "text-brand font-semibold" : "")}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}