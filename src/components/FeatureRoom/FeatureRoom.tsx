import { Room } from "@/app/models/room";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  featuredRoom: Room;
};

const FeatureRoom: FC<Props> = (props) => {
  const { featuredRoom } = props;

  return (
    <section className=" flex md:flex-row flex-col px-4 py-10 items-center gap-12 container mx-auto">
      <div className=" md:grid gap-6 grid-cols-1">
        <div className=" rounded-md overflow-hidden h-56 mb-4 md:mb-0">
          <Image
            src={featuredRoom.coverImage.url}
            alt={featuredRoom.name}
            width={300}
            height={300}
            className=" img"
          />
        </div>

        <div className=" grid grid-cols-2 gap-6 h-48">
          {featuredRoom?.images?.splice(1, 2).map((image) => (
            <div className=" rounded overflow-hidden" key={image._key}>
              <Image
                src={image.url}
                alt={image._key}
                width={300}
                height={300}
                className=" img"
              />
            </div>
          ))}
        </div>
      </div>

      <div className=" md:py-10 md:w-1/2 text-left">
        <h3 className=" font-heading mb-5">Featured Room</h3>
        <p className=" font-normal max-w-md">{featuredRoom.description}</p>
        <div className=" flex flex-col md:flex-row md:items-end justify-between mt-5">
          <div className=" flex mb-3 mb:mb-0">
            <div className=" flex gap-3 flex-col items-center justify-center mr-4">
              <p className=" text-xs lg:text-xl text-center">Start Price</p>
              <p className=" md:font-bold flex font-medium text-lg xl:text-2xl">
                $ {featuredRoom.price}
              </p>
            </div>
            <div className=" flex gap-3 flex-col items-center justify-center mr-4">
              <p className=" text-xs lg:text-xl text-center">Discount</p>
              <p className=" md:font-bold flex font-medium text-lg xl:text-2xl">
                $ {featuredRoom.discount}
              </p>
            </div>
          </div>
          <Link
            href={`/rooms/${featuredRoom.slug.current}`}
            className=" border h-fit text-center border-orange-300 text-orange-300 py-2 lg:py-3 mt-10 lg:px-7 rounded-md font-bold"
          >
            More Detailes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureRoom;
