import { Link, NavLink } from "react-router";
import {
  BriefcaseBusiness,
  LayoutDashboard,
  ClipboardList,
} from "lucide-react";

const Header = () => {
  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 rounded-xl px-2.5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:px-3 ${
      isActive
        ? "bg-emerald-50 text-emerald-800"
        : "text-slate-600 hover:bg-emerald-50/70 hover:text-emerald-800"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-100 bg-white/95 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-18 sm:px-6 lg:px-8"
      >
        <Link
          to="/"
          aria-label="JobTrack home"
          className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/20">
            <BriefcaseBusiness size={21} strokeWidth={2.2} />
          </div>

          <div>
            <span className="text-xl font-extrabold tracking-tight text-emerald-950">
              Job<span className="text-emerald-600">Track</span>
            </span>
            <p className="hidden text-[11px] font-medium tracking-wide text-slate-500 sm:block">
              YOUR CAREER, ORGANIZED
            </p>
          </div>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          <li>
            <NavLink to="/" end aria-label="Dashboard" className={navLinkClass}>
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/applications"
              aria-label="My Applications"
              className={navLinkClass}
            >
              <ClipboardList size={18} />
              <span className="hidden sm:inline">My Applications</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
