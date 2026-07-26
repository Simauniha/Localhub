import useNotify from "../../hooks/useNotify.js";
export default function Toast() {
  const { toasts } = useNotify();
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={
            "px-5 py-3 rounded-xl shadow-2xl text-white fade-in font-medium " +
            (t.type === "error"
              ? "bg-rose-600"
              : t.type === "success"
              ? "bg-emerald-600"
              : "bg-slate-900")
          }
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
