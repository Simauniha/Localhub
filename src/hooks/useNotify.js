import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext.jsx";
export default function useNotify() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotify must be used within NotificationProvider");
  return ctx;
}
