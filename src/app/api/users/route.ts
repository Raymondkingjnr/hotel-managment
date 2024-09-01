import {
  checkReviewExists,
  createReview,
  getUserData,
  updateReview,
} from "@/libs/apis";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Authentification Required", { status: 500 });
  }

  const userId = session.user.id;

  try {
    const data = await getUserData(userId);
    return NextResponse.json(data, { status: 200, statusText: "successfull" });
  } catch (error: any) {
    return new NextResponse("Unable to fetch", { status: 400 });
  }
}

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Authentification Required", { status: 500 });
  }

  const { roomId, ratingText, ratingValue } = await req.json();

  if (!roomId || !ratingText || !ratingValue) {
    return new NextResponse("All fields Required", { status: 400 });
  }

  const userId = session.user.id;
  try {
    const alreadyExists = await checkReviewExists(userId, roomId);
    console.log(alreadyExists);

    let data;

    if (alreadyExists) {
      data = await updateReview({
        reviewId: alreadyExists._id,
        ratingText,
        userRating: ratingValue,
      });
    } else {
      data = await createReview({
        hotelRoomId: roomId,
        ratingText,
        userId,
        userRating: ratingValue,
      });
    }

    return NextResponse.json(data, { status: 200, statusText: "successfull" });
  } catch (error: any) {
    console.log("Error Updating", error);
    return new NextResponse("unable to create review", { status: 400 });
  }
}
