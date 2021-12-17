import OrderCard from "/components/Order/orderCard";

export default function InProgress({ orders, currentUser, showUserInfoModal }) {
  return (
    <div className="inProgressTabContainer">
      {/* Order cards */}
      {orders.map((order, index) => (
        <OrderCard
          key={index}
          orderObj={order}
          incomingOrder={order.ownerEmail === currentUser.email}
          showUserInfoModal={showUserInfoModal}
        />
      ))}
    </div>
  );
}

InProgress.defaultProps = {
  orders: { Order: [] },
};
