import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth"; // Adjust the import path as needed

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (session && session.user) {
      return NextResponse.json({
        user: session.user,
      });
    }

    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
