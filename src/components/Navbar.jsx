import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="border-b border-[#1f1f1f] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="YAHAN_APNA_IMAGE_URL_DAALO"
            alt="Snip logo"
            className="w-9 h-9 object-contain shrink-0"
          />
          <div>
            <h1 className="font-display text-xl tracking-tight leading-none">Snip</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#6a6a65] mt-0.5">
              Link Service
            </p>
          </div>
        </Link>

        {user ? (
          <div className="flex items-center gap-3 sm:gap-5">
            <p className="hidden sm:block text-sm text-[#8a8a85]">
              Signed in as <span className="text-[#f5f5f0]">{user?.username}</span>
            </p>
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-[#2a2a2a] hover:border-[#f5f5f0] px-4 py-2 text-sm transition-colors"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link
              to="/login"
              className="text-sm text-[#c9c9c5] hover:text-[#f5f5f0] px-3 sm:px-4 py-2 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="text-sm bg-[#f5f5f0] text-[#0a0a0a] px-4 py-2 font-medium hover:bg-white transition-colors"
            >
              Sign up free
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}