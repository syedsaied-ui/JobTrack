import { ChevronDown } from "lucide-react";

const FilterByDate = ({ handleFilterByDate, filterByDate, filterDate }) => {
  return (
    <div className="relative w-full lg:w-52 lg:shrink-0">
      <label htmlFor="job-date" className="sr-only">
        Filter by date
      </label>
      <select
        id="job-date"
        value={filterByDate}
        onChange={handleFilterByDate}
        className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-medium text-slate-700 outline-none transition hover:border-emerald-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      >
        <option value="all">Any time</option>

        {filterDate.map((date) => (
          <option key={date} value={date}>
            {date}
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

export default FilterByDate;
