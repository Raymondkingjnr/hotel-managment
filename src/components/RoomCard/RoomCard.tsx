import { FC } from "react";
import Image from "next/image";

import { Room } from "@/app/models/room";
import Link from "next/link";

type Props = {
  room: Room;
};

const RoomCard: FC<Props> = (props) => {
  const {
    room: { coverImage, name, price, type, description, slug, isBooked },
  } = props;

  return (
    <div className="rounded w-80 h-[450px] mb-10 mx-auto md:mx-0 overflow-hidden text-black">
      <div className="h-60 overflow-hidden">
        <Image
          src={coverImage.url}
          alt={name}
          width={250}
          height={250}
          className="img "
        />
      </div>

      <div className="p-4 bg-white">
        <div className="flex justify-between text-base font-semibold">
          <p>{name}</p>
          <p>$ {price}</p>
        </div>

        <p className="pt-2 font-medium text-sm">{type} Room</p>

        <p className="pt-3 pb-6 text-ellipsis overflow-hidden whitespace-nowrap w-[300px]">
          {description.slice(1, 80)}...
        </p>

        <Link
          href={`/rooms/${slug.current}`}
          className="bg-primary inline-block text-center w-full py-2 rounded text-white text-base font-semibold hover:-translate-y-2 hover:shadow-lg transition-all duration-500"
        >
          {isBooked ? "BOOKED" : "BOOK NOW"}
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
