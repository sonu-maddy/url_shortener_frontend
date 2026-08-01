import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      toast.error("Fill in every field to continue");
      return;
    }

    try {
      setLoading(true);
      await registerUser(form);
      toast.success("Account created — log in to continue");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't create your account");
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
          <h1 className="font-display text-2xl mb-1">Create an account</h1>
          <p className="text-sm text-[#8a8a85] mb-8">Unlimited links, tracked and saved.</p>

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
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
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
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-center text-[#8a8a85] text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#f5f5f0] underline underline-offset-4">
            Log in
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