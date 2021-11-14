import { FaRegStar, FaStar } from "react-icons/fa";

const reviewStars = ({ ratings, displayNumber, lg }) => {
  const starsArr = new Array(ratings).fill(1);
  while (starsArr.length < 5) {
    starsArr.push(0);
  }

  return (
    <div
      className="reviewStarsContainer"
      style={lg ? { fontSize: "1.4rem" } : {}}
    >
      {displayNumber ? (
        <h5 style={lg ? { fontSize: "1.6rem" } : {}}>{ratings}</h5>
      ) : null}

      {starsArr.map((star) => {
        if (star === 1) {
          return <FaStar />;
        } else {
          return <FaRegStar />;
        }
      })}
    </div>
  );
};

export default reviewStars;
