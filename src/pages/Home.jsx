import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero/Hero.jsx";
import CategoryCard from "../components/CategoryCard/CategoryCard.jsx";
import ListingCard from "../components/ListingCard/ListingCard.jsx";
import DealCard from "../components/DealCard/DealCard.jsx";
import EventCard from "../components/EventCard/EventCard.jsx";
import Loader from "../components/Loader/Loader.jsx";
import useNotify from "../hooks/useNotify.js";
import { CATEGORIES } from "../utils/constants.js";
import listingService from "../services/listingService.js";
import dealService from "../services/dealService.js";
import eventService from "../services/eventService.js";
const testimonials = [
  { name: "Aarav S.", role: "Foodie", text: "Found the best pizza in town — and got 50% off!", avatar: "A" },
  { name: "Meera K.", role: "Student", text: "Booked my coding bootcamp with a BOGO deal. Life-saver.", avatar: "M" },
  { name: "Rohan M.", role: "Traveler", text: "Every weekend plan starts on LocalHub now.", avatar: "R" },
];
export default function Home() {
  const [listings, setListings] = useState([]);
  const [deals, setDeals] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { notify } = useNotify();
  useEffect(() => {
    (async () => {
      const [l, d, e] = await Promise.all([
        listingService.list({ pageSize: 4 }),
        dealService.list(),
        eventService.list(),
      ]);
      setListings(l.items);
      setDeals(d.slice(0, 3));
      setEvents(e.slice(0, 3));
      setLoading(false);
    })();
  }, []);
  const onNewsletter = (e) => {
    e.preventDefault();
    notify("Subscribed! Check your inbox 🎉", "success");
    e.currentTarget.reset();
  };
  return (
    <div className="fade-in">
      <Hero />
      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold">Browse categories</h2>
            <p className="text-slate-500 mt-1">Everything local, in one place.</p>
          </div>
          <Link to="/listings" className="text-sm text-brand font-semibold hidden sm:block">See all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((c) => <CategoryCard key={c.id} category={c} />)}
        </div>
      </section>
      {/* Featured Deals */}
      <section className="bg-slate-100 dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold">🏷️ Featured deals</h2>
              <p className="text-slate-500 mt-1">Fresh offers, updated daily.</p>
            </div>
            <Link to="/deals" className="text-sm text-brand font-semibold">See all →</Link>
          </div>
          {loading ? <Loader /> : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {deals.map((d) => <DealCard key={d.id} deal={d} />)}
            </div>
          )}
        </div>
      </section>
      {/* Popular restaurants */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold">Popular restaurants</h2>
            <p className="text-slate-500 mt-1">Loved by locals.</p>
          </div>
          <Link to="/listings?category=restaurants" className="text-sm text-brand font-semibold">See all →</Link>
        </div>
        {loading ? <Loader /> : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {listings.map((l) => <ListingCard key={l.id} item={l} />)}
          </div>
        )}
      </section>
      {/* Coaching + Transport banners */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid md:grid-cols-2 gap-6">
        <Link to="/listings?category=coaching" className="card-hover rounded-3xl p-8 bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white">
          <div className="text-sm opacity-90">Coaching institutes</div>
          <div className="text-3xl font-extrabold mt-2">Level up your career</div>
          <p className="opacity-90 mt-2">Top-rated coaching centers with student discounts.</p>
          <span className="mt-4 inline-block btn-ghost text-slate-900">Explore →</span>
        </Link>
        <Link to="/listings?category=transport" className="card-hover rounded-3xl p-8 bg-gradient-to-br from-sky-500 to-indigo-600 text-white">
          <div className="text-sm opacity-90">Transport</div>
          <div className="text-3xl font-extrabold mt-2">Get anywhere fast</div>
          <p className="opacity-90 mt-2">Cabs, autos & rentals — with member perks.</p>
          <span className="mt-4 inline-block btn-ghost text-slate-900">Book now →</span>
        </Link>
      </section>
      {/* Upcoming events */}
      <section className="bg-slate-100 dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold">🎉 Upcoming events</h2>
              <p className="text-slate-500 mt-1">Concerts, meetups & festivals near you.</p>
            </div>
            <Link to="/events" className="text-sm text-brand font-semibold">See all →</Link>
          </div>
          {loading ? <Loader /> : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          )}
        </div>
      </section>
      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-extrabold text-center">What locals say</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 card-hover">
              <p className="italic">“{t.text}”</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gradient text-white grid place-items-center font-bold">{t.avatar}</div>
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Download app */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="rounded-3xl p-10 md:p-14 bg-brand-gradient text-white grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Get the LocalHub app</h2>
            <p className="opacity-90 mt-3">Faster booking, exclusive app-only deals, and instant QR redemption.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#" className="bg-black/30 hover:bg-black/40 backdrop-blur px-5 py-3 rounded-xl font-semibold">📱 App Store</a>
              <a href="#" className="bg-black/30 hover:bg-black/40 backdrop-blur px-5 py-3 rounded-xl font-semibold">🤖 Google Play</a>
            </div>
          </div>
          <div className="text-center text-8xl md:text-9xl">📲</div>
        </div>
      </section>
      {/* Newsletter */}
      <section className="max-w-3xl mx-auto px-4 pb-20 text-center">
        <h3 className="text-2xl font-extrabold">Stay in the loop</h3>
        <p className="text-slate-500 mt-2">Weekly newsletter with the best deals & events.</p>
        <form onSubmit={onNewsletter} className="mt-6 flex flex-col sm:flex-row gap-2">
          <input required type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-brand" />
          <button className="btn-primary">Subscribe</button>
        </form>
      </section>
    </div>
  );
}