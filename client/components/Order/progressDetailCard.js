// import Card from "react-bootstrap/Card";
import OrderCard from '/components/Order/orderCard'
// import { useRouter } from "next/router";
// import {
//   MdOutlineReceiptLong,
//   MdStarOutline,
//   MdOutlineLocalShipping,
//   MdSystemUpdateAlt,
//   MdCardTravel,
// } from "react-icons/md";

function ProgressDetail({
  orderObj,
  incomingOrder,
  showUserInfoModal,
  handleRespondOrder,
}) {
  // const router = useRouter();
  return (
    <div className="progressOrderDetail">
      <h5>Order detail</h5>
      <OrderCard
        orderObj={orderObj}
        incomingOrder={incomingOrder}
        showUserInfoModal={showUserInfoModal}
        handleRespondOrder={handleRespondOrder}
        directToProduct
      />
    </div>
  )
}

export default ProgressDetail
