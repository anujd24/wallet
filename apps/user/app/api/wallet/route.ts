// app/api/wallet/route.ts
import { NextResponse } from 'next/server';
import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import { revalidateTag } from 'next/cache';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = Number(session.user.id);
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const [balance, income, expenses, recentTransactions] = await Promise.all([
      prisma.balance.findUnique({
        where: { userId },
        select: { amount: true, locked: true }
      }),
      prisma.onRampTransaction.aggregate({
        where: {
          userId,
          status: 'Success',
          startTime: { gte: firstDayOfMonth },
          amount: { gt: 0 }
        },
        _sum: { amount: true }
      }),
      prisma.onRampTransaction.aggregate({
        where: {
          userId,
          status: 'Success',
          startTime: { gte: firstDayOfMonth },
          amount: { lt: 0 }
        },
        _sum: { amount: true }
      }),
      prisma.onRampTransaction.findMany({
        where: { userId },
        orderBy: { startTime: 'desc' },
        take: 5,
        select: {
          id: true,
          startTime: true,
          amount: true,
          status: true,
          provider: true
        }
      })
    ]);

    // Revalidate cache
    revalidateTag('wallet');

    return NextResponse.json({
      balance: balance?.amount || 0,
      locked: balance?.locked || 0,
      income: income._sum.amount || 0,
      expenses: Math.abs(expenses._sum.amount || 0),
      recentTransactions: recentTransactions.map(t => ({
        id: t.id,
        time: t.startTime.toISOString(),
        amount: t.amount,
        status: t.status,
        provider: t.provider
      }))
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch wallet data' },
      { status: 500 }
    );
  }
}