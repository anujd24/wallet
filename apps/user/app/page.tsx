import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  // Not logged in — show landing page
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-blue-50">
      <div className="flex-1 flex items-center justify-center px-2 md:px-12 py-12 z-10 relative">
  <div className="max-w-xl text-left">
    <h1 className="text-4xl sm:text-5xl font-bold text-[#0d47a1] leading-tight mb-6">
      Fast, safe social payments
    </h1>
    <p className="text-base sm:text-lg text-gray-800 mb-8">
      Pay, get paid, grow a business, and more. Join the millions using GoPay.
    </p>
    <a
      href="/login"
      className="inline-block px-6 py-3 bg-[#0d47a1] hover:bg-blue-700 text-white font-semibold rounded-full shadow transition duration-300"
    >
      Get Started
    </a>
  </div>
</div>

      <div className="w-[700px] h-[700px] relative hidden lg:block">
        <img
          src="/Landing.png"
          alt="Social Payment App"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
