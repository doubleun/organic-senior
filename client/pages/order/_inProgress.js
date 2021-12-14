import OrderCard from "/components/Order/orderCard";

export default function InProgress({
  orders,
  currentUser,
  handleRespondOrder,
}) {
  return (
    <div className="inProgressTabContainer">
      {/* Order cards */}
      {orders.map((order, index) => (
        <OrderCard
          key={index}
          orderObj={order}
          incomingOrder={order.ownerEmail === currentUser.email}
          handleRespondOrder={handleRespondOrder}
        />
      ))}
    </div>
  );
}

InProgress.defaultProps = {
  orders: { Order: [] },
};
