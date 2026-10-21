import { useState } from "react";
import useApplications from "../../context/useApplications";
import { Trash2 } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";

const ApplicationCard = ({ application }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const {
    updatingStatus,
    updateJobApplication,
    deleteJobApplication,
    deletingApplications,
  } = useApplications();

  const formattedSalary = (amount) =>
    new Intl.NumberFormat("en-PK").format(amount);

  const formattedDate = new Date(
    application.applicationDate,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const statuses = [
    "Applied",
    "Under Review",
    "Interview",
    "Offer",
    "Rejected",
    "Withdrawn",
  ];

  const statusStyles = {
    Applied: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    "Under Review": "bg-blue-50 text-blue-700 ring-blue-600/20",
    Interview: "bg-violet-50 text-violet-700 ring-violet-600/20",
    Offer: "bg-green-100 text-green-800 ring-green-600/20",
    Rejected: "bg-red-50 text-red-700 ring-red-600/20",
    Withdrawn: "bg-gray-100 text-gray-600 ring-gray-500/20",
  };

  const badgeStyle =
    statusStyles[application.status] ??
    "bg-gray-100 text-gray-700 ring-gray-500/20";

  const handleDeleteApplication = () => {
    setIsConfirmOpen(true);
  };

  const handleCancelButton = () => {
    setIsConfirmOpen(false);
  };

  const handleConfirmDeletion = async () => {
    const successDelete = await deleteJobApplication(application.id);

    if (successDelete) setIsConfirmOpen(false);
  };

  const isUpdating = updatingStatus.includes(application.id);
  const isDeleting = deletingApplications.includes(application.id);

  return (
    <>
      <article className="flex h-full flex-col rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-lg font-bold text-emerald-800">
              {application.company?.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-500">
                {application.company}
              </p>
              <h2 className="mt-1 text-lg font-bold leading-snug text-emerald-950">
                {application.jobTitle}
              </h2>
            </div>
          </div>

          <select
            value={application.status}
            onChange={(e) =>
              updateJobApplication(application.id, e.target.value)
            }
            disabled={isUpdating || isDeleting}
            className={`max-w-36 cursor-pointer appearance-none rounded-lg border-0 px-3 py-2 pr-7 text-xs font-semibold ring-1 ring-inset transition focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:cursor-wait disabled:opacity-60 ${badgeStyle}`}
          >
            {statuses.map((applicationStatus) => (
              <option key={applicationStatus} value={applicationStatus}>
                {applicationStatus}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-lg bg-[#F7FAF8] px-3 py-1.5 text-sm text-gray-600">
            📍 {application.location}
          </span>

          <span className="rounded-lg bg-[#F7FAF8] px-3 py-1.5 text-sm text-gray-600">
            💼 {application.jobType}
          </span>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Salary range
          </p>
          <p className="mt-1 text-lg font-bold text-emerald-800">
            {application.salary.currency}{" "}
            {formattedSalary(application.salary.min)} –{" "}
            {formattedSalary(application.salary.max)}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-gray-500">Applied on</p>
            <p className="mt-1 text-sm font-medium text-gray-700">
              {formattedDate}
            </p>
          </div>

          <div className="flex w-full gap-2 sm:w-auto">
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:flex-none"
            >
              View Job
              <span aria-hidden="true" className="ml-2">
                ↗
              </span>
            </a>

            <button
              type="button"
              onClick={handleDeleteApplication}
              disabled={isDeleting || isUpdating}
              aria-label={`Delete application at ${application.company}`}
              title="Delete application"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer disabled:cursor-wait disabled:opacity-60 focus:ring-offset-2 sm:flex-none"
            >
              <Trash2 size={16} />
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </article>

      {isConfirmOpen && (
        <ConfirmDialog
          isConfirmOpen={isConfirmOpen}
          handleCancelButton={handleCancelButton}
          handleConfirmDeletion={handleConfirmDeletion}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
};

export default ApplicationCard;
