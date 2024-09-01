"use client";

import Link from "next/link";
import React from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <main className=" grid place-content-center px-5 py-24 sm:py-32 lg:px-8">
      <div className=" text-center">
        <p className=" text-base font-semibold  ">There was a problem</p>
        <h1 className=" mt-4 text-3xl font-bold tracking-tight  ">
          {error?.message ||
            "Something went wrong come back in few minutes time"}
        </h1>
        <div className=" mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={reset}
            className=" border border-gray-100 py-2 px-3 rounded-md"
          >
            Try Again
          </button>
          <Link
            href={"/"}
            className=" border border-gray-100 py-2 px-3 rounded-md"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Error;
