import { CircleCheck } from "lucide-react";
import { useNavigate } from "react-router";

const ApplicationSubmitted = () => {
  const navigate = useNavigate();

  const clickMyApplications = () => {
    navigate("/applications");
  };

  const clickDashboard = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-3xl items-center justify-center">
        <div className="w-full max-w-xl rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center shadow-sm sm:px-10 sm:py-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CircleCheck
              className="text-emerald-600"
              size={34}
              strokeWidth={2}
            />
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-emerald-950">
            Application Submitted!
          </h1>

          <p className="mx-auto mt-3 max-w-md text-base leading-7 text-gray-600">
            Your application has been successfully submitted. You can track its
            status and details from My Applications.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={clickMyApplications}
              className="w-full rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer sm:w-auto"
            >
              View My Applications
            </button>

            <button
              onClick={clickDashboard}
              className="w-full rounded-lg border border-emerald-200 bg-emerald-100 px-6 py-3 font-semibold text-emerald-800 transition hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer sm:w-auto"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSubmitted;
