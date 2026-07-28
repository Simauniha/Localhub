import { useEffect, useState } from "react";
import DealCard from "../components/DealCard/DealCard.jsx";
import Loader from "../components/Loader/Loader.jsx";
import dealService from "../services/dealService.js";
import { TagIcon } from "../components/icons/index.jsx";
const cats = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "beauty", label: "Beauty" },
  { id: "coaching", label: "Coaching" },
  { id: "transport", label: "Transport" },
];
export default function Deals() {
  const [deals, setDeals] = useState([]);
  const [cat, setCat] = useState("all");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    dealService.list(cat).then((d) => { setDeals(d); setLoading(false); });
  }, [cat]);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 fade-in">
      <h1 className="text-3xl font-extrabold flex items-center gap-2"><TagIcon className="w-8 h-8 text-rose-500" /> Live deals & coupons</h1>
      <p className="text-slate-500">{deals.length} active offers near you</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={"chip px-4 py-2 rounded-full text-sm font-semibold " + (cat === c.id ? "bg-brand-gradient text-white" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700")}
          >
            {c.label}
          </button>
        ))}
      </div>
      {loading ? <Loader /> : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {deals.map((d) => <DealCard key={d.id} deal={d} />)}
        </div>
      )}
    </div>
  );
}