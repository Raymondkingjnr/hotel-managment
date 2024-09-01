import { FC } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

type Props = {
  rating: number;
};

const Rating: FC<Props> = ({ rating }) => {
  const fullStar = Math.floor(rating);
  const decimalPart = rating - fullStar;

  const fullStarElement = Array(fullStar).fill(<FaStar color="orange" />);

  let halfStarElement = null;

  if (decimalPart) {
    halfStarElement = <FaStarHalf color="orange" />;
  }

  return (
    <div className=" flex gap-2">
      {fullStarElement} {halfStarElement}
    </div>
  );
};

export default Rating;
