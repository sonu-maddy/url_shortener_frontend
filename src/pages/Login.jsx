import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      toast.error("Enter both fields to continue");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(form);
      console.log("Response:", data);
      login(data);

      console.log("Token after login:", localStorage.getItem("token"));
      toast.success("Welcome back");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Wrong username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="block text-center mb-8">
          <span className="font-display text-2xl">Snip</span>
        </Link>

        <div className="border border-[#2a2a2a] bg-[#0f0f0e] p-8">
          <h1 className="font-display text-2xl mb-1">Log in</h1>
          <p className="text-sm text-[#8a8a85] mb-8">Welcome back — your links are waiting.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-[#111110] border border-[#2a2a2a] focus:border-[#f5f5f0] px-4 py-3 outline-none text-sm transition-colors placeholder:text-[#5a5a55]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-[#111110] border border-[#2a2a2a] focus:border-[#f5f5f0] px-4 py-3 outline-none text-sm transition-colors placeholder:text-[#5a5a55]"
            />

            <button
              disabled={loading}
              className="w-full bg-[#f5f5f0] text-[#0a0a0a] py-3 font-medium hover:bg-white transition-colors disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>

        <p className="text-center text-[#8a8a85] text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#f5f5f0] underline underline-offset-4">
            Sign up
          </Link>
        </p>

        <p className="text-center text-[#5a5a55] text-xs mt-3">
          <Link to="/" className="hover:text-[#8a8a85] transition-colors">
            ← Continue without an account
          </Link>
        </p>
      </div>
    </div>
  );
}