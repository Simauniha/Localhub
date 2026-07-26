export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-14 fade-in">
      <h1 className="text-4xl font-extrabold">About LocalHub</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-300 text-lg">
        LocalHub connects people to the best of their city — restaurants, coaching, events,
        transport & exclusive local deals. We help small businesses grow with zero-setup listings
        and help locals save on every experience.
      </p>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {[
          { t: "10,000+", l: "Local businesses" },
          { t: "500k+", l: "Active users" },
          { t: "₹5Cr+", l: "Saved by customers" },
        ].map((s) => (
          <div key={s.l} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 text-center card-hover">
            <div className="text-3xl font-extrabold text-brand-gradient">{s.t}</div>
            <div className="text-sm text-slate-500 mt-1">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-extrabold">Our mission</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Make local discovery effortless and rewarding for everyone.</p>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold">Our vision</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">A world where every local business thrives and every neighborhood feels connected.</p>
        </div>
      </div>
    </div>
  );
}