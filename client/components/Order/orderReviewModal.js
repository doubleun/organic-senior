import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import OrderReviewStar from "/components/Global/orderReviewStars";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useState, useMemo, useRef } from "react";

function orderReviewModal({ setShowReviewModal, handleRateOrder }) {
  const [rating, setRating] = useState(1);
  // I use a fullname key here becuase when the request is sent
  // I can just loop through the object and push in all true value keys
  const [selectedPills, setSelectedPills] = useState({
    ["Excellent Value"]: false,
    ["Excellent Delivery Speed"]: false,
    ["Excellent Seller Service Quality"]: false,
  });
  const comment = useRef();

  // Calculate ratings
  const finalArr = useMemo(() => {
    const pos = 5 - rating;
    return new Array(5).fill(1).fill(0, rating, pos + rating);
  });

  return (
    <div className="progressTrackingModal">
      <h3>ให้คะแนนรายการสั่ง</h3>
      {/* Review stars */}
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

      {/* Review comment */}
      <Form>
        <Form.Label>อธิบายประสบการของคุณ</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Comment"
          style={{ height: "100px" }}
          ref={comment}
        />
      </Form>

      {/* Review pills */}
      <div className="orderReviewPillsContainer">
        <span
          className={
            "badge rounded-pill " +
            (selectedPills["Excellent Value"] ? "bg-success" : "bg-secondary")
          }
          // Toggle pill on and off
          onClick={() =>
            setSelectedPills((prev) => ({
              ...prev,
              ["Excellent Value"]: !prev["Excellent Value"],
            }))
          }
        >
          Excellent Value
        </span>
        <span
          className={
            "badge rounded-pill " +
            (selectedPills["Excellent Delivery Speed"]
              ? "bg-success"
              : "bg-secondary")
          }
          // Toggle pill on and off
          onClick={() =>
            setSelectedPills((prev) => ({
              ...prev,
              ["Excellent Delivery Speed"]: !prev["Excellent Delivery Speed"],
            }))
          }
        >
          Excellent Delivery Speed
        </span>
        <span
          className={
            "badge rounded-pill " +
            (selectedPills["Excellent Seller Service Quality"]
              ? "bg-success"
              : "bg-secondary")
          }
          // Toggle pill on and off
          onClick={() =>
            setSelectedPills((prev) => ({
              ...prev,
              ["Excellent Seller Service Quality"]:
                !prev["Excellent Seller Service Quality"],
            }))
          }
        >
          Excellent Seller Service Quality
        </span>
      </div>

      {/* Buttons */}
      <div className="mt-3 progressTrackingModalBtn">
        <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={() =>
            handleRateOrder(
              rating,
              comment.current.value,
              Object.keys(selectedPills).filter((k) => selectedPills[k])
            )
          }
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
