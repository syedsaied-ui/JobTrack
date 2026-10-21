import { ChevronDown } from "lucide-react";

const FilterByJobCategory = ({
  FilterByJobType,
  handleFilterByJob,
  onlyJobType,
}) => {
  return (
    <div className="relative w-full lg:w-52 lg:shrink-0">
      <label htmlFor="job-type" className="sr-only">
        Filter by category
      </label>
      <select
        id="job-type"
        onChange={handleFilterByJob}
        value={FilterByJobType}
        className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-medium text-slate-700 outline-none transition hover:border-emerald-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      >
        <option value="all">All Job Types</option>

        {onlyJobType.map((jobType) => (
          <option key={jobType} value={jobType}>
            {jobType}
          </option>
        ))}
      </select>

      <ChevronDown
        size={18}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
      />
    </div>
  );
};

export default FilterByJobCategory;
