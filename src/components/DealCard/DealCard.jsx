import { useNavigate } from "react-router-dom";
import dealService from "../../services/dealService.js";
import useNotify from "../../hooks/useNotify.js";

export default function DealCard({ deal }) {
  const navigate = useNavigate();
  const { notify } = useNotify();

  const handleRedeem = async (e) => {
    e.preventDefault();
    try {
      const res = await dealService.claim(deal.id);
      notify("Deal claimed successfully! 🎉", "success");
      navigate(`/qr?code=${res.redemptionCode}`);
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to claim deal. Please log in first.";
      notify(msg, "error");
    }
  };

  return (
    <div className="card-hover rounded-2xl overflow-hidden shadow-sm relative">
      <div className={`bg-gradient-to-br ${deal.bg || "from-rose-500 to-fuchsia-600"} text-white p-6 relative`}>
        <div className="text-xs uppercase tracking-wide opacity-90">{deal.business || deal.partnerBusinessName || "Local Partner"}</div>
        <div className="text-2xl font-extrabold mt-2 leading-tight">{deal.title}</div>
        <div className="mt-4 flex items-center gap-2">
          <span className="bg-white/25 backdrop-blur text-xs px-2 py-1 rounded font-mono">{deal.code}</span>
          <span className="text-xs opacity-90">Expires {deal.expiry}</span>
        </div>
        <div className="absolute -left-3 top-1/2 w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-950" />
        <div className="absolute -right-3 top-1/2 w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-950" />
      </div>
      <div className="bg-white dark:bg-slate-800 p-4 flex items-center justify-between">
        <span className="text-xs text-slate-500">{deal.terms || "Terms apply"}</span>
        <button onClick={handleRedeem} className="btn-primary text-xs">Redeem</button>
      </div>
    </div>
  );
}
