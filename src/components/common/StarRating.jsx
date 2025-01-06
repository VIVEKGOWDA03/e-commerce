import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

const StarRating = ({ rating, handleRatingChange }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
          className={`p-2 rounded-full   border-[1px] transition duration-200 ease-in-out transform ${
            star <= rating
              ? "text-yellow-400  bg-black hover:bg-yellow-500 hover:text-black"
              : "text-gray-400 hover:text-yellow-400 hover:scale-110"
          }`}
          key={star}
        >
          <StarIcon
            className={`w-3 h-3  ${
              star <= rating ? "fill-yellow-500" : "fill-black border-black"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
