export default function AnalyticsCard({ label, value, delta, icon, tone = "rose" }) {
  const tones = {
    rose: "from-rose-500 to-fuchsia-600",
    emerald: "from-emerald-500 to-teal-500",
    sky: "from-sky-500 to-indigo-500",
    amber: "from-amber-500 to-rose-500",
  };
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 card-hover">
      <div className="flex items-center justify-between">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tones[tone]} text-white grid place-items-center text-lg`}>
          {icon}
        </div>
        {delta != null && (
          <span className={"text-xs font-bold " + (delta >= 0 ? "text-emerald-600" : "text-rose-600")}>
            {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}%
          </span>
        )}
      </div>
      <div className="mt-4 text-2xl font-extrabold">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  );
}