import { Card } from "@repo/ui/card";

type TransactionStatus = "Success" | "Failure" | "Processing"; // More specific status type

interface Transaction {
    time: string;
    amount: number;
    status: TransactionStatus;
    provider: string;
    id?: string; // Optional unique identifier
}

export const OnRampTransactions = ({
    transactions
}: {
    transactions: Transaction[]
}) => {
    if (!transactions.length) {
        return (
            <Card title="Recent Transactions">
                <div className="text-center pb-8 pt-8">
                    No Recent transactions
                </div>
            </Card>
        );
    }

    return (
        <Card title="Recent Transactions">
            <div className="pt-2 space-y-4">
                {transactions.map((t, index) => (
                    <div 
                        key={t.id || `transaction-${index}`} // Use id if exists, otherwise fallback to index
                        className="flex justify-between border-b pb-2"
                    >
                        <div>
                            <div className="text-sm font-medium">
                                Received INR
                            </div>
                            <div className="text-slate-600 text-xs">
                                {t.time.toLocaleString()} {/* Better date formatting */}
                            </div>
                            <div className={`text-xs mt-1 ${
                                t.status === "Success" ? "text-green-500" : 
                                t.status === "Failure" ? "text-red-500" : "text-yellow-500"
                            }`}>
                                {t.status}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center font-medium">
                            + Rs {(t.amount / 100).toLocaleString()} {/* Better number formatting */}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}