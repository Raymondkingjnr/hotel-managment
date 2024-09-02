import { useRouter } from "next/navigation";
import React, { FC, ChangeEvent } from "react";

type Props = {
  roomTypeFilter: string;
  searchQuery: string;
  setRoomTypeFilter: (value: string) => void;
  setSearchQuery: (value: string) => void;
};

const Search: FC<Props> = ({
  roomTypeFilter,
  searchQuery,
  setRoomTypeFilter,
  setSearchQuery,
}) => {
  const router = useRouter();

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRoomTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRoomTypeFilter(event.target.value);
  };

  const handleFilterClick = () => {
    router.push(`/rooms?roomType=${roomTypeFilter}&searchQuery=${searchQuery}`);
  };

  return (
    <section className=" px-4 py-2 md:py-4 mx-5 rounded-md my-10 bg-orange-200">
      <div className="container mx-auto flex gap-4 flex-wrap justify-between items-center">
        <div className=" w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label className=" block text-base font-semibold mb-2 text-black">
            Room Type
          </label>
          <div className=" relative">
            <select
              onChange={handleRoomTypeChange}
              value={roomTypeFilter}
              className=" w-full px-2 capitalize h-[47px] rounded leading-tight dark:bg-black focus:outline-none"
            >
              <option value="All">All</option>
              <option value="Basic">Basic</option>
              <option value="Luxury">Luxury</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
        </div>

        <div className=" w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label className=" block text-base font-semibold mb-2 text-black">
            Search
          </label>
          <input
            type="search"
            placeholder="search room"
            id="search"
            className=" w-full px-4 h-[47px] rounded leading-6 dark:bg-black focus:outline-none placeholder:text-black dark:placeholder:text-white"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>
        <button className=" btn-primary" onClick={handleFilterClick}>
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
