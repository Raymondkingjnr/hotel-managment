import { createBooking, updateHotelRoom } from "@/libs/apis";
import { NextResponse } from "next/server";
import Stripe from "stripe";

type Metadata = {
  adults: any;
  checkinDate: any;
  checkoutDate: any;
  children: any;
  hotelRoom: any;
  numberOfDays: any;
  user: any;
  totalPrice: any;
  discount: any;
  // Add other properties as needed
};

const checkoutSessionCompleted = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webHookeSecrete = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webHookeSecrete) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webHookeSecrete);
  } catch (error: any) {
    return new NextResponse(`webhook Error: ${error.message}`, { status: 500 });
  }

  // load event;

  // console.log(event);

  switch (event.type) {
    case checkoutSessionCompleted:
      const session = event.data.object;

      const {
        adults,
        checkinDate,
        checkoutDate,
        children,
        hotelRoom,
        numberOfDays,
        user,
        totalPrice,
        discount,
      }: Metadata = session.metadata as Metadata;
      await createBooking({
        adults: Number(adults),
        checkinDate,
        checkoutDate,
        children: Number(children),
        totalPrice: Number(totalPrice),
        hotelRoom,
        numberOfDays: Number(numberOfDays),
        discount: Number(discount),
        user,
      });

      await updateHotelRoom(hotelRoom);
      return NextResponse.json("Booking successfull", {
        status: 200,
        statusText: "Bookin successfull",
      });

    default:
      console.log(`unhandled event type ${event.type}`);
  }

  return NextResponse.json("Booking successfull", {
    status: 200,
    statusText: "Event Received",
  });
}
