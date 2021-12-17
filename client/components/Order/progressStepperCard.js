import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ReviewStars from "/components/Global/reviewStars";
import Image from "next/image";
// import { useRouter } from "next/router";
import Link from "next/link";
import {
  MdOutlineReceiptLong,
  MdStarOutline,
  MdOutlineLocalShipping,
  MdSystemUpdateAlt,
  MdCardTravel,
} from "react-icons/md";

function ProgressStepper({
  orderObj,
  handleUpdateProgress,
  setShowTrackingModal,
  setShowReviewModal,
  isOwner,
}) {
  // * === Functions === * //
  function handleProceed() {
    if (isOwner) {
      console.log(isOwner);
      switch (orderObj.progress) {
        case 1:
          setShowTrackingModal(true);
          break;

        case 2:
          if (confirm("Confirm order shipped ?")) handleUpdateProgress();
          break;
      }
    } else {
      switch (orderObj.progress) {
        case 3:
          if (confirm("Confirm order received ?")) handleUpdateProgress();
          break;

        case 4:
          setShowReviewModal(true);
          break;
      }
    }
  }

  // * === Main === * //
  return (
    <Card className="progressStepperCard">
      <Card.Title>Order progress</Card.Title>
      <Card.Body>
        {/* OrderID, status and back button */}
        <div className="stepperOrderIdFlex">
          <Link href="/order/user">{"< BACK"}</Link>
          {/* OrderID and status container */}
          <div>
            <p>ORDER ID: {orderObj.id}</p>
            <p>{orderObj.status}</p>
          </div>
        </div>

        {/* Stepper */}
        <div className="stepperContainer">
          {/* Order placed */}
          <div>
            <div
              className={
                "progressCircle" + (orderObj.progress >= 1 ? "-finish" : "")
              }
            >
              <MdOutlineReceiptLong />
              <div></div>
            </div>
            <p>Order Placed</p>
            <p className="text-secondary">2021-10-14</p>
          </div>

          {/* Order ready to ship */}
          <div>
            <div
              className={
                "progressCircle" + (orderObj.progress >= 2 ? "-finish" : "")
              }
              style={
                orderObj.progress === 1 && isOwner ? { cursor: "pointer" } : {}
              }
              onClick={
                orderObj.progress === 1 && isOwner
                  ? () => setShowTrackingModal(true)
                  : () => null
              }
            >
              <MdCardTravel />
              <div></div>
            </div>
            <p>Order ready to ship</p>
            <p className="text-secondary">2021-10-14</p>
          </div>

          {/* Order shipped */}
          <div>
            <div
              className={
                "progressCircle" + (orderObj.progress >= 3 ? "-finish" : "")
              }
              style={
                orderObj.progress === 2 && isOwner ? { cursor: "pointer" } : {}
              }
              onClick={
                orderObj.progress === 2 && isOwner
                  ? () => {
                      if (confirm("Confirm order shipped ?"))
                        handleUpdateProgress();
                    }
                  : () => null
              }
            >
              <MdOutlineLocalShipping />
              <div></div>
            </div>
            <p>Order shipped</p>
            <p className="text-secondary">2021-10-14</p>
          </div>

          {/* Order received */}
          <div>
            <div
              className={
                "progressCircle" + (orderObj.progress >= 4 ? "-finish" : "")
              }
              style={
                orderObj.progress === 3 && !isOwner ? { cursor: "pointer" } : {}
              }
              onClick={
                orderObj.progress === 3 && !isOwner
                  ? () => {
                      if (confirm("Confirm order received ?"))
                        handleUpdateProgress();
                    }
                  : () => null
              }
            >
              <MdSystemUpdateAlt />
              <div></div>
            </div>
            <p>Order received</p>
            <p className="text-secondary">2021-10-14</p>
          </div>

          {/* Order rated */}
          <div>
            <div
              className={
                "progressCircle" + (orderObj.progress >= 5 ? "-finish" : "")
              }
              style={
                orderObj.progress === 4 && !isOwner ? { cursor: "pointer" } : {}
              }
              onClick={
                orderObj.progress === 4 && !isOwner
                  ? () => {
                      setShowReviewModal(true);
                    }
                  : () => null
              }
            >
              <MdStarOutline />
              <div></div>
            </div>
            <p>Order rated</p>
            <p className="text-secondary">2021-10-14</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="buttonsContainer">
          <p>Tracking ID: {orderObj.trackID}</p>
          <Button variant="success" onClick={handleProceed}>
            Proceed {">"}{" "}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProgressStepper;
