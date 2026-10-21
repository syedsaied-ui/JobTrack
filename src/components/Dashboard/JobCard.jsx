import { Link } from "react-router";
import {
  MapPin,
  BriefcaseBusiness,
  CalendarDays,
  Banknote,
  ArrowUpRight,
} from "lucide-react";

const JobCard = ({ job, application }) => {
  const statusStyles = {
    applied: "bg-blue-50 text-blue-700 ring-blue-200",
    reviewed: "bg-violet-50 text-violet-700 ring-violet-200",
    interview: "bg-amber-50 text-amber-700 ring-amber-200",
    offer: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    rejected: "bg-red-50 text-red-700 ring-red-200",
  };

  const status = application?.status?.toLowerCase();

  const formatSalary = (salary) => {
    if (!salary) return "Salary not specified";

    const { min, max, currency } = salary;

    if (min == null && max == null) return "Salary not specified";

    const formatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    });

    const formatAmount = (amount) =>
      `${currency ?? ""} ${formatter.format(amount)}`.trim();

    if (min != null && max != null) {
      return `${formatAmount(min)} - ${formatAmount(max)}`;
    }

    return min != null
      ? `From ${formatAmount(min)}`
      : `Up to ${formatAmount(max)}`;
  };

  const formatDate = (date) => {
    if (!date) return "Date not specified";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date not specified";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg font-bold text-emerald-800">
            {job.company?.charAt(0)?.toUpperCase() ?? "?"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-700">
              {job.company}
            </p>
            <p className="mt-1 text-xs text-slate-400">Company</p>
          </div>
        </div>

        {job.jobType && (
          <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
            {job.jobType}
          </span>
        )}
      </div>

      <div className="mb-5">
        <h3 className="text-lg font-bold leading-7 text-emerald-950  group-hover:text-emerald-800">
          {job.jobTitle}
        </h3>

        {job.category && (
          <span className="mt-2 inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {job.category}
          </span>
        )}
      </div>

      <div className="mb-5 flex flex-col gap-3 border-b border-slate-100 pb-5 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <MapPin size={17} className="shrink-0 text-emerald-700" />
          <span className="truncate">
            {job.location || "Location not specified"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Banknote size={17} className="shrink-0 text-emerald-700" />
          <span>{formatSalary(job.salary)}</span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={17} className="shrink-0 text-emerald-700" />
          <span>Posted {formatDate(job.postedDate)}</span>
        </div>
      </div>

      <p className="mb-6 line-clamp-3 text-sm leading-6 text-slate-600">
        {job.description || "No job description provided."}
      </p>

      <div className="mt-auto">
        {application ? (
          <div
            className={`flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold capitalize ring-1 ring-inset ${
              statusStyles[status] ??
              "bg-slate-100 text-slate-700 ring-slate-200"
            }`}
          >
            <BriefcaseBusiness size={17} className="mr-2" />
            {application.status}
          </div>
        ) : (
          <Link
            to={`/apply/${job.id}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
          >
            Apply Now
            <ArrowUpRight size={17} />
          </Link>
        )}
      </div>
    </article>
  );
};

export default JobCard;
