import { useState } from "react";
import { Search } from "lucide-react";
import SearchInput from "./SearchInput";
import JobCard from "./JobCard";

const SearchJobs = ({ jobs, applications }) => {
  const [userInput, setUserInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterByJobType, setFilterByJobType] = useState("all");
  const [filterByDate, setFilterByDate] = useState("all");

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const getDateFor7 = new Date();
  getDateFor7.setHours(0, 0, 0, 0);

  const getDateFor30 = new Date();
  getDateFor30.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastSevenDays = getDateFor7.setDate(today.getDate() - 6);
  const lastThirtyDays = getDateFor30.setDate(today.getDate() - 29);

  const filteredJobs = (jobs ?? []).filter((job) => {
    const searchableFields = [
      job.category,
      job.company,
      job.jobType,
      job.description,
      job.location,
      job.jobTitle,
    ];

    const keywordChecks = searchableFields.some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(normalizedSearch),
    );

    const categoryMatches =
      filterCategory === "all" ||
      job.category?.toLowerCase() === filterCategory.toLowerCase();

    const JobTypeMatches =
      filterByJobType === "all" || job.jobType === filterByJobType;

    const [year, month, day] = job.postedDate.split("-").map(Number);
    const jobDates = new Date(year, month - 1, day);
    jobDates.setHours(0, 0, 0, 0);

    const dateMatches =
      filterByDate === "all" ||
      (filterByDate === "Today"
        ? jobDates.getTime() === today.getTime()
        : filterByDate === "Last 7 days"
          ? jobDates.getTime() >= lastSevenDays &&
            jobDates.getTime() <= today.getTime()
          : filterByDate === "Last 30 days"
            ? jobDates.getTime() >= lastThirtyDays &&
              jobDates.getTime() <= today.getTime()
            : false);

    return keywordChecks && categoryMatches && JobTypeMatches && dateMatches;
  });

  const uniqueCategory = [
    ...new Set((jobs ?? []).map((job) => job.category).filter(Boolean)),
  ];

  const onlyJobType = [
    ...new Set((jobs ?? []).map((job) => job.jobType).filter(Boolean)),
  ];

  const filterDate = ["Today", "Last 7 days", "Last 30 days"];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(userInput);
  };

  const handleFilterCategory = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleFilterByJob = (e) => {
    setFilterByJobType(e.target.value);
  };

  const handleFilterByDate = (e) => {
    setFilterByDate(e.target.value);
  };

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Find your next opportunity
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">
            Explore Jobs
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Discover opportunities that match your skills and career goals.
          </p>
        </div>

        <SearchInput
          handleSearch={handleSearch}
          setUserInput={setUserInput}
          userInput={userInput}
          uniqueCategory={uniqueCategory}
          filterCategory={filterCategory}
          handleFilterCategory={handleFilterCategory}
          handleFilterByJob={handleFilterByJob}
          filterByJobType={filterByJobType}
          onlyJobType={onlyJobType}
          filterByDate={filterByDate}
          handleFilterByDate={handleFilterByDate}
          filterDate={filterDate}
        />

        <div className="mb-5 mt-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-emerald-950">
              Available Jobs
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredJobs.length}{" "}
              {filteredJobs.length === 1 ? "opportunity" : "opportunities"}{" "}
              found
            </p>
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-200 bg-white px-6 py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <Search size={26} />
            </div>

            <h3 className="text-lg font-semibold text-emerald-950">
              No jobs found
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              We couldn't find any jobs matching your search. Try another
              keyword or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredJobs.map((job) => {
              const matchingApplication = applications?.find(
                (application) => application.jobId === job.id,
              );

              return (
                <JobCard
                  key={job.id}
                  job={job}
                  application={matchingApplication}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchJobs;
