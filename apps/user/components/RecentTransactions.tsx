// components/RecentTransactions.tsx
'use client';

import { Card } from "@repo/ui/card";
import { useState, useEffect } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from '../app/lib/auth'
import prisma from "@repo/db/client";

interface Transaction {
  id: string;
  time: Date;
  amount: number;
  status: "Success" | "Failure" | "Processing";
  toUserId?: number;
  fromUserId?: number;
}

export function RecentTransactions({ type = "all" }: { type?: "p2p" | "all" }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/transactions?type=${type}`);
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError("Failed to load transactions");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [type]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No recent transactions found
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {transactions.slice(0, 5).map((txn) => (
        <div key={txn.id} className="py-4 px-2 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                txn.status === "Success" ? "bg-green-100 text-green-600" :
                txn.status === "Failure" ? "bg-red-100 text-red-600" :
                "bg-yellow-100 text-yellow-600"
              }`}>
                {txn.status === "Success" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : txn.status === "Failure" ? (
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
                <p className="font-medium text-gray-900">
                  {txn.toUserId ? "Sent to User" : "Received from User"}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(txn.time).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                txn.toUserId ? "text-red-600" : "text-green-600"
              }`}>
                {txn.toUserId ? "-" : "+"}₹{(txn.amount / 100).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 capitalize">{txn.status.toLowerCase()}</p>
            </div>
          </div>
        </div>
      ))}
      {transactions.length > 5 && (
        <div className="pt-2 text-center">
          <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
            View all transactions
          </button>
        </div>
      )}
    </div>
  );
}