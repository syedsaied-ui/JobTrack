import { Trash2, X, LoaderCircle } from "lucide-react";
import { useEffect } from "react";

const ConfirmDialog = ({
  isConfirmOpen,
  handleCancelButton,
  handleConfirmDeletion,
  isDeleting,
}) => {
  useEffect(() => {
    if (!isConfirmOpen) return;
    if (isDeleting) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCancelButton();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isConfirmOpen, handleCancelButton, isDeleting]);

  if (!isConfirmOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isDeleting) handleCancelButton();
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label="Confirm application deletion"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-950/20"
      >
        <div className="flex items-start justify-between gap-4 px-6 pb-4 pt-6 sm:px-7 sm:pt-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 ring-1 ring-inset ring-rose-100">
              <Trash2 size={23} className="text-rose-600" />
            </div>

            <div className="pt-0.5">
              <h2
                id="delete-dialog-title"
                className="text-lg font-bold tracking-tight text-emerald-950 sm:text-xl"
              >
                Delete application?
              </h2>

              <p
                id="delete-dialog-description"
                className="mt-2 text-sm leading-6 text-slate-600"
              >
                Are you sure you want to remove this application from your
                tracker?
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCancelButton}
            disabled={isDeleting}
            aria-label="Close confirmation dialog"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mx-6 rounded-xl border border-rose-100 bg-rose-50/70 px-4 py-3 sm:mx-7">
          <p className="text-sm leading-5 text-rose-800">
            This action permanently removes the record from JobTrack. It will
            not withdraw your application from the employer.
          </p>
        </div>

        <div className="flex flex-col-reverse gap-3 px-6 pb-6 pt-6 sm:flex-row sm:justify-end sm:px-7 sm:pb-7">
          <button
            type="button"
            onClick={handleCancelButton}
            disabled={isDeleting}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white cursor-pointer px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-800 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirmDeletion}
            disabled={isDeleting}
            aria-busy={isDeleting}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? (
              <LoaderCircle
                size={16}
                className="animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Trash2 size={16} aria-hidden="true" />
            )}

            {isDeleting ? "Deleting..." : "Delete application"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
