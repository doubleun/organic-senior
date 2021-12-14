import OrderCard from "/components/Order/orderCard";

export default function InProgress({ orders, handleRespondOrder }) {
  return (
    <div className="inProgressTabContainer">
      {/* Order cards */}
      {orders.map((order, index) => (
        <OrderCard
          key={index}
          orderObj={order}
          incomingOrder
          handleRespondOrder={handleRespondOrder}
        />
      ))}
    </div>
  );
}

InProgress.defaultProps = {
  orders: { Order: [] },
};
