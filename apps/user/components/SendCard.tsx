// components/SendCard.tsx
'use client';

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { useRouter } from "next/navigation";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSend = async () => {
    if (!number || !amount) {
      setError("Please fill all fields");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      await p2pTransfer(number, Number(amount) * 100);
      router.refresh();
      // Show success state
    } catch (err) {
      setError("Transfer failed. Please try again.");
      console.error("P2P transfer error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <Card title="Send Money" className="border-0 shadow-none p-4">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              Recipient's Number
            </label>
            <TextInput
              placeholder="Enter phone number"
              value={number}
              onChange={(value) => setNumber(value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a51a6] focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              Amount (₹)
            </label>
            <TextInput
              placeholder="Enter amount"
              value={amount}
              onChange={(value) => setAmount(value)}
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 " 
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm py-2 px-3 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
          
          <Button
            onClick={handleSend}
            disabled={loading || !number || !amount}
            className={`w-full py-3 rounded-lg text-white font-medium ${
              loading || !number || !amount
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#6a51a6] hover:bg-[#5a4196] transition-colors'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Send Money'
            )}
          </Button>
        </div>
      </Card>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p className="text-md">Transactions are secured with bank-level encryption</p>
      </div>
    </div>
  );
}