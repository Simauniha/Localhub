import { createContext, useState, useCallback } from "react";
export const NotificationContext = createContext(null);
let idc = 0;
export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const notify = useCallback((message, type = "info") => {
    const id = ++idc;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);
  return (
    <NotificationContext.Provider value={{ toasts, notify }}>
      {children}
    </NotificationContext.Provider>
  );
}
