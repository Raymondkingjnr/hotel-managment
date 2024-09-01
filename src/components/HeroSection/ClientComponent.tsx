"use client";
import { FC } from "react";
import CountUpNumber from "../CountUpNumber/CountUpNumber";
// import { section2 } from "./ServerComponent";

type Props = {
  heading1: React.ReactNode;
  section2: React.ReactNode;
};

const ClientComponent: FC<Props> = (props) => {
  const { heading1, section2 } = props;
  return (
    <div className=" flex justify-between gap-5 mt-2 md:mt-10 px-4 container mx-auto">
      <div className=" py-10 h-full">
        {heading1}
        <div className="flex justify-between mt-12">
          <div className=" flex gap-3 flex-col items-center justify-center">
            <p className=" font-medium">Basic Room</p>
            <CountUpNumber duration={3000} endValue={50} />
          </div>
          <div className=" flex gap-3 flex-col items-center justify-center">
            <p className=" font-medium">Luxury Room</p>
            <CountUpNumber duration={3000} endValue={45} />
          </div>
          <div className=" flex gap-3 flex-col items-center justify-center">
            <p className=" font-medium">Suite Room</p>
            <CountUpNumber duration={3000} endValue={90} />
          </div>
        </div>
      </div>
      {section2}
    </div>
  );
};

export default ClientComponent;
