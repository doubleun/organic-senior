import OrderCard from "/components/Order/orderCard";

export default function InProgress({ orders }) {
  return (
    <div className="inProgressTabContainer">
      {/* Order cards */}
      {orders.map((order, index) => (
        <OrderCard key={index} orderObj={order} />
      ))}
    </div>
  );
}

InProgress.defaultProps = {
  orders: { Order: [] },
};
