import { useState } from "react";
import "./StarRating.css"

export default function StarRating({
  rating, setRating,
}) {

  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      <button onClick={() => { setRating(0); setHover(0) }} className="star-deselect">deselect</button>
      <div className="stars">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
