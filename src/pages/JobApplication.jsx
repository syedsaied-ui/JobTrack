import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { getJobById } from "../services/jobService";
import { TriangleAlert, LoaderCircle, CircleAlert } from "lucide-react";
import useApplications from "../context/useApplications";
import BackToDashboardButton from "../components/common/BackToDashboardButton";

const JobApplication = () => {
  const { applications, loadingApplication, loadError, submitJobApplication } =
    useApplications();

  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobNotFound, setJobNotFound] = useState(null);

  const jobNotFoundMsg =
    "This job may have been removed or the link may be incorrect. Please return to the dashboard to explore available opportunities";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    resumeUrl: "",
  });

  const [fieldError, setFieldError] = useState({});

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [isDuplicate, setIsDuplicate] = useState(null);

  const { jobId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSelectedJob() {
      setLoading(true);
      setError(null);
      setJobNotFound(null);

      try {
        const job = await getJobById(jobId);
        setSelectedJob(job);
        setError(null);
      } catch (error) {
        if (error.response?.status === 404) {
          setJobNotFound(jobNotFoundMsg);
        } else {
          setError(error.message);
        }
        setSelectedJob(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSelectedJob();
  }, [jobId]);

  useEffect(() => {
    setIsDuplicate(null);

    const getJobApplications = () => {
      if (!loadingApplication && !loadError && applications) {
        const alreadyApplied = applications.some(
          (application) => application.jobId === jobId,
        );
        setIsDuplicate(alreadyApplied);
      }
    };

    getJobApplications();
  }, [applications, jobId, loadingApplication, loadError]);

  const fieldName = {
    name: "Full name",
    email: "Email address",
    phone: "Phone number",
    coverLetter: "Cover letter",
    resumeUrl: "Resume URL",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (!value.trim()) {
      setFieldError((prevErrors) => ({
        ...prevErrors,
        [name]: `${fieldName[name]} is required`,
      }));
    } else {
      setFieldError((prevErrors) => {
        const { [name]: removedError, ...remainingErrors } = prevErrors;
        return remainingErrors;
      });
    }
  };

  const isSubmittingRef = useRef(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isDuplicate !== false || isSubmittingRef.current) return;

    const errors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        errors[key] = `${fieldName[key]} is required`;
      }
    });

    setFieldError(errors);

    const firstInvalidField = Object.keys(errors)[0];

    if (firstInvalidField) {
      const fieldElement = document.getElementById(firstInvalidField);

      fieldElement?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      fieldElement?.focus({ preventScroll: true });

      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    isSubmittingRef.current = true;

    try {
      await submitJobApplication(formData, selectedJob);
      navigate("/application-submitted");
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50/40 px-4 py-10">
      {isDuplicate === null && !loadError && (
        <div
          role="status"
          className="flex items-center justify-center gap-3 rounded-2xl border border-emerald-100 bg-white px-5 py-6 shadow-sm"
        >
          <LoaderCircle size={22} className="animate-spin text-emerald-600" />
          <p className="text-sm font-medium text-slate-600 sm:text-base">
            Checking your application status...
          </p>
        </div>
      )}

      {loadError && (
        <div
          role="alert"
          className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
        >
          <p>Couldn't load your applications. {loadError}</p>
        </div>
      )}

      {isDuplicate === true && (
        <div
          role="status"
          className="mx-auto max-w-3xl rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:p-6"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <CircleAlert size={23} />
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-semibold text-amber-950 sm:text-lg">
                You've already applied for this position
              </h2>

              <p className="mt-2 text-sm leading-6 text-amber-900/80">
                Your application is already being tracked. Visit{" "}
                <Link
                  to="/applications"
                  className="font-semibold text-emerald-800 underline decoration-emerald-300 underline-offset-4 transition hover:text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  My Applications
                </Link>{" "}
                to check its status or manage your application.
              </p>
            </div>
          </div>
        </div>
      )}

      {loading && isDuplicate === false && (
        <div
          role="status"
          className="flex items-center justify-center gap-3 rounded-2xl border border-emerald-100 bg-white px-5 py-6 shadow-sm"
        >
          <LoaderCircle size={22} className="animate-spin text-emerald-600" />
          <p className="text-sm font-medium text-slate-600 sm:text-base">
            Loading job details...
          </p>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700"
        >
          <p>{error}</p>
        </div>
      )}

      {jobNotFound && (
        <div className="flex min-h-[75vh] items-center justify-center px-4 py-12 sm:px-6">
          <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-emerald-100 bg-white px-6 py-12 text-center shadow-sm sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-50 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-emerald-50 blur-2xl" />

            <div className="relative">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 ring-1 ring-red-100">
                <TriangleAlert
                  size={38}
                  strokeWidth={1.7}
                  className="text-red-600"
                />
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                JobTrack
              </p>

              <h1 className="mt-3 text-2xl font-bold tracking-tight text-emerald-950 sm:text-3xl">
                Job Not Found
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
                {jobNotFound}
              </p>

              <BackToDashboardButton />
            </div>
          </div>
        </div>
      )}

      {selectedJob && isDuplicate === false && (
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-600">
              Applying for
            </p>

            <h2 className="text-2xl font-bold text-emerald-950">
              {selectedJob.jobTitle}
            </h2>

            <p className="mt-2 text-lg font-medium text-gray-800">
              {selectedJob.company}
            </p>

            <p className="mt-2 text-sm text-gray-600">
              📍 {selectedJob.location}
            </p>
          </div>

          <form
            className="mt-6 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-emerald-950">
                Submit Your Application
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Fill in your information below to track this application.
              </p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="mb-2 text-sm font-semibold text-gray-700"
              >
                Full name
              </label>

              <input
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={Boolean(fieldError.name)}
                aria-describedby={fieldError.name ? "name-error" : undefined}
              />

              {fieldError.name && (
                <div className="mt-1 flex items-center gap-1.5 text-red-600">
                  <TriangleAlert size={15} aria-hidden="true" />
                  <span id="name-error" className="text-sm">
                    {fieldError.name}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-col">
              <label
                htmlFor="email"
                className="mb-2 text-sm font-semibold text-gray-700"
              >
                Email
              </label>

              <input
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(fieldError.email)}
                aria-describedby={fieldError.email ? "email-error" : undefined}
              />

              {fieldError.email && (
                <div className="mt-1 flex items-center gap-1.5 text-red-600">
                  <TriangleAlert size={15} aria-hidden="true" />
                  <span id="email-error" className="text-sm">
                    {fieldError.email}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-col">
              <label
                htmlFor="phone"
                className="mb-2 text-sm font-semibold text-gray-700"
              >
                Phone
              </label>

              <input
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                aria-invalid={Boolean(fieldError.phone)}
                aria-describedby={fieldError.phone ? "phone-error" : undefined}
              />

              {fieldError.phone && (
                <div className="mt-1 flex items-center gap-1.5 text-red-600">
                  <TriangleAlert size={15} aria-hidden="true" />
                  <span id="phone-error" className="text-sm">
                    {fieldError.phone}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-col">
              <label
                htmlFor="coverLetter"
                className="mb-2 text-sm font-semibold text-gray-700"
              >
                Cover Letter
              </label>

              <p className="mb-2 text-sm text-gray-500">
                Tell the employer why you're interested in this role and what
                you can bring to the position.
              </p>

              <textarea
                className="min-h-32 resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                aria-invalid={Boolean(fieldError.coverLetter)}
                aria-describedby={
                  fieldError.coverLetter ? "coverLetter-error" : undefined
                }
              />

              {fieldError.coverLetter && (
                <div className="mt-1 flex items-center gap-1.5 text-red-600">
                  <TriangleAlert size={15} aria-hidden="true" />
                  <span id="coverLetter-error" className="text-sm">
                    {fieldError.coverLetter}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-col">
              <label
                htmlFor="resumeUrl"
                className="mb-2 text-sm font-semibold text-gray-700"
              >
                Resume URL
              </label>

              <input
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                type="url"
                id="resumeUrl"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleChange}
                aria-invalid={Boolean(fieldError.resumeUrl)}
                aria-describedby={
                  fieldError.resumeUrl ? "resumeUrl-error" : undefined
                }
              />

              {fieldError.resumeUrl && (
                <div className="mt-1 flex items-center gap-1.5 text-red-600">
                  <TriangleAlert size={15} aria-hidden="true" />
                  <span id="resumeUrl-error" className="text-sm">
                    {fieldError.resumeUrl}
                  </span>
                </div>
              )}
            </div>

            {submitError && (
              <div
                role="alert"
                className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && (
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                  aria-hidden="true"
                />
              )}

              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default JobApplication;
