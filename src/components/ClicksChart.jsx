export default function ClicksChart({ urls }) {
  const top = [...urls]
    .sort((a, b) => (b.clickCount ?? 0) - (a.clickCount ?? 0))
    .slice(0, 6);

  if (!top.length) return null;

  const max = Math.max(...top.map((u) => u.clickCount ?? 0), 1);

  return (
    <div className="border border-[#2a2a2a] bg-[#0f0f0e] p-6 mb-8">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#6a6a65] mb-6">
        Clicks by link
      </p>
      <div className="space-y-4">
        {top.map((u) => {
          const shortUrl = u.shortUrl || `http://localhost:8080/r/${u.shortCode}`;
          const pct = Math.round(((u.clickCount ?? 0) / max) * 100);
          return (
            <div key={u.id}>
              <div className="flex justify-between text-xs mb-1.5 gap-4">
                <span className="font-mono-custom text-[#c9c9c5] truncate">
                  {shortUrl}
                </span>
                <span className="text-[#8a8a85] shrink-0">{u.clickCount ?? 0}</span>
              </div>
              <div className="h-2 bg-[#1a1a1a]">
                <div
                  className="h-2 bg-[#f5f5f0] transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}