import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import UrlForm from "../components/UrlForm";
import UrlTable from "../components/UrlTable";
import AnalyticsCards from "../components/AnalyticsCards";
import ClicksChart from "../components/ClicksChart";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";
import { shortenUrl, getMyUrls, deleteUrl } from "../services/urlService";

const PAGE_SIZE = 5;

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = async () => {
    try {
      const data = await getMyUrls();
      setUrls(data);
    } catch (e) {
      toast.error("Couldn't load your links");
    }
  };

  const handleShorten = async (url, expiresInDays) => {
    try {
      await shortenUrl(url, expiresInDays);
      toast.success("Link shortened");
      loadUrls();
    } catch (e) {
      toast.error(e.response?.data?.message || "Couldn't shorten that link");
      return false;
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this link?")) return;
    try {
      await deleteUrl(id);
      toast.success("Link deleted");
      loadUrls();
    } catch (e) {
      toast.error("Couldn't delete that link");
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return urls;
    return urls.filter(
      (u) =>
        u.originalUrl?.toLowerCase().includes(q) ||
        u.shortCode?.toLowerCase().includes(q) ||
        u.shortUrl?.toLowerCase().includes(q)
    );
  }, [urls, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl mb-1">Your links</h1>
        <p className="text-[#8a8a85] text-sm mb-8">
          Shorten as many links as you need, all in one place.
        </p>

        <UrlForm onSubmit={handleShorten} showExpiry />

        <div className="mt-10">
          <AnalyticsCards urls={urls} />
          <ClicksChart urls={urls} />
          <SearchFilter value={search} onChange={setSearch} />
          <UrlTable urls={paginated} onDelete={handleDelete} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}