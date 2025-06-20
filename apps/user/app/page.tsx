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
      <div className="flex-1 p-10 flex flex-col justify-center items-start">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Fast, safe social payments</h1>
        <p className="text-lg text-gray-700 mb-6 max-w-lg">
          Pay, get paid, grow a business, and more. Join the millions using GoPay.
        </p>
        <a href="/login" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow">
  Get Started
</a>

      </div>
      <div className="flex-1 relative">
        <img
          src="/landingPageImage.png"
          alt="Social Payment App"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
