import Card from "react-bootstrap/Card";
import OrderCardDetail from "/components/Order/orderCardDetail";
// import { useRouter } from "next/router";
import {
  MdOutlineReceiptLong,
  MdStarOutline,
  MdOutlineLocalShipping,
  MdSystemUpdateAlt,
  MdCardTravel,
} from "react-icons/md";

function ProgressDetail({ orderObj }) {
  // const router = useRouter();
  return (
    <div className="progressOrderDetail">
      <h5>Order detail</h5>
      <OrderCardDetail orderObj={orderObj} />
    </div>
  );
}

export default ProgressDetail;
