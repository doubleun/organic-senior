import OrderCard from "/components/Order/orderCard";

export default function InProgress({ orders, currentUser }) {
  return (
    <div className="inProgressTabContainer">
      {/* Order cards */}
      {orders.map((order, index) => (
        <OrderCard
          key={index}
          orderObj={order}
          newOrder={order.ownerEmail === currentUser.email}
        />
      ))}
    </div>
  );
}

InProgress.defaultProps = {
  orders: { Order: [] },
};
