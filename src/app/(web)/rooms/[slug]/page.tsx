"use client";

import { getRoom } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import HotelGallary from "@/components/HotelGallary/HotelGallary";
import { MdOutlineCleaningServices } from "react-icons/md";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GiSmokeBomb } from "react-icons/gi";
import BookRoomCTA from "@/components/BookRoomCTA/BookRoomCTA";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { getStripe } from "@/libs/stripe";
import RoomReview from "@/components/RoomReview/RoomReview";

const RoomDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;
  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [bookingIsLoading, setBookingIsLoading] = useState(false);
  const [NoOfchildren, setNoOfChildren] = useState(0);

  const fetchRoom = async () => getRoom(slug);

  const { data, error, isLoading } = useSWR("/api/room", fetchRoom);

  if (error) throw new Error(error);
  if (typeof data === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  if (!data) return <LoadingSpinner />;

  const calMinCheckoutDate = () => {
    if (checkinDate) {
      const nextDay = new Date(checkinDate);
      nextDay.setDate(nextDay.getDate() + 1);

      return nextDay;
    }
    return null;
  };

  const calcNoOfDays = () => {
    if (!checkinDate || !checkoutDate) return;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  const handleBookNow = async () => {
    if (!checkinDate || !checkoutDate)
      return toast.error("Please provide checkin / checkout date");

    if (checkinDate > checkoutDate)
      return toast.error("Please choose a valid checkin period");

    const numberOfDays = calcNoOfDays();

    const hotelRoomSlug = data.slug.current;
    const stripe = await getStripe();

    setBookingIsLoading(true);
    try {
      const { data: stripeSession } = await axios.post("/api/stripe", {
        checkinDate,
        checkoutDate,
        numberOfDays,
        adults,
        hotelRoomSlug,
        children: NoOfchildren,
      });
      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          toast.error("payment failed");
        }
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occured, check if you are logged in.");
    } finally {
      setBookingIsLoading(false);
    }
  };

  return (
    <div className=" container mx-auto px-4">
      <HotelGallary photos={data.images} />
      <div className=" mt-20">
        <div className=" lg:grid lg:grid-cols-12 gap-x-10 gap-y-16 px-2">
          <div className="lg:col-span-8 lg:w-full">
            <div>
              <h2 className="font-bold text-left text-lg">
                {data.name} ({data.dimension})
              </h2>
              <div className="flex my-11">
                {data.offeredAmenities.map((amenity) => (
                  <div
                    key={amenity._key}
                    className="md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center"
                  >
                    <i className={`fa-solid ${amenity.icon} md:text-lg`}></i>
                    <p className="text-xs md:text-base pt-3">
                      {amenity.amenity}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mb-11">
                <h2 className="font-bold text-lg mb-2">Description</h2>
                <p>{data.description}</p>
              </div>
              <div className="mb-11">
                <h2 className="font-bold text-lg mb-2">Offered Amenities</h2>
                <div className="grid grid-cols-2">
                  {data.offeredAmenities.map((amenity) => (
                    <div
                      key={amenity._key}
                      className="flex items-center md:my-0 my-1"
                    >
                      <i className={`fa-solid ${amenity.icon}`}></i>
                      <p className="text-xs md:text-base ml-2">
                        {amenity.amenity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-11">
                <h2 className="font-bold text-lg mb-2">Safety And Hygiene</h2>
                <div className="grid grid-cols-2">
                  <div className="flex items-center my-1 md:my-0">
                    <MdOutlineCleaningServices />
                    <p className="ml-2 md:text-base text-xs">Daily Cleaning</p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <LiaFireExtinguisherSolid />
                    <p className="ml-2 md:text-base text-xs">
                      Fire Extinguishers
                    </p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <AiOutlineMedicineBox />
                    <p className="ml-2 md:text-base text-xs">
                      Disinfections and Sterilizations
                    </p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <GiSmokeBomb />
                    <p className="ml-2 md:text-base text-xs">Smoke Detectors</p>
                  </div>
                </div>
              </div>

              <div className="shadow dark:shadow-white rounded-lg p-6">
                <div className="items-center mb-4">
                  <p className="md:text-lg font-semibold">Customer Reviews</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RoomReview roomId={data._id} />
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:col-span-4 mt-10 lg:mt-0 rounded-md shadow-md dark:shadow dark:shadow-white h-fit overflow-y-auto">
            <BookRoomCTA
              discount={data.discount}
              price={data.price}
              specialNote={data.specialNote}
              checkinDate={checkinDate}
              setCheckinDate={setCheckinDate}
              checkoutDate={checkoutDate}
              setCheckoutDate={setCheckoutDate}
              calcMinCheckoutDate={calMinCheckoutDate}
              adults={adults}
              noOfChildren={NoOfchildren}
              setAdults={setAdults}
              setNoOfChildren={setNoOfChildren}
              isBooked={data.isBooked}
              handleBookNowClick={handleBookNow}
              bookingIsLoading={bookingIsLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
