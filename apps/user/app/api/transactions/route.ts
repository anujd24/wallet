import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json([], { status: 401 });
  }

  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session.user.id),
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return NextResponse.json(
    txns.map((t) => ({
      id: t.id,
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    }))
  );
}
