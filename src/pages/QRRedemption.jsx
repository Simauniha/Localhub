import { Link } from "react-router-dom";
import useNotify from "../hooks/useNotify.js";
export default function QRRedemption() {
  const { notify } = useNotify();
  const code = "LHUB-8FZ2-4QW1";
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      notify("Code copied", "success");
    } catch {
      notify("Copy failed", "error");
    }
  };
  return (
    <div className="max-w-2xl mx-auto px-4 py-14 fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="bg-brand-gradient text-white p-8 text-center">
          <div className="text-sm opacity-90">Your redemption code</div>
          <div className="text-2xl font-extrabold mt-2 tracking-wider">{code}</div>
        </div>
        <div className="p-8 text-center">
          <div className="mx-auto w-56 h-56 bg-white rounded-2xl border-4 border-slate-100 grid place-items-center">
            {/* QR placeholder */}
            <div
              className="w-48 h-48"
              style={{
                background:
                  "repeating-conic-gradient(#0f172a 0 25%, white 0 50%) 50% / 12px 12px",
                borderRadius: 8,
              }}
              aria-label="QR code placeholder"
            />
          </div>
          <p className="mt-6 text-slate-500 text-sm">Show this QR at the partner venue to redeem your offer.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={onCopy} className="btn-ghost text-sm">Copy code</button>
            <Link to="/deals" className="btn-primary text-sm">Browse more deals</Link>
          </div>
        </div>
      </div>
    </div>
  );
}