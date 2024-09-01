"use client";

import Link from "next/link";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useSession } from "next-auth/react";

import ThemeContext from "@/context/themeContext";
import Image from "next/image";
import { logo } from "@/asset";

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  const { data: session } = useSession();

  return (
    <header className="py-5 px-4 container mx-auto text-xl flex gap-3 flex-wrap md:flex-nowrap items-center justify-between">
      <div className="flex items-center w-full">
        <Link href="/" className="font-black flex items-center gap-2 text-sm">
          <Image src={logo} alt="" width={40} height={40} />
          FABS PALACE
        </Link>
        <ul className="flex items-center ml-5">
          <li className="flex items-center">
            {session?.user ? (
              <Link href={`/users/${session.user.id}`}>
                {session.user.image ? (
                  <div className=" w-5 h-5 rounded-full overflow-hidden">
                    <Image
                      src={session?.user?.image}
                      alt={session.user.name!}
                      width={20}
                      height={20}
                      className="scale-animation img"
                    />
                  </div>
                ) : (
                  <FaUserCircle className="cursor-pointer" />
                )}
              </Link>
            ) : (
              <Link href="/auth">
                <FaUserCircle className="cursor-pointer" />
              </Link>
            )}
          </li>

          <li className="ml-2">
            {darkTheme ? (
              <MdOutlineLightMode
                className="cursor-pointer"
                onClick={() => {
                  setDarkTheme(false);
                  localStorage.removeItem("hotel-theme");
                }}
              />
            ) : (
              <MdDarkMode
                className="cursor-pointer"
                onClick={() => {
                  setDarkTheme(true);
                  localStorage.setItem("hotel-theme", "true");
                }}
              />
            )}
          </li>
        </ul>
      </div>

      <ul className="flex items-center justify-between w-full md:w-1/3 mt-1">
        <li className="hover:-translate-y-2 tracking-wider duration-500 text-sm font-semibold transition-all">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:-translate-y-2 tracking-wider duration-500 text-sm font-semibold transition-all">
          <Link href="/rooms">Rooms</Link>
        </li>
        <li className="hover:-translate-y-2 tracking-wider duration-500 text-sm font-semibold transition-all">
          <Link href="/">Contact</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
