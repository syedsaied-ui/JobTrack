import { useEffect, useState } from "react";
import getJobs from "../services/jobService";
import useApplications from "../context/useApplications";
import SearchJobs from "../components/Dashboard/SearchJobs";
import { LoaderCircle, AlertCircle } from "lucide-react";

const Home = () => {
  const [jobs, setJobs] = useState(null);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [displayError, setDisplayError] = useState(null);

  const { applications } = useApplications();

  useEffect(() => {
    async function fetchJobs() {
      setLoadingSpinner(true);

      try {
        const data = await getJobs();
        setJobs(data);
        setDisplayError(null);
      } catch (error) {
        setDisplayError(error.message || "Failed to load jobs.");
        setJobs(null);
      } finally {
        setLoadingSpinner(false);
      }
    }

    fetchJobs();
  }, []);

  return (
    <main className="min-h-screen bg-[#F7FAF8]">
      {loadingSpinner ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <LoaderCircle size={36} className="animate-spin text-emerald-700" />
          <p className="text-sm font-medium text-slate-600">
            Loading available jobs...
          </p>
        </div>
      ) : displayError ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertCircle size={28} />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Unable to load jobs
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
            {displayError}
          </p>
        </div>
      ) : (
        <SearchJobs jobs={jobs ?? []} applications={applications} />
      )}
    </main>
  );
};

export default Home;
