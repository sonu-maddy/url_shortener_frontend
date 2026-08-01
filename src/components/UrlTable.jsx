import { Fragment, useState } from "react";
import { Copy, Check, ExternalLink, Trash2, QrCode as QrIcon } from "lucide-react";
import toast from "react-hot-toast";

import QrCode from "./QrCode";

const formatExpiry = (expiresAt) => {
  if (!expiresAt) return null;
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return { label: "Expired", expired: true };
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return { label: days === 1 ? "1 day left" : `${days} days left`, expired: false };
};

export default function UrlTable({ urls, onDelete }) {
  const [copiedId, setCopiedId] = useState(null);
  const [qrOpenId, setQrOpenId] = useState(null);

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  if (!urls?.length) {
    return (
      <div className="mt-6 border border-dashed border-[#2a2a2a] py-16 text-center">
        <p className="text-[#8a8a85] text-sm">
          No links match — try a different search, or paste a new one above.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 border border-[#2a2a2a] overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#2a2a2a] text-left text-[#6a6a65] text-[11px] uppercase tracking-[0.15em]">
            <th className="p-4 font-normal">Original URL</th>
            <th className="p-4 font-normal">Short URL</th>
            <th className="p-4 font-normal text-center">Clicks</th>
            <th className="p-4 font-normal text-center">Expires</th>
            <th className="p-4 font-normal text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((item) => {
            const shortUrl = item.shortUrl || `http://localhost:8080/r/${item.shortCode}`;
            const expiry = formatExpiry(item.expiresAt);
            const isQrOpen = qrOpenId === item.id;

            return (
              <Fragment key={item.id}>
                <tr className="border-b border-[#1a1a1a] last:border-b-0">
                  <td className="p-4 max-w-[220px] truncate text-[#c9c9c5]">
                    {item.originalUrl}
                  </td>
                  <td className="p-4 font-mono-custom text-[#f5f5f0]">{shortUrl}</td>
                  <td className="p-4 text-center text-[#8a8a85]">{item.clickCount ?? 0}</td>
                  <td className="p-4 text-center">
                    {expiry ? (
                      <span
                        className={
                          expiry.expired
                            ? "text-red-400 text-xs"
                            : "text-[#8a8a85] text-xs"
                        }
                      >
                        {expiry.label}
                      </span>
                    ) : (
                      <span className="text-[#5a5a55] text-xs">Never</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-4">
                      <button onClick={() => copy(shortUrl, item.id)} aria-label="Copy short link">
                        {copiedId === item.id ? (
                          <Check size={16} className="text-green-400 transition-transform scale-110" />
                        ) : (
                          <Copy
                            size={16}
                            className="text-[#8a8a85] hover:text-[#f5f5f0] transition-colors"
                          />
                        )}
                      </button>
                      <button
                        onClick={() => setQrOpenId(isQrOpen ? null : item.id)}
                        aria-label="Show QR code"
                      >
                        <QrIcon
                          size={16}
                          className={
                            isQrOpen
                              ? "text-[#f5f5f0]"
                              : "text-[#8a8a85] hover:text-[#f5f5f0] transition-colors"
                          }
                        />
                      </button>
                      <a href={shortUrl} target="_blank" rel="noreferrer" aria-label="Open short link">
                        <ExternalLink
                          size={16}
                          className="text-[#8a8a85] hover:text-[#f5f5f0] transition-colors"
                        />
                      </a>
                      <button onClick={() => onDelete(item.id)} aria-label="Delete link">
                        <Trash2
                          size={16}
                          className="text-[#8a8a85] hover:text-red-400 transition-colors"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
                {isQrOpen && (
                  <tr className="border-b border-[#1a1a1a] bg-[#0f0f0e]">
                    <td colSpan={5} className="p-6 flex justify-center">
                      <QrCode url={shortUrl} />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}