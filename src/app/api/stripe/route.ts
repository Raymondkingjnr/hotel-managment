import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { getRoom } from "@/libs/apis";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

type RequestData = {
  checkinDate: string;
  checkoutDate: string;
  adults: number;
  children: number;
  numberOfDays: number;
  hotelRoomSlug: string;
};

export async function POST(req: Request, res: Response) {
  const {
    checkinDate,
    checkoutDate,
    children,
    adults,
    hotelRoomSlug,
    numberOfDays,
  }: RequestData = await req.json();
  if (
    !checkinDate ||
    !checkoutDate ||
    !adults ||
    !hotelRoomSlug ||
    !numberOfDays
  ) {
    return new NextResponse("Please all fields are required", { status: 400 });
  }

  const origin = req.headers.get("origin");

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("authentication required", { status: 400 });
  }

  const userId = session.user.id;
  const formatedCheckoutDate = checkoutDate.split("T")[0];
  console.log(formatedCheckoutDate);

  const formatedCheckinDate = checkinDate.split("T")[0];
  console.log(formatedCheckinDate);

  try {
    const room = await getRoom(hotelRoomSlug);
    const discountPrice = room.price - (room.price / 100) * room.discount;
    const totalPrice = discountPrice + numberOfDays;

    //create a stripe payment

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: room.name,
              images: room.images.map((image) => image.url),
            },
            unit_amount: parseInt((totalPrice * 100).toString()),
          },
        },
      ],
      payment_method_types: ["card"],
      success_url: `${origin}/users/${userId}`,
      metadata: {
        adults,
        checkinDate: formatedCheckinDate,
        checkoutDate: formatedCheckoutDate,
        children,
        hotelRoom: room._id,
        numberOfDays,
        user: userId,
        totalPrice,
        discount: room.discount,
      },
    });

    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: "Payment session created",
    });
  } catch (error: any) {
    console.log("payment falied", error);

    return new NextResponse(error, { status: 500 });
  }
}
