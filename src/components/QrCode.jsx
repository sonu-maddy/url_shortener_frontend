export default function QrCode({ url, size = 120 }) {
  if (!url) return null;

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    url
  )}`;

  return (
    <img
      src={qrSrc}
      alt="QR code for short link"
      width={size}
      height={size}
      className="border border-[#2a2a2a] bg-white p-1.5 shrink-0"
    />
  );
}