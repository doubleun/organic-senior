import { FaRegStar, FaStar } from "react-icons/fa";

const reviewStars = ({ ratings, displayNumber, lg, notRated }) => {
  if (notRated) ratings = 0;
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
        <h5 style={lg ? { fontSize: "1.6rem" } : {}}>
          {notRated ? "Not Rated" : ratings}
        </h5>
      ) : null}

      {starsArr.map((star, index) => {
        if (star === 1) {
          return <FaStar key={index} />;
        } else {
          return <FaRegStar key={index} />;
        }
      })}
    </div>
  );
};

export default reviewStars;
