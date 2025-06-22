import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

async function getBalance(userId: number) {
  const balance = await prisma.balance.findFirst({
    where: {
      userId
    }
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0
  };
}

async function getOnRampTransactions(userId: number) {
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId
    }
  });

  return txns.map(t => ({
    time: t.startTime.toISOString(),
    amount: t.amount,
    status: t.status,
    provider: t.provider
  }));
}

export default async function Page() {
  const session = await getServerSession(authOptions);

  // 👇 Ensure user is logged in
  if (!session?.user?.id) {
    redirect("/");
  }

  const userId = Number(session.user.id);

  const balance = await getBalance(userId);
  const transactions = await getOnRampTransactions(userId);

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#0d47a1] pt-8 mb-4 font-bold">
        Transfer
      </div>

      {/* ✅ Instructional Section */}
      <div className="w-[1000px] bg-blue-50 border border-blue-300 text-blue-800 rounded-lg p-4 mb-6 ml-4 mt-6 shadow-sm">
        <p className="font-semibold mb-1">ℹ️ How to Add Money:</p>
        <ul className="list-disc list-inside text-sm space-y-2 pl-4">
          <li>Enter the amount you want to add.</li>
          <li>Choose your bank and click <strong>Add Money</strong>.</li>
          <li>You will be redirected to your banking page.</li>
          <li>Click the browser’s <strong>back arrow</strong> to return here.</li>
          <li>Wait <strong>5 seconds</strong>, then <strong>refresh the page</strong>.</li>
          <li>You will see your updated balance and transaction status.</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
