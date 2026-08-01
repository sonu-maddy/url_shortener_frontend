import { X, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const benefits = [
  "Unlimited short links",
  "Click tracking on every link",
  "Manage and delete links anytime",
  "Your full link history, saved",
];

export default function UpgradeModal({ open, onClose }) {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <div className="relative bg-[#0f0f0e] border border-[#2a2a2a] max-w-md w-full p-8 animate-stamp">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#6a6a65] hover:text-[#f5f5f0] transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <p className="text-[10px] uppercase tracking-[0.2em] text-[#6a6a65] mb-3">
          Free link used
        </p>
        <h2 className="font-display text-2xl mb-2">One link is the guest limit.</h2>
        <p className="text-sm text-[#a8a8a3] mb-6">
          Create a free account to keep shortening links, and unlock everything below.
        </p>

        <ul className="space-y-3 mb-8">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-[#c9c9c5]">
              <Check size={15} className="text-[#f5f5f0] mt-0.5 shrink-0" />
              {b}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/register")}
            className="w-full bg-[#f5f5f0] text-[#0a0a0a] py-3 font-medium hover:bg-white transition-colors"
          >
            Create a free account
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full border border-[#2a2a2a] py-3 text-sm hover:border-[#f5f5f0] transition-colors"
          >
            I already have an account
          </button>
        </div>
      </div>
    </div>
  );
}