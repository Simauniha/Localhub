import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-6 text-center">
      <div>
        <div className="text-8xl font-extrabold text-brand-gradient">404</div>
        <h1 className="mt-4 text-3xl font-extrabold">Page not found</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn-primary inline-block mt-6">Back to home</Link>
      </div>
    </div>
  );
}