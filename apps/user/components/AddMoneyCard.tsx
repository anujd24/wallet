"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/CreateOnRampTransactions";

const SUPPORTED_BANKS = [
  {
    id: "hdfc",
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
  }, 
  {
    id: "axis",
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
  }
];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [amount, setAmount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddMoney = async () => {
        if (amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        setIsSubmitting(true);
        try {
            await createOnRampTransaction(provider, amount);
            window.location.href = redirectUrl || "";
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card title="Add Money">
            <div className="w-full">
                <TextInput 
                    label="Amount" 
                    placeholder="Amount" 
                    type="number"
                    onChange={(val) => setAmount(Number(val))} 
                />
                <div className="py-4 text-left">Bank</div>
                <Select 
                    onSelect={(value) => {
                        const selectedBank = SUPPORTED_BANKS.find(x => x.name === value);
                        setRedirectUrl(selectedBank?.redirectUrl || "");
                        setProvider(selectedBank?.name || "");
                    }} 
                    options={SUPPORTED_BANKS.map(bank => ({
                        key: bank.id, // Now using string ID
                        value: bank.name
                    }))} 
                />
                <div className="flex justify-center pt-4">
                    <Button 
                        onClick={handleAddMoney}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : "Add Money"}
                    </Button>
                </div>
            </div>
        </Card>
    );
};