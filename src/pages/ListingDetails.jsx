import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StarIcon, MapPinIcon, PhoneIcon, ClockIcon, MapIcon } from "../components/icons/index.jsx";
import Loader from "../components/Loader/Loader.jsx";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb.jsx";
import ReviewCard from "../components/ReviewCard/ReviewCard.jsx";
import Modal from "../components/Modal/Modal.jsx";
import listingService from "../services/listingService.js";
import useNotify from "../hooks/useNotify.js";
export default function ListingDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState(false);
  const { notify } = useNotify();
  useEffect(() => {
    listingService.get(id).then(setData).catch(() => setData(null));
  }, [id]);
  if (!data) return <Loader />;
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 fade-in">
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Listings", to: "/listings" }, { label: data.name }]} />
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <img src={data.gallery[active]} alt={data.name} className="w-full h-96 object-cover rounded-2xl" />
          <div className="mt-3 grid grid-cols-4 gap-2">
            {data.gallery.map((g, i) => (
              <button key={i} onClick={() => setActive(i)} className={"h-20 rounded-lg overflow-hidden border-2 " + (i === active ? "border-brand" : "border-transparent")}>
                <img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold">{data.name}</h1>
          <div className="mt-2 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 font-bold"><StarIcon className="w-4 h-4 text-amber-500" /> {data.rating}</span>
            <span className="text-slate-500">({data.reviews} reviews)</span>
            <span className="text-slate-500">· {data.price}</span>
          </div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">{data.desc}</p>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2"><MapPinIcon className="w-4 h-4 mt-0.5 text-brand shrink-0" /> {data.address}</div>
            <div className="flex items-start gap-2"><PhoneIcon className="w-4 h-4 mt-0.5 text-brand shrink-0" /> {data.phone}</div>
            <div className="flex items-start gap-2 sm:col-span-2"><ClockIcon className="w-4 h-4 mt-0.5 text-brand shrink-0" /> {data.hours}</div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => { setModal(true); }} className="btn-primary">Book now</button>
            <Link to="/qr" className="btn-ghost">Redeem offer</Link>
          </div>
          {/* Map placeholder */}
          <div className="mt-6 h-48 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center gap-2 text-slate-500">
            <MapIcon className="w-5 h-5" /> Map preview
          </div>
        </div>
      </div>
      {/* Offers */}
      {(data.offers && data.offers.length > 0) && (
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold">Live offers</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {data.offers.map((o) => (
              <div key={o.code || o.title} className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <div>
                  <div className="font-bold">{o.title}</div>
                  <div className="text-xs text-slate-500 mt-1">Code {o.code} · Expires {o.expiry}</div>
                </div>
                <Link to="/qr" className="btn-primary text-sm">Redeem</Link>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Reviews */}
      {(data.reviewsList && data.reviewsList.length > 0) ? (
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold">Reviews</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            {data.reviewsList.map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
        </section>
      ) : (Array.isArray(data.reviews) && data.reviews.length > 0) && (
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold">Reviews</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            {data.reviews.map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
        </section>
      )}

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={`Book a table at ${data.name}`}
        footer={
          <>
            <button onClick={() => setModal(false)} className="btn-ghost text-sm">Cancel</button>
            <button
              onClick={() => { setModal(false); notify("Booking confirmed ✅", "success"); }}
              className="btn-primary text-sm"
            >Confirm booking</button>
          </>
        }
      >
        <p className="text-sm text-slate-500">Choose a date and party size. This is a UI prototype — action simulated.</p>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <input type="date" className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" />
          <select className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <option>2 guests</option><option>4 guests</option><option>6 guests</option>
          </select>
        </div>
      </Modal>
    </div>
  );
}
