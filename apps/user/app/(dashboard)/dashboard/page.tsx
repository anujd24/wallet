// app/(dashboard)/page.tsx
'use client';

import useSWR from 'swr';
import { Card } from '@repo/ui/card';
import { useRouter } from 'next/navigation';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface WalletData {
  balance: number;
  locked: number;
  income: number;
  expenses: number;
  recentTransactions: {
    id: string;
    time: string;
    amount: number;
    status: 'Success' | 'Failure' | 'Processing';
    provider: string;
  }[];
}

export default function HomePage() {
  const router = useRouter();
  const { data, error, mutate } = useSWR<WalletData>('/api/wallet', fetcher, {
    refreshInterval: 3000,
    revalidateOnFocus: true,
  });

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  if (error) return <div className="p-4 text-red-500">Failed to load data</div>;
  if (!data) return <div className="p-4">Loading...</div>;

  const balanceCards = [
    { title: "Total Balance", amount: data.balance, icon: "💰" },
    { title: "Monthly Income", amount: data.income, icon: "📈" },
    { title: "Monthly Expense", amount: data.expenses, icon: "📉" }
  ];

  return (
    <div className="p-4 md:p-8 flex flex-col justify-items-center">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#6a51a6]">
          Welcome Back!
        </h1>
        <div className="w-10 h-10 rounded-full bg-[#6a51a6] flex items-center justify-center text-white font-bold">
          U
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {balanceCards.map((card) => (
          <Card title='' key={card.title}>
            <div className="flex items-center p-4">
              <div className="text-2xl mr-4">{card.icon}</div>
              <div>
                <div className="text-sm text-gray-600">{card.title}</div>
                <div className="text-xl font-bold">
                  ₹ {(card.amount / 100).toLocaleString()}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <button
          onClick={() => handleNavigation("/p2p")}
          className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 flex flex-col items-center cursor-pointer" 
        >
          <span className="text-2xl mb-1">💸</span>
          <span className="text-sm">Send</span>
        </button>
        <button
          onClick={() => handleNavigation("/transfer")}
          className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 flex flex-col items-center cursor-pointer"
        >
          <span className="text-2xl mb-1">➕</span>
          <span className="text-sm">Add Money</span>
        </button>
        <button
          onClick={() => handleNavigation("/transactions")}
          className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 flex flex-col items-center cursor-pointer"
        >
          <span className="text-2xl mb-1">📋</span>
          <span className="text-sm">History</span>
        </button>
      </div>

      <Card title="Recent Transactions">
        {data.recentTransactions.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No recent transactions
          </div>
        ) : (
          <div className="space-y-4 pt-4">
            {data.recentTransactions.slice(0, 5).map((t) => (
              <div
                key={t.id}
                className="flex flex-col sm:flex-row sm:justify-between border-b pb-3  hover:bg-gray-50 p-2 rounded"
              >
                <div className="mb-2 sm:mb-0">
                  <div className="text-sm font-medium">
                    {t.status === "Success" ? "Received INR" : "Transaction"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {new Date(t.time).toLocaleString()}
                  </div>
                  <div className={`text-xs mt-1 ${
                    t.status === "Success" ? "text-green-500" :
                    t.status === "Failure" ? "text-red-500" : "text-yellow-500"
                  }`}>
                    {t.status}
                  </div>
                </div>
                <div className="text-right font-semibold text-base">
                  {t.status === "Success" ? "+" : "-"} ₹ {(t.amount / 100).toLocaleString()}
                  <div className="text-xs text-slate-600">{t.provider}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}