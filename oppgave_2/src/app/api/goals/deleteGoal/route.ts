import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";


export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const goalId = searchParams.get("goalId");

  if (!goalId) {
    return NextResponse.json({ status: 404, message: "Missing goalId parameter in the request."});
  }

  try {
    await prisma.goals.delete({
      where: {
        id: goalId
      }
    });

    console.log(`Goal deleted successfully.`);
    return NextResponse.json({ status: 200, message: `Goal deleted successfully.` });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: `Internal server error.` });
  }
};

