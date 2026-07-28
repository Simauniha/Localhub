import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedInIcon } from "../icons/index.jsx";
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-brand-gradient grid place-items-center text-white font-bold">L</div>
            <span className="font-extrabold text-white text-lg">LocalHub</span>
          </div>
          <p className="text-sm">Discover, book & save at the best local businesses around you.</p>
          <div className="flex gap-3 mt-4 text-lg">
            <a href="#" aria-label="Facebook" className="hover:text-brand"><FacebookIcon className="w-5 h-5" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-brand"><InstagramIcon className="w-5 h-5" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-brand"><TwitterIcon className="w-5 h-5" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-brand"><LinkedInIcon className="w-5 h-5" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/listings" className="hover:text-brand">Listings</Link></li>
            <li><Link to="/deals" className="hover:text-brand">Deals</Link></li>
            <li><Link to="/events" className="hover:text-brand">Events</Link></li>
            <li><Link to="/about" className="hover:text-brand">About</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3">For Business</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/partner" className="hover:text-brand">Become a Partner</Link></li>
            <li><Link to="/partner/dashboard" className="hover:text-brand">Partner Login</Link></li>
            <li><Link to="/admin" className="hover:text-brand">Admin</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-brand">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-brand">Terms of Service</Link></li>
            <li><Link to="/contact" className="hover:text-brand">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-6 text-center text-sm">© {new Date().getFullYear()} LocalHub. All rights reserved.</div>
    </footer>
  );
}
