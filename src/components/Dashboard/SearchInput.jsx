import { Search } from "lucide-react";
import FilterCategory from "./FilterCategory";
import FilterByJobCategory from "./FilterByJobType";
import FilterByDate from "./FilterByDate";

const SearchInput = ({
  handleSearch,
  setUserInput,
  userInput,
  uniqueCategory,
  filterCategory,
  handleFilterCategory,
  handleFilterByJob,
  onlyJobType,
  filterByJobType,
  handleFilterByDate,
  filterByDate,
  filterDate,
}) => {
  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm sm:p-4"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex min-w-0 w-full flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-100">
          <Search size={20} className="shrink-0 text-emerald-700" />

          <input
            type="text"
            value={userInput}
            onChange={handleInput}
            placeholder="Job title, company, location or keyword..."
            aria-label="Search jobs"
            className="h-12 w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
          />
        </div>

        <FilterCategory
          uniqueCategory={uniqueCategory}
          filterCategory={filterCategory}
          handleFilterCategory={handleFilterCategory}
        />

        <FilterByJobCategory
          onlyJobType={onlyJobType}
          filterByJobType={filterByJobType}
          handleFilterByJob={handleFilterByJob}
        />

        <FilterByDate
          filterDate={filterDate}
          filterByDate={filterByDate}
          handleFilterByDate={handleFilterByDate}
        />

        <button
          type="submit"
          className="flex h-12 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-800 px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 active:scale-[0.98] sm:text-base lg:w-auto"
        >
          <Search size={18} />
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
