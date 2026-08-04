import { useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import UrlForm from "../components/UrlForm";
import ResultCard from "../components/ResultCard";
import UpgradeModal from "../components/UpgradeModal";
import { shortenUrl } from "../services/urlService";
import {
  hasUsedGuestShorten,
  markGuestShortenUsed,
  saveGuestShortUrl,
  getGuestShortUrl,
} from "../utils/guestLimit";

import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const steps = [
  { n: "01", label: "Paste your link", desc: "Drop in any URL, no matter how long." },
  { n: "02", label: "Get a short one", desc: "We generate a clean, shareable link instantly." },
  { n: "03", label: "Share it anywhere", desc: "Copy, share, and track clicks as they come in." },
];

export default function Home() {
  const [result, setResult] = useState(() => getGuestShortUrl());
  const [showUpgrade, setShowUpgrade] = useState(false);

   const { user } = useAuth();

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

  const handleShorten = async (url) => {
    // Guest already used their one free link — block before hitting the API
    if (hasUsedGuestShorten()) {
      setShowUpgrade(true);
      return false;
    }

    try {
      const data = await shortenUrl(url);
      setResult(data);
      markGuestShortenUsed();
      saveGuestShortUrl(data);
      toast.success("Link shortened");
    } catch (e) {
      toast.error(e.response?.data?.message || "Couldn't shorten that link");
      return false;
    }
  };

  const handleShortenAnother = () => {
    setShowUpgrade(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 pt-20 pb-24 text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#6a6a65] mb-5">
          Free · No account needed for your first link
        </p>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-6">
          Long links, <span className="italic text-[#a8a8a3]">shortened</span>.
        </h1>

        <p className="text-[#a8a8a3] text-base sm:text-lg max-w-xl mx-auto mb-12">
          Paste a link below and get a short one back in a second. Your first link is on us.
        </p>

        {!result ? (
          <UrlForm onSubmit={handleShorten} />
        ) : (
          <ResultCard result={result} onShortenAnother={handleShortenAnother} />
        )}

        <div className="grid sm:grid-cols-3 gap-8 mt-24 text-left">
          {steps.map((s) => (
            <div key={s.n}>
              <p className="font-mono-custom text-sm text-[#5a5a55] mb-3">{s.n}</p>
              <h3 className="font-medium mb-1.5">{s.label}</h3>
              <p className="text-sm text-[#8a8a85] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </div>
  );
}