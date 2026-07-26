import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListingCard from "../components/ListingCard/ListingCard.jsx";
import Loader from "../components/Loader/Loader.jsx";
import Pagination from "../components/Pagination/Pagination.jsx";
import Dropdown from "../components/Dropdown/Dropdown.jsx";
import { CATEGORIES } from "../utils/constants.js";
import listingService from "../services/listingService.js";
const sortOptions = [
  { value: "popular", label: "Most popular" },
  { value: "rating", label: "Top rated" },
  { value: "name", label: "Name (A–Z)" },
];
export default function Listings() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("popular");
  const category = params.get("category") || "all";
  const q = params.get("q") || "";
  const page = Number(params.get("page") || 1);
  const pageSize = 8;
  useEffect(() => {
    setLoading(true);
    listingService.list({ category, q, page, pageSize }).then((r) => {
      setItems(r.items);
      setTotal(r.total);
      setLoading(false);
    });
  }, [category, q, page]);
  const sorted = useMemo(() => {
    const arr = [...items];
    if (sort === "rating") arr.sort((a, b) => b.rating - a.rating);
    else if (sort === "name") arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  }, [items, sort]);
  const setCategory = (c) => {
    const p = new URLSearchParams(params);
    if (c === "all") p.delete("category"); else p.set("category", c);
    p.set("page", "1");
    setParams(p);
  };
  const setPage = (n) => {
    const p = new URLSearchParams(params);
    p.set("page", String(n));
    setParams(p);
  };
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Explore listings</h1>
          <p className="text-slate-500 mt-1">{total} results {q && <>for "<b>{q}</b>"</>}</p>
        </div>
        <Dropdown label="Sort" options={sortOptions} value={sort} onChange={setSort} />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory("all")}
          className={"chip px-4 py-2 rounded-full text-sm font-semibold " + (category === "all" ? "bg-brand-gradient text-white" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700")}
        >All</button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={"chip px-4 py-2 rounded-full text-sm font-semibold " + (category === c.id ? "bg-brand-gradient text-white" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700")}
          >
            {c.icon} {c.name}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {loading ? <Loader /> : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sorted.map((i) => <ListingCard key={i.id} item={i} />)}
            {sorted.length === 0 && <p className="text-slate-500">No listings found.</p>}
          </div>
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}