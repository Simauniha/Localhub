import { Link } from "react-router-dom";
export default function EventCard({ event }) {
  return (
    <article className="card-hover bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
      <div className="relative">
        <img className="h-52 w-full object-cover" src={event.img} alt={event.title} loading="lazy" />
        {event.free && (
          <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">FREE TICKET</span>
        )}
      </div>
      <div className="p-5">
        <div className="text-xs text-slate-500">{event.date} · {event.venue}</div>
        <h3 className="mt-1 font-bold text-lg">{event.title}</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-extrabold text-brand-gradient">{event.price}</span>
          <Link to="/qr" className="btn-primary text-xs">{event.free ? "Claim ticket" : "Book now"}</Link>
        </div>
      </div>
    </article>
  );
}