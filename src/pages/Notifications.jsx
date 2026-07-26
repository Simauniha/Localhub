import { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard/NotificationCard.jsx";
import Loader from "../components/Loader/Loader.jsx";
import notificationService from "../services/notificationService.js";
import useNotify from "../hooks/useNotify.js";
export default function Notifications() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { notify } = useNotify();
  useEffect(() => {
    notificationService.list().then((n) => { setNotes(n); setLoading(false); });
  }, []);
  const markAll = async () => {
    await notificationService.markAllRead();
    setNotes((ns) => ns.map((n) => ({ ...n, unread: false })));
    notify("All caught up ✅", "success");
  };
  const unreadCount = notes.filter((n) => n.unread).length;
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 fade-in">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold">Notifications</h1>
          <p className="text-slate-500 text-sm">You have <b>{unreadCount} unread</b> updates</p>
        </div>
        <button onClick={markAll} className="text-sm font-semibold text-brand">Mark all read</button>
      </div>
      {loading ? <Loader /> : (
        <ul className="space-y-3">
          {notes.map((n) => <NotificationCard key={n.id} note={n} />)}
        </ul>
      )}
    </div>
  );
}