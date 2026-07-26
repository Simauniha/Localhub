import SearchBar from "../SearchBar/SearchBar.jsx";
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 text-center">
        <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-white/70 dark:bg-slate-800/70 text-brand-dark dark:text-brand-light">
          ✨ 10,000+ local businesses · 500k+ users
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">
          Discover the best of <span className="text-brand-gradient">your city</span>
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
          Restaurants, coaching, events, transport & exclusive deals — all in one place.
        </p>
        <div className="mt-8 max-w-2xl mx-auto">
          <SearchBar />
        </div>
        <div className="mt-6 flex justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <div>⭐ 4.8/5 rating</div>
          <div>🏆 #1 local app</div>
          <div>🎁 Daily deals</div>
        </div>
      </div>
    </section>
  );
}