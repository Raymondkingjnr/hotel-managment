"use client";

import { Booking } from "@/app/models/bookings";
import { Dispatch, SetStateAction, FC } from "react";
import { useRouter } from "next/navigation";

type Props = {
  bookingDetails: Booking[];
  setRoomId: Dispatch<SetStateAction<string | null>>;
  toggleRatingModal: () => void;
};

const Table: FC<Props> = ({ bookingDetails, setRoomId, toggleRatingModal }) => {
  const router = useRouter();
  return (
    <div className=" overflow-x-auto max-w-[355px] rounded-md mx-auto md:max-w-full shadow-md sm:rounded-md">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-xs">Room name</th>
            <th className="px-4 py-3 text-xs">Unit Price</th>
            <th className="px-4 py-3 text-xs">Price</th>
            <th className="px-4 py-3 text-xs">Discount</th>
            <th className="px-4 py-3 text-xs">No. Days Booked</th>
            <th className="px-4 py-3 text-xs">Days Left</th>
            <th className="px-4 py-3 text-xs"></th>
          </tr>{" "}
        </thead>
        <tbody>
          {bookingDetails.map((booking) => (
            <tr
              key={booking._id}
              className="bg-white border-b hover:bg-gray-50"
            >
              <th
                onClick={() =>
                  router.push(`/rooms/${booking.hotelRoom.slug.current}`)
                }
                className="px-6 underline text-blue-600 cursor-pointer py-4 font-medium whitespace-nowrap"
              >
                {booking.hotelRoom.name}
              </th>
              <td className="px-6 py-4">{booking.hotelRoom.price}</td>
              <td className="px-6 py-4">{booking.totalPrice}</td>
              <td className="px-6 py-4">{booking.discount}</td>
              <td className="px-6 py-4">{booking.numberOfDays}</td>
              <td className="px-6 py-4">0</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    setRoomId(booking.hotelRoom._id);
                    toggleRatingModal();
                  }}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Rate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
