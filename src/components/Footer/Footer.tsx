import Link from "next/link";
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="mt-16 pb-1">
      <div className="container mx-auto px-4">
        <Link href="/" className="font-black text-tertiary-dark">
          Hotelzz
        </Link>

        <h4 className="font-semibold text-[12px] py-2">Contact</h4>

        <div className="flex flex-wrap gap-12 items-center justify-between">
          <div className="flex-1">
            <p>123 Road</p>
            <div className="flex items-center py-4">
              <BsFillSendFill />
              <p className="ml-2 font-semibold tracking-wider text-xs">
                codewithlari
              </p>
            </div>
            <div className="flex items-center">
              <BsTelephoneOutbound />
              <p className="ml-2 font-semibold tracking-wider text-xs">
                000-000-00
              </p>
            </div>
            <div className="flex items-center pt-4">
              <BiMessageDetail />
              <p className="ml-2 font-semibold tracking-wider text-xs">
                codewithlari
              </p>
            </div>
          </div>

          <div className="md:text-right flex flex-col gap-[10px]">
            <p className="pb-4 tracking-wider font-semibold text-xs">
              Our Story
            </p>
            <p className="pb-4 tracking-wider font-semibold text-xs">
              Get in Touch
            </p>
            <p className="pb-4 tracking-wider font-semibold text-xs">
              Our Privacy Commitment
            </p>
            <p className="pb-4 tracking-wider font-semibold text-xs">
              Terms of service
            </p>
            <p className="pb-4 tracking-wider font-semibold text-xs">
              Customer Assistance
            </p>
          </div>

          <div className="flex-1 md:text-right">
            <p className="pb-4 tracking-wider font-semibold text-xs">
              Dining Experience
            </p>
            <p className="pb-4 tracking-wider font-semibold text-xs">
              Wellness
            </p>
            <p className="pb-4 tracking-wider font-semibold text-xs">Fitness</p>
            <p className="pb-4 tracking-wider font-semibold text-xs">Sports</p>
            <p className="pb-4 tracking-wider font-semibold text-xs">Events</p>
          </div>
        </div>
      </div>

      {/* <div className="bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0" /> */}
    </footer>
  );
};

export default Footer;
