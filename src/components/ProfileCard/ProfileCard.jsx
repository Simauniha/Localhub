export default function ProfileCard({ user }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-brand-gradient grid place-items-center text-white text-3xl font-extrabold">
        {user?.name?.[0] || "U"}
      </div>
      <h3 className="mt-4 font-bold text-xl">{user?.name}</h3>
      <p className="text-sm text-slate-500">{user?.email}</p>
      <div className="mt-4 flex justify-center gap-3 text-sm">
        <div><b>12</b><div className="text-slate-400 text-xs">Redemptions</div></div>
        <div><b>8</b><div className="text-slate-400 text-xs">Bookings</div></div>
        <div><b>4.9</b><div className="text-slate-400 text-xs">Rating</div></div>
      </div>
    </div>
  );
}