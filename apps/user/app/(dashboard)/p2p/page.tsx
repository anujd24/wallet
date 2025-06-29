// app/p2p/page.tsx
'use client';


import { SendCard } from "../../../components/SendCard";
import { RecentTransactions } from "../../../components/RecentTransactions";
import { Card } from "@repo/ui/card";

export default function P2PPage() {
  return (
    <div className="min-h-screen w-full bg-[#F4F6F8] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0d47a1] mb-8">
          Peer-to-Peer Transfer
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Send Card Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <SendCard />
          </div>
          
          {/* Recent Transactions Section */}
          <div className="space-y-6">
            
            
            {/* Help Section */}
            <div className="bg-blue-50 border border-blue-300 text-blue-800 rounded-lg p-4 mb-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">
                💡 How to Send Money
              </h3>
              <ul className="space-y-2 pl-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span>Enter recipient's phone number</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span>Enter amount to transfer</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span>Click Send and confirm transaction</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}