import { FaRegStar, FaStar } from "react-icons/fa";

const OrderReviewStar = ({ ratings, displayNumber, lg }) => {
  const starsArr = new Array(ratings).fill(1);
  while (starsArr.length < 5) {
    starsArr.push(0);
  }

  return (
    <div
      className="mt-3 mb-3 orderReviewStarsContainer"
      style={lg ? { fontSize: "3rem" } : {}}
    >
      {displayNumber ? <h4>{ratings}</h4> : null}

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

export default OrderReviewStar;
