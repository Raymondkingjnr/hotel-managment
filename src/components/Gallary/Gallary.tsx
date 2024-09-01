import { gallary, gallary1, gallary2, gallary4, room2, room3 } from "@/asset";
import Image from "next/image";

const Gallery = () => {
  return (
    <div className="mx-auto container py-14 px-4 h-full">
      <div className="flex flex-wrap md:-m-2">
        <div className="flex w-1/2 flex-wrap">
          <div className="w-1/2 p-1 md:p-2 h-48 md:h-[300px]">
            <Image
              alt="gallery"
              className="img rounded-sm"
              src={gallary}
              width={200}
              height={200}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2 h-48 md:h-[300px]">
            <Image
              alt="gallery"
              className="img rounded-sm"
              src={gallary1}
              width={200}
              height={200}
            />
          </div>
          <div className="w-full p-1 md:p-2 h-48 md:h-[300px]">
            <Image
              alt="gallery"
              className="img  rounded-sm"
              src={gallary2}
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="flex w-1/2 flex-wrap">
          <div className="w-full p-1 md:p-2 h-48 md:h-[300px]">
            <Image
              alt="gallery"
              className="img rounded-sm"
              src={room3}
              width={200}
              height={200}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2 h-48 md:h-[300px]">
            <Image
              alt="gallery"
              className="img rounded-sm"
              src={room2}
              width={200}
              height={200}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2 h-48 md:h-[300px]">
            <Image
              alt="gallery"
              className="img rounded-sm"
              src={gallary4}
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
