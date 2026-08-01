import { Search } from "lucide-react";

export default function SearchFilter({ value, onChange }) {
  return (
    <div className="relative mb-6">
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6a6a65]"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search your links..."
        className="w-full bg-[#111110] border border-[#2a2a2a] focus:border-[#f5f5f0] pl-11 pr-4 py-3 outline-none text-sm transition-colors placeholder:text-[#5a5a55]"
      />
    </div>
  );
}