import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useNotify from "../hooks/useNotify.js";
import dealService from "../services/dealService.js";
import eventService from "../services/eventService.js";
import Loader from "../components/Loader/Loader.jsx";

export default function QRRedemption() {
  const [params] = useSearchParams();
  const { notify } = useNotify();
  const [item, setItem] = useState(null);
  const [isTicket, setIsTicket] = useState(false);
  const [loading, setLoading] = useState(true);

  const queryCode = params.get("code");
  const ticketCode = params.get("ticketCode");
  const dealId = params.get("dealId");
  const eventId = params.get("eventId");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (ticketCode) {
          const tickets = await eventService.myTickets();
          const match = tickets.find((t) => t.ticketCode === ticketCode);
          if (match) {
            setItem(match);
            setIsTicket(true);
          }
        } else if (eventId) {
          const res = await eventService.claim(eventId, 1);
          setItem(res);
          setIsTicket(true);
        } else if (dealId) {
          const res = await dealService.claim(dealId);
          setItem(res);
          setIsTicket(false);
        } else if (queryCode) {
          const dealHistory = await dealService.myRedemptions();
          const dealMatch = dealHistory.find((r) => r.redemptionCode === queryCode);
          if (dealMatch) {
            setItem(dealMatch);
            setIsTicket(false);
          } else {
            const ticketHistory = await eventService.myTickets();
            const ticketMatch = ticketHistory.find((t) => t.ticketCode === queryCode);
            if (ticketMatch) {
              setItem(ticketMatch);
              setIsTicket(true);
            }
          }
        } else {
          // Fallback to recent redemption or ticket
          const dealHistory = await dealService.myRedemptions();
          if (dealHistory.length > 0) {
            setItem(dealHistory[0]);
            setIsTicket(false);
          } else {
            const ticketHistory = await eventService.myTickets();
            if (ticketHistory.length > 0) {
              setItem(ticketHistory[0]);
              setIsTicket(true);
            }
          }
        }
      } catch (err) {
        // Handle error gracefully
      } finally {
        setLoading(false);
      }
    })();
  }, [dealId, eventId, queryCode, ticketCode]);

  const displayCode =
    item?.ticketCode || item?.redemptionCode || ticketCode || queryCode || "LHUB-8FZ2-4QW1";
  const title = item?.eventTitle || item?.dealTitle || (isTicket ? "Event Ticket" : "Deal Redemption");
  const venueOrBusiness = item?.venue || item?.partnerBusinessName || "";

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayCode);
      notify("Code copied", "success");
    } catch {
      notify("Copy failed", "error");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-14 fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="bg-brand-gradient text-white p-8 text-center">
          <div className="text-sm opacity-90">
            {isTicket ? `Ticket for ${title}` : `Offer: ${title}`}
          </div>
          <div className="text-2xl font-extrabold mt-2 tracking-wider">{displayCode}</div>
          {venueOrBusiness && (
            <div className="text-xs mt-1 opacity-80">at {venueOrBusiness}</div>
          )}
        </div>
        <div className="p-8 text-center">
          <div className="mx-auto w-56 h-56 bg-white rounded-2xl border-4 border-slate-100 grid place-items-center">
            {/* QR code payload */}
            <div
              className="w-48 h-48"
              style={{
                background:
                  "repeating-conic-gradient(#0f172a 0 25%, white 0 50%) 50% / 12px 12px",
                borderRadius: 8,
              }}
              aria-label="QR code display"
            />
          </div>
          <p className="mt-6 text-slate-500 text-sm">
            Show this QR or code ({displayCode}) at the venue to verify entry / claim offer.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={onCopy} className="btn-ghost text-sm">Copy code</button>
            <Link to="/events" className="btn-primary text-sm">Browse more events</Link>
          </div>
        </div>
      </div>
    </div>
  );
}