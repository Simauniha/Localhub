export default function NotificationCard({ note, onClick }) {
  const toneMap = {
    rose: "bg-rose-100 text-rose-600",
    fuchsia: "bg-fuchsia-100 text-fuchsia-600",
    emerald: "bg-emerald-100 text-emerald-600",
    sky: "bg-sky-100 text-sky-600",
  };
  return (
    <li className={"rounded-2xl p-4 border border-slate-100 dark:border-slate-700 flex gap-4 items-start card-hover " + (note.unread ? "bg-white dark:bg-slate-800" : "bg-slate-50 dark:bg-slate-900 opacity-70")}>
      <div className={"w-11 h-11 rounded-xl grid place-items-center text-xl " + (toneMap[note.tone] || "bg-slate-100 text-slate-600")}>
        {note.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-bold">{note.title}</h3>
          {note.unread && <span className="w-2 h-2 rounded-full bg-rose-500" />}
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">{note.body}</p>
        <div className="text-xs text-slate-400 mt-1">{note.time}</div>
      </div>
      {onClick && <button onClick={onClick} className="btn-ghost text-xs">Open</button>}
    </li>
  );
}