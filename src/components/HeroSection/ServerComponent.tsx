import Image from "next/image";
import { room1, room2, room3 } from "@/asset";

export const heading1 = (
  <>
    <h3 className="mb-6 text-3xl font-bold">Explore our hotel</h3>
    <p className=" text-[#4a4a4a] text-base font-medium leading-6 dark:text-[#ffffffea] mb-12 max-w-lg">
      Experience an Exquisite Hotel Immersed in Rich History and Timeless
      Elegance.
    </p>
    <button className=" btn-primary">Get Started</button>
  </>
);

export const section2 = (
  <>
    <div className=" hidden md:grid gap-8 grid-cols-1">
      <div className=" rounded-md overflow-hidden h-52">
        <Image src={room1} alt="" width={300} height={300} className="img" />
      </div>
      <div className="grid grid-cols-2 gap-8 h-48">
        <div className="rounded-md overflow-hidden">
          <Image src={room2} alt="" width={300} height={300} className="img" />
        </div>
        <div className="rounded-md overflow-hidden">
          <Image src={room3} alt="" width={300} height={300} className="img" />
        </div>
      </div>
    </div>
  </>
);
