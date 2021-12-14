import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import OrderReviewStar from "/components/Global/orderReviewStars";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useState, useMemo, useRef } from "react";

function orderReviewModal({ setShowReviewModal, handleRateOrder }) {
  const [rating, setRating] = useState(1);
  const comment = useRef();
  // const starsArr = new Array(ratings).fill(1);

  // Calculate ratings
  const finalArr = useMemo(() => {
    const pos = 5 - rating;
    return new Array(5).fill(1).fill(0, rating, pos + rating);
  });

  return (
    <div className="progressTrackingModal">
      <h3>ให้คะแนนรายการสั่ง</h3>
      {/* Stars */}
      <div
        className="mt-3 mb-3 orderReviewStarsContainer"
        style={{ fontSize: "3.2rem" }}
      >
        {finalArr.map((star, index) => {
          if (star === 1) {
            return (
              <FaStar key={index} onMouseOver={() => setRating(index + 1)} />
            );
          } else {
            return (
              <FaRegStar key={index} onMouseOver={() => setRating(index + 1)} />
            );
          }
        })}
      </div>

      <Form>
        <Form.Label>อธิบายประสบการของคุณ</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Comment"
          style={{ height: "100px" }}
          ref={comment}
        />
      </Form>

      {/* Buttons */}
      <div className="mt-3 progressTrackingModalBtn">
        <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={() => handleRateOrder(rating, comment.current.value)}
        >
          Confirm
        </Button>
      </div>
      {/* <Form>
        <Form.Group className="mt-3" controlId="addProductName">
          <Form.Control type="text" placeholder="กรอกรหัส" required />
        </Form.Group>
      </Form> */}
    </div>
  );
}

export default orderReviewModal;
