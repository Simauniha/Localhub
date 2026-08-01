import { useEffect, useState } from "react";
import adminService from "../services/adminService.js";
import useNotify from "../hooks/useNotify.js";
import Loader from "../components/Loader/Loader.jsx";
import { SparklesIcon, CheckIcon, AlertCircleIcon } from "../components/icons/index.jsx";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    google_places_api_key: "",
    search_radius: "5000",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const { notify } = useNotify();

  useEffect(() => {
    adminService.getSettings()
      .then((data) => {
        setSettings({
          google_places_api_key: data.google_places_api_key || "",
          search_radius: data.search_radius || "5000",
        });
      })
      .catch(() => {
        notify("Failed to load settings", "error");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminService.updateSettings(settings);
      notify("Application settings saved successfully! ✅", "success");
    } catch {
      notify("Failed to save settings", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await adminService.testGooglePlaces(settings.google_places_api_key);
      setTestResult(res);
      if (res.success) {
        notify("Connection test successful! 🚀", "success");
      } else {
        notify(res.message || "Connection test failed", "error");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Test connection failed";
      setTestResult({ success: false, message: msg });
      notify(msg, "error");
    } finally {
      setTesting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="fade-in max-w-4xl">
      <h1 className="text-3xl font-extrabold">Admin Settings</h1>
      <p className="text-slate-500 mt-1">Configure global application integration keys and search parameters.</p>

      <form onSubmit={handleSave} className="mt-8 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
          <h2 className="text-lg font-bold border-b border-slate-100 dark:border-slate-700 pb-3 flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-brand" />
            Google Places API Integration
          </h2>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Google Places API Key
            </label>
            <input
              type="text"
              name="google_places_api_key"
              value={settings.google_places_api_key}
              onChange={handleChange}
              placeholder="AIzaSy..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-brand font-mono text-sm"
            />
            <p className="text-xs text-slate-500 mt-1.5">
              API key used for fetching location auto-complete, place details, and geocoding.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Search Radius (Meters)
            </label>
            <input
              type="number"
              name="search_radius"
              value={settings.search_radius}
              onChange={handleChange}
              placeholder="5000"
              min="500"
              max="50000"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-brand text-sm"
            />
            <p className="text-xs text-slate-500 mt-1.5">
              Default search radius applied when querying nearby places (range: 500m to 50,000m).
            </p>
          </div>

          {testResult && (
            <div
              className={`p-4 rounded-xl text-sm flex items-start gap-3 border ${
                testResult.success
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
                  : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300"
              }`}
            >
              {testResult.success ? (
                <CheckIcon className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              ) : (
                <AlertCircleIcon className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
              )}
              <div>
                <span className="font-semibold block">{testResult.success ? "Connection Verified" : "Validation Error"}</span>
                <span>{testResult.message}</span>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary py-2.5 px-6 text-sm font-semibold"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testing}
              className="btn-ghost py-2.5 px-5 text-sm font-semibold border border-slate-200 dark:border-slate-700"
            >
              {testing ? "Testing Key..." : "Test Connection"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
