import ApplicationCard from "../components/Applications/ApplicationCard";
import { CircleAlert, FileText } from "lucide-react";
import useApplications from "../context/useApplications";

const MyApplications = () => {
  const { applications, loadError, loadingApplication, actionError } =
    useApplications();

  return (
    <div className="min-h-screen bg-[#F7FAF8] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Your job search
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">
            My Applications
          </h1>

          <p className="mt-2 text-base text-gray-600">
            Keep track of your applications and stay updated on your progress.
          </p>
        </div>

        {actionError && (
          <div
            role="alert"
            className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <CircleAlert size={20} className="shrink-0" />
            <p>{actionError}</p>
          </div>
        )}

        {loadingApplication && (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-emerald-100 bg-white">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
            <p className="mt-4 text-sm font-medium text-gray-600">
              Loading your applications...
            </p>
          </div>
        )}

        {!loadingApplication && loadError && (
          <div
            role="alert"
            className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-red-200 bg-white px-6 text-center"
          >
            <CircleAlert size={32} className="text-red-500" />
            <h2 className="mt-3 text-lg font-semibold text-gray-900">
              Couldn't load your applications
            </h2>
            <p className="mt-1 text-sm text-gray-600">{loadError}</p>
          </div>
        )}

        {!loadingApplication &&
          !loadError &&
          applications &&
          applications.length === 0 && (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-200 bg-white px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                <FileText size={27} className="text-emerald-600" />
              </div>

              <h2 className="mt-4 text-xl font-bold text-emerald-950">
                No applications yet
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-gray-600">
                When you apply for a job, your application will appear here so
                you can track its status.
              </p>
            </div>
          )}

        {!loadingApplication && !loadError && applications?.length > 0 && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Submitted applications
              </h2>

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
                {applications.length}{" "}
                {applications.length === 1 ? "application" : "applications"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {applications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
