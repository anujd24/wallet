'use client';

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Prevent logged-in users from seeing login page
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false, // manual redirect
      phone,
      password,
    });

    if (res?.ok && !res.error) {
      router.replace("/dashboard");
    } else {
      alert("Invalid phone or password.");
    }

    setLoading(false);
  };

  if (status === "loading") return null; // prevents flickering

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Image */}
      <div className="md:w-1/2 hidden md:flex items-center justify-center p-12">
        <div className="w-[700px] h-[600px] relative hidden lg:block -mt-20">
          < img
            src="../login.jpg" 
            alt="Digital Wallet Illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 -mt-26">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#0d47a1] mb-2">GOPAY</h1>
            <h2 className="text-xl text-gray-600 mb-4">SECURE PAYMENTS</h2>
            <p className="text-gray-500 mb-6">Where Your Financial Freedom Begins</p>
            <p className="text-sm text-gray-400">Manage your money securely with just a few taps</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0d47a1] text-white py-3 px-4 rounded-lg font-medium cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-70"
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
