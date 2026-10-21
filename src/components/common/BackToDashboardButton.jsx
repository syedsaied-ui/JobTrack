import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const BackToDashboardButton = () => {
  return (
    <Link
      to="/"
      className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-emerald-900/10 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:translate-y-0 cursor-pointer"
    >
      <ArrowLeft size={18} />
      Back to Dashboard
    </Link>
  );
};

export default BackToDashboardButton;
