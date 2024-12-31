import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

const StarRating = ({ rating, handleRatingChange }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
          className={`p-2 rounded-full transition duration-200 ease-in-out transform ${
            star <= rating
              ? "text-yellow-400 bg-black hover:bg-yellow-500 hover:text-black"
              : "text-gray-400 hover:text-yellow-400 hover:scale-110"
          }`}
          key={star}
          variant="outline"
          size="icon"
        >
          <StarIcon
            className={`w-6 h-6 ${
              star <= rating ? "fill-yellow-500" : "fill-black"
            }`}
          />
        </Button>
      ))}
    </div>
  );
};

export default StarRating;
