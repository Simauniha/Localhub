import { useEffect, useState } from "react";
import EventCard from "../components/EventCard/EventCard.jsx";
import Loader from "../components/Loader/Loader.jsx";
import eventService from "../services/eventService.js";
export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    eventService.list().then((e) => { setEvents(e); setLoading(false); });
  }, []);
  return (
    <div className="fade-in">
      <header className="bg-brand-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <h1 className="text-4xl font-extrabold">Upcoming events</h1>
          <p className="opacity-90 mt-2">Concerts, meetups, workshops & festivals — all near you.</p>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {loading ? <Loader /> : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        )}
      </div>
    </div>
  );
}
