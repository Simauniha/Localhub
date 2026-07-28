import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon, MapPinIcon } from "../icons/index.jsx";
export default function SearchBar({ compact = false }) {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("Bengaluru");
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/listings?q=${encodeURIComponent(q)}&loc=${encodeURIComponent(loc)}`);
  };
  return (
    <form onSubmit={onSubmit} className={"flex flex-col sm:flex-row gap-2 p-2 rounded-2xl bg-white dark:bg-slate-800 shadow-xl " + (compact ? "" : "border border-white/50 dark:border-slate-700")}>
      <div className="flex items-center flex-1 px-3 gap-2">
        <SearchIcon className="w-5 h-5 text-slate-400 shrink-0" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search restaurants, deals, events..."
          className="w-full py-3 bg-transparent outline-none"
        />
      </div>
      <div className="flex items-center px-3 gap-2 sm:border-l border-slate-200 dark:border-slate-700">
        <MapPinIcon className="w-5 h-5 text-slate-400 shrink-0" />
        <input
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          className="w-full sm:w-40 py-3 bg-transparent outline-none"
        />
      </div>
      <button className="btn-primary">Search</button>
    </form>
  );
}