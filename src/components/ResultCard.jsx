import { useState } from "react";
import { Copy, Check, ExternalLink, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

import QrCode from "./QrCode";

export default function ResultCard({ result, onShortenAnother }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const shortUrl = result.shortUrl || `http://localhost:8080/r/${result.shortCode}`;

  const copy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mt-10 max-w-xl mx-auto animate-stamp">
      <div className="border border-[#2a2a2a] bg-[#111110]">
        <div className="p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#6a6a65] mb-2">
            Original link
          </p>
          <p className="text-sm text-[#a8a8a3] truncate">{result.originalUrl}</p>
        </div>

        <div className="ticket-perforation mx-6" />

        <div className="p-6 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#6a6a65] mb-2 flex items-center gap-1.5">
              <Sparkles size={11} /> Your short link
            </p>
            <p className="font-mono-custom text-lg text-[#f5f5f0] truncate">{shortUrl}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={copy}
              className="w-10 h-10 flex items-center justify-center border border-[#2a2a2a] hover:border-[#f5f5f0] transition-colors"
              aria-label="Copy short link"
            >
              {copied ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} />
              )}
            </button>
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-[#2a2a2a] hover:border-[#f5f5f0] transition-colors"
              aria-label="Open short link"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        <div className="ticket-perforation mx-6" />

        <div className="p-6 flex items-center gap-4">
          <QrCode url={shortUrl} size={88} />
          <p className="text-xs text-[#8a8a85] leading-relaxed">
            Scan this to open your short link on another device.
          </p>
        </div>
      </div>

      <button
        onClick={onShortenAnother}
        className="w-full mt-4 text-sm text-[#8a8a85] hover:text-[#f5f5f0] transition-colors py-2"
      >
        Shorten another link →
      </button>
    </div>
  );
}