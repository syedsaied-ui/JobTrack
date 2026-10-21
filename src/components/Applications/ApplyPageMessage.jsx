import { BriefcaseBusiness, Search } from "lucide-react";
import BackToDashboardButton from "../common/BackToDashboardButton";

const ApplyPageMessage = () => {
  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-[#F7FAF8] px-4 py-12 sm:px-6">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-emerald-100 bg-white px-6 py-12 text-center shadow-sm sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-50 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-emerald-50 blur-2xl" />

        <div className="relative">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-100">
            <BriefcaseBusiness
              size={38}
              strokeWidth={1.7}
              className="text-emerald-700"
            />
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
            JobTrack
          </p>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-emerald-950 sm:text-3xl">
            Select a Job to Apply
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
            Ready to take the next step in your career? Browse available
            opportunities on your dashboard and select a job to start your
            application.
          </p>

          <BackToDashboardButton />

          <div className="mt-7 flex items-center justify-center gap-2 text-xs font-medium text-gray-500">
            <Search size={15} className="text-emerald-600" />
            <span>Explore jobs that match your goals</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPageMessage;
