export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div className="w-10 h-10 rounded-full border-4 border-rose-200 border-t-brand animate-spin" />
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}
