"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(provider: string, amount: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        };
    }

    const token = (Math.random() * 1000).toString();

    const transaction = await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session.user.id),
            amount: amount * 100
        }
    });

    setTimeout(async () => {
        // 1. Update transaction to "Success"
        await prisma.onRampTransaction.update({
            where: { id: transaction.id },
            data: {
                status: "Success"
            }
        });

        // 2. Update user's balance
        const existingBalance = await prisma.balance.findFirst({
            where: {
                userId: Number(session.user.id)
            }
        });

        if (existingBalance) {
            await prisma.balance.update({
                where: {
                    id: existingBalance.id
                },
                data: {
                    amount: {
                        increment: amount * 100
                    }
                }
            });
        } else {
            await prisma.balance.create({
                data: {
                    userId: Number(session.user.id),
                    amount: amount * 100,
                    locked: 0
                }
            });
        }
    }, 3000); 

    return {
        message: "Transaction created and processing"
    };
}
