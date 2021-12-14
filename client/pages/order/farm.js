// Component imports
import Layout from "../layout/_layout";
// import OrderCard from "/components/Order/orderCard";
import NewPage from "./_newPage";
import AlertSnack from "/components/Global/alertSnack";
import InProgressPage from "./_inProgress";
import FinishedPage from "./_finished";

// Nextjs imports
import { getSession } from "next-auth/react";

// React imports
import { useState } from "react";

// Bootstrap imports

// SQL Database
import prisma from "../../prisma/client";

export default function OrderFarm({ farmNewOrders }) {
  farmNewOrders = JSON.parse(farmNewOrders);
  const [farmNewOrdersUI, setfarmNewOrdersUI] = useState(farmNewOrders);
  const [alert, setAlert] = useState(false);

  //* === Functions === *//
  async function handleRespondOrder(orderId, status, progress) {
    if (!status || !orderId) return;

    if (confirm(`This order will be "${status}"`)) {
      const res = await fetch("http://localhost:3000/api/order/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "RES_ORDER",
          order_id: orderId,
          order_status: status,
          order_progress: progress,
        }),
      });

      if (res.status === 200) {
        // Show success alert
        setAlert(true);
        setTimeout(() => setAlert(false), 6000);

        // Update UI
        setfarmNewOrdersUI((prev) =>
          prev.filter((order) => order.id !== orderId)
        );
      }
      console.log(res);
    }
  }

  return (
    <main className="mainOrderPage">
      {alert ? <AlertSnack setAlert={setAlert} /> : null}
      <section className="container">
        {/* Tabs container flex */}
        <div className="orderPageTabFlex">
          <h5 className="tabSelected">New</h5>
        </div>

        {/* Content */}
        <div className="inProgressTabContainer">
          {/* Order cards */}
          <NewPage
            orders={farmNewOrdersUI}
            handleRespondOrder={handleRespondOrder}
          />
          {/* {tabInProgress === 1 ? (
            <NewPage orders={farmNewOrders} />
          ) : tabInProgress === 2 ? (
            <InProgressPage orders={farmNewOrders} />
          ) : (
            <FinishedPage />
          )} */}
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const user = session?.user;

  // redirect if not logged in
  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  // Fetch new orders coming into farm (exclude current user order)
  let farmNewOrders = await prisma.order.findMany({
    where: {
      ownerEmail: user.email,
      AND: {
        status: "New",
      },
    },
    include: {
      Review: true,
      user: true,
      product: {
        include: {
          farm: true,
        },
      },
    },
  });

  return { props: { farmNewOrders: JSON.stringify(farmNewOrders) } };
}

OrderFarm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
