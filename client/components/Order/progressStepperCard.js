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

function ProgressStepper({ orderObj }) {
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
            <div className="progressCircle-finish">
              <MdOutlineReceiptLong />
              <div></div>
            </div>
            <p>Order Placed</p>
            <p className="text-secondary">2021-10-14</p>
          </div>

          {/* Order ready to ship */}
          <div>
            <div className="progressCircle">
              <MdCardTravel />
              <div></div>
            </div>
            <p>Order ready to ship</p>
            <p className="text-secondary">2021-10-14</p>
          </div>

          {/* Order shipped */}
          <div>
            <div className="progressCircle">
              <MdOutlineLocalShipping />
              <div></div>
            </div>
            <p>Order ready to ship</p>
            <p className="text-secondary">2021-10-14</p>
          </div>

          {/* Order received */}
          <div>
            <div className="progressCircle">
              <MdSystemUpdateAlt />
              <div></div>
            </div>
            <p>Order ready to ship</p>
            <p className="text-secondary">2021-10-14</p>
          </div>

          {/* Order rated */}
          <div>
            <div className="progressCircle">
              <MdStarOutline />
              <div></div>
            </div>
            <p>Order ready to ship</p>
            <p className="text-secondary">2021-10-14</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="buttonsContainer">
          <Button>Proceed {">"} </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProgressStepper;
