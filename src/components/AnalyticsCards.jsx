export default function AnalyticsCards({ urls }) {
  const totalUrls = urls.length;
  const totalClicks = urls.reduce((sum, u) => sum + (u.clickCount ?? 0), 0);

  const stats = [
    { label: "Total links", value: totalUrls },
    { label: "Total clicks", value: totalClicks },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="border border-[#2a2a2a] bg-[#0f0f0e] p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#6a6a65] mb-2">
            {s.label}
          </p>
          <p className="font-display text-3xl">{s.value}</p>
        </div>
      ))}
    </div>
  );
}