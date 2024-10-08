"use client";

import { getUserBookings } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import axios from "axios";
import { User } from "@/app/models/user";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { GiMoneyStack } from "react-icons/gi";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { useState } from "react";
import Table from "@/components/Table/Table";
import Chart from "@/components/Chart/Chart";
import RatingModal from "@/components/RatingModal/RatingModal";
import BackDrop from "@/components/BackDrop/BackDrop";
import toast from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";

const UserDetailes = (props: { params: { id: string } }) => {
  const {
    params: { id: userId },
  } = props;

  const [currentNav, setCurrentNav] = useState<
    "bookings" | "amount" | "ratings"
  >("bookings");

  const [roomId, setRoomId] = useState<string | null>(null);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [ratingText, setRatingText] = useState("");

  const tooggleRatingModal = () => setIsRatingVisible((prev) => !prev);

  const reviewSubmitHandler = async () => {
    if (!ratingText.trim().length || !ratingValue) {
      return toast.error("provide a rating text and a rating");
    }

    if (!roomId) {
      toast.error("Id mot provided");
    }

    setSubmittingReview(true);
    try {
      const { data } = await axios.post("/api/users", {
        roomId,
        ratingText,
        ratingValue,
      });
      console.log(data);
      toast.success("Review Submitted");
    } catch (error) {
      console.log(error);
      toast.error("Review Failed");
    } finally {
      setRatingText("");
      setRatingValue(null);
      setRoomId(null);
      setSubmittingReview(false);
      setIsRatingVisible(false);
      setSubmittingReview(false);
    }
  };

  const fetchUserBookings = async () => getUserBookings(userId);
  const fetchUserData = async () => {
    const { data } = await axios.get<User>("/api/users");
    return data;
  };

  const {
    data: userData,
    isLoading: loadinguserData,
    error: errorUser,
  } = useSWR("/api/users", fetchUserData);

  const {
    data: userBookings,
    error,
    isLoading,
  } = useSWR("/api/userbookings", fetchUserBookings);

  if (error || errorUser) throw new Error(error);
  if (typeof userBookings === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  if (!userBookings || !userData) return <LoadingSpinner />;
  // if (!userBookings) return <LoadingSpinner />;

  // if (!userData) throw new Error("Can not fetch user data");

  return (
    <div className="container mx-auto px-2 md:px-4 py-10">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="hidden md:block md:col-span-4 lg:col-span-3 shadow-lg h-fit sticky top-10 bg-[#eff0f2] text-black rounded-lg px-6 py-4">
          <div className="md:w-[143px] w-28 h-28 md:h-[143px] mx-auto mb-5 rounded-full overflow-hidden">
            {userData?.image ? (
              <Image
                src={userData?.image ?? ""}
                alt={userData?.name ?? ""}
                width={143}
                height={143}
                className="img scale-animation rounded-full"
              />
            ) : (
              ""
            )}
          </div>
          <div className="font-normal py-4 text-left">
            <h6 className="text-xl font-bold pb-3">About</h6>
            <p className="text-sm">{userData?.about ?? ""}</p>
          </div>
          <div className="font-normal text-left">
            <h6 className="text-xl font-bold pb-3">{userData?.name}</h6>
          </div>
          <button
            className="flex items-center text-white bg-red-500 rounded py-3 px-2 cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <p className="mr-2 font-medium">Sign Out</p>
            <FaSignOutAlt size={20} />
          </button>
        </div>

        <div className="md:col-span-8 lg:col-span-9">
          <div className="flex items-center">
            <h5 className="text-2xl font-bold mr-3">Hello, {userData?.name}</h5>
          </div>
          <div className="md:hidden w-14 my-5 h-14 rounded-l-full overflow-hidden">
            {userData?.image ? (
              <Image
                src={userData?.image ?? ""}
                alt={userData?.name ?? ""}
                width={143}
                height={143}
                className="img scale-animation rounded-full"
              />
            ) : (
              <FaRegUserCircle size={30} className=" mt-[20rem] text-black" />
            )}
          </div>
          <p className="block w-fit md:hidden text-sm py-2">
            {userData?.about ?? ""}
          </p>

          <p className="text-xs pb-2 font-medium">
            Joined In {userData?._createdAt.split("T")[0]}
          </p>
          <button
            className=" md:hidden flex items-center text-white bg-red-500 rounded py-3 px-2 cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <p className="mr-2 font-medium">Sign Out</p>
            <FaSignOutAlt size={20} />
          </button>

          <nav className="sticky top-0 px-2 w-full md:w-full md:px-5 py-3 mb-8 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mt-7">
            <ol
              className={`${
                currentNav === "bookings" ? "text-blue-600" : "text-gray-700"
              } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
            >
              <li
                onClick={() => setCurrentNav("bookings")}
                className="inline-flex items-center cursor-pointer"
              >
                <BsJournalBookmarkFill size={25} />
                <a className="inline-flex items-center mx-1 md:mx-3 text-sm md:text-sm font-medium">
                  Current Bookings
                </a>
              </li>
            </ol>
            <ol
              className={`${
                currentNav === "amount" ? "text-blue-600" : "text-gray-700"
              } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
            >
              <li
                onClick={() => setCurrentNav("amount")}
                className="inline-flex items-center cursor-pointer"
              >
                <GiMoneyStack size={25} />
                <a className="inline-flex items-center mx-1 md:mx-3 text-sm md:text-sm font-medium">
                  Amount Spent
                </a>
              </li>
            </ol>
          </nav>

          {currentNav === "bookings" ? (
            userBookings && (
              <Table
                bookingDetails={userBookings}
                setRoomId={setRoomId}
                toggleRatingModal={tooggleRatingModal}
              />
            )
          ) : (
            <></>
          )}

          {currentNav === "amount" ? (
            userBookings && <Chart userBookings={userBookings} />
          ) : (
            <></>
          )}
        </div>
      </div>

      <RatingModal
        isOpen={isRatingVisible}
        ratingValue={ratingValue}
        setRatingValue={setRatingValue}
        ratingText={ratingText}
        setRatingText={setRatingText}
        isSubmittingReview={submittingReview}
        reviewSubmitHandler={reviewSubmitHandler}
        toggleRatingModal={tooggleRatingModal}
      />
      <BackDrop isOpen={isRatingVisible} />
    </div>
  );
};

export default UserDetailes;
