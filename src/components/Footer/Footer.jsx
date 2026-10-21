import { Link } from "react-router";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinkClass =
    "inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm";

  return (
    <footer className="border-t border-emerald-100 bg-[#F7FAF8]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-[1fr_auto] md:items-start lg:px-8">
        <div className="max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <BriefcaseBusiness size={19} />
            </div>

            <span className="text-xl font-extrabold tracking-tight text-emerald-950">
              Job<span className="text-emerald-600">Track</span>
            </span>
          </Link>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            Keep your job applications organized, track your progress, and stay
            focused throughout your job search.
          </p>
        </div>

        <div className="md:min-w-48">
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
            Explore
          </h2>

          <ul className="mt-4 space-y-3">
            <li>
              <Link to="/" className={footerLinkClass}>
                Browse jobs
                <ArrowUpRight size={15} />
              </Link>
            </li>

            <li>
              <Link to="/applications" className={footerLinkClass}>
                My Applications
                <ArrowUpRight size={15} />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-emerald-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs leading-5 text-slate-500 sm:px-6 sm:text-sm md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© {currentYear} JobTrack. All rights reserved.</p>

          <p>Built for a more organized job search.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
