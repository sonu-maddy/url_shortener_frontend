import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="w-9 h-9 flex items-center justify-center border border-[#2a2a2a] hover:border-[#f5f5f0] disabled:opacity-30 disabled:hover:border-[#2a2a2a] transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      <p className="text-sm text-[#8a8a85] font-mono-custom">
        {page} / {totalPages}
      </p>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="w-9 h-9 flex items-center justify-center border border-[#2a2a2a] hover:border-[#f5f5f0] disabled:opacity-30 disabled:hover:border-[#2a2a2a] transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}