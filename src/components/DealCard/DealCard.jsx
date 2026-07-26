import { Link } from "react-router-dom";
export default function DealCard({ deal }) {
  return (
    <div className="card-hover rounded-2xl overflow-hidden shadow-sm relative">
      <div className={`bg-gradient-to-br ${deal.bg} text-white p-6 relative`}>
        <div className="text-xs uppercase tracking-wide opacity-90">{deal.business}</div>
        <div className="text-2xl font-extrabold mt-2 leading-tight">{deal.title}</div>
        <div className="mt-4 flex items-center gap-2">
          <span className="bg-white/25 backdrop-blur text-xs px-2 py-1 rounded font-mono">{deal.code}</span>
          <span className="text-xs opacity-90">Expires {deal.expiry}</span>
        </div>
        <div className="absolute -left-3 top-1/2 w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-950" />
        <div className="absolute -right-3 top-1/2 w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-950" />
      </div>
      <div className="bg-white dark:bg-slate-800 p-4 flex items-center justify-between">
        <span className="text-xs text-slate-500">Terms apply</span>
        <Link to="/qr" className="btn-primary text-xs">Redeem</Link>
      </div>
    </div>
  );
}
