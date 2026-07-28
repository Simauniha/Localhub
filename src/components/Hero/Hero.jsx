import SearchBar from "../SearchBar/SearchBar.jsx";
import { SparklesIcon, StarIcon, TrophyIcon, GiftIcon } from "../icons/index.jsx";
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 text-center">
        <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-white/70 dark:bg-slate-800/70 text-brand-dark dark:text-brand-light">
          <SparklesIcon className="w-3.5 h-3.5 text-brand" /> 10,000+ local businesses · 500k+ users
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
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5"><StarIcon className="w-4 h-4 text-amber-500" /> 4.8/5 rating</div>
          <div className="flex items-center gap-1.5"><TrophyIcon className="w-4 h-4 text-brand" /> #1 local app</div>
          <div className="flex items-center gap-1.5"><GiftIcon className="w-4 h-4 text-rose-500" /> Daily deals</div>
        </div>
      </div>
    </section>
  );
}