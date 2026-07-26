import { Link } from "react-router-dom";
import { FiStar, FiMapPin } from "react-icons/fi";
export default function ListingCard({ item }) {
  return (
    <Link to={`/listings/${item.id}`} className="card-hover block bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
      <div className="relative">
        <img src={item.img} alt={item.name} className="h-48 w-full object-cover" loading="lazy" />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <FiStar className="text-amber-500" /> {item.rating}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg truncate">{item.name}</h3>
          <span className="text-xs text-slate-500">{item.price}</span>
        </div>
        <div className="text-xs text-slate-500 mt-1 flex items-center gap-1"><FiMapPin /> {item.area}</div>
        <div className="mt-3 flex flex-wrap gap-1">
          {item.tags?.slice(0, 2).map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-rose-50 dark:bg-slate-700 text-brand-dark dark:text-brand-light font-semibold">{t}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}