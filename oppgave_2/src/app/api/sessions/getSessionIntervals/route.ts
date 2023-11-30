import { prisma } from "@/lib/prisma"
import { NextResponse, type NextRequest } from "next/server"

export const GET = async (request : NextRequest) => {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ status: 404, message: 'Missing sessionId parameter in the request.' });
  }

  try {
    const sessionIntervals = await prisma.sessionIntervals.findMany({
      where: { sessionId: sessionId },
      include: {
        interval: true,
      },
    });

    return NextResponse.json({ status: 200, message: JSON.stringify(sessionIntervals) });
  } catch (error) {
    console.error(error); 
    return NextResponse.json({ status: 500, message: 'Internal server error.' });
  }
}
