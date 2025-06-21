'use client';

import { useEffect, useState } from "react";
import { Card } from "@repo/ui/card";

type TransactionStatus = "All" | "Success" | "Failure" | "Processing";

interface Transaction {
  id: string;
  time: string;
  amount: number;
  status: TransactionStatus;
  provider: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statusFilter, setStatusFilter] = useState<TransactionStatus>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filteredTxns = statusFilter === "All"
    ? transactions
    : transactions.filter((t) => t.status === statusFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-2 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-20">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#6a51a6]">
              Transaction History
            </h1>
            <p className="text-gray-500 mt-1">
              View all your financial transactions
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as TransactionStatus)}
                className="appearance-none cursor-pointer bg-white border border-gray-300 rounded-full py-2 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#6a51a6]"
              >
                {(["All", "Success", "Failure", "Processing"] as TransactionStatus[]).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <Card title="" className="border-0 shadow-sm rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#6a51a6] to-[#5a4196] p-4">
            <h2 className="text-lg font-semibold text-white">
              {statusFilter} Transactions
            </h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-4 border-[#6a51a6] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredTxns.length === 0 ? (
            <div className="text-center py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No transactions found
              </h3>
              <p className="mt-1 text-gray-500">
                {statusFilter === "All"
                  ? "You don't have any transactions yet"
                  : `No ${statusFilter.toLowerCase()} transactions`}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredTxns.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${
                      t.status === "Success" ? "bg-green-100 text-green-600" :
                      t.status === "Failure" ? "bg-red-100 text-red-600" :
                      "bg-yellow-100 text-yellow-600"
                    }`}>
                      {t.status === "Success" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : t.status === "Failure" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {t.provider} Transfer
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(t.time).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      t.status === "Success" ? "text-green-600" : "text-gray-900"
                    }`}>
                      + ₹{(t.amount / 100).toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {t.status.toLowerCase()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}