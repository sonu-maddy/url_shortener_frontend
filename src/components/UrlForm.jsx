import { useState } from "react";

export default function UrlForm({
  onSubmit,
  buttonLabel = "Shorten link",
  placeholder = "Paste a long URL...",
  showExpiry = false,
}) {
  const [url, setUrl] = useState("");
  const [expiresInDays, setExpiresInDays] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    try {
      setLoading(true);
      const parsedExpiry = expiresInDays ? Number(expiresInDays) : null;
      const result = await onSubmit(url.trim(), parsedExpiry);
      // A parent can return `false` to keep the input as-is (e.g. blocked or failed)
      if (result !== false) setUrl("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-[#111110] border border-[#2a2a2a] focus:border-[#f5f5f0] px-5 py-4 outline-none text-sm transition-colors placeholder:text-[#5a5a55]"
      />

      {showExpiry && (
        <select
          value={expiresInDays}
          onChange={(e) => setExpiresInDays(e.target.value)}
          className="bg-[#111110] border border-[#2a2a2a] focus:border-[#f5f5f0] px-4 py-4 outline-none text-sm text-[#c9c9c5] transition-colors sm:w-44"
        >
          <option value="">Never expires</option>
          <option value="1">Expires in 1 day</option>
          <option value="7">Expires in 7 days</option>
          <option value="30">Expires in 30 days</option>
        </select>
      )}

      <button
        disabled={loading}
        className="bg-[#f5f5f0] text-[#0a0a0a] px-8 py-4 font-medium hover:bg-white transition-colors disabled:opacity-50 whitespace-nowrap"
      >
        {loading ? "Shortening..." : buttonLabel}
      </button>
    </form>
  );
}