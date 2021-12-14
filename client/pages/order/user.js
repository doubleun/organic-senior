// Component imports
import Layout from "../layout/_layout";
// import OrderCard from "/components/Order/orderCard";
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

export default function OrderUser({ userOrders, currentUser }) {
  userOrders = JSON.parse(userOrders);
  const [tabInProgress, setTabInProgress] = useState(true);
  const [ordersUI, setOrdersUI] = useState(userOrders);
  const [alert, setAlert] = useState(false);
  console.log(userOrders);

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
        setOrdersUI((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status } : order
          )
        );
      }
      // console.log(res);
    }
  }

  //* === Main === *//
  return (
    <main className="mainOrderPage">
      {alert ? <AlertSnack setAlert={setAlert} /> : null}
      <section className="container">
        {/* Tabs container flex */}
        <div className="orderPageTabFlex">
          <h5
            className={tabInProgress ? "tabSelected" : ""}
            onClick={() => setTabInProgress(true)}
          >
            In progress
          </h5>
          <h5
            className={tabInProgress ? "" : "tabSelected"}
            onClick={() => setTabInProgress(false)}
          >
            Completed
          </h5>
        </div>

        {/* Content */}
        {/* Order cards */}
        {tabInProgress ? (
          <InProgressPage
            orders={ordersUI.filter((order) => order.status === "In Progress")}
            currentUser={currentUser}
            handleRespondOrder={handleRespondOrder}
          />
        ) : (
          // TODO: Add finished orders
          <FinishedPage
            orders={ordersUI.filter((order) => order.status !== "In Progress")}
          />
        )}
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

  // Fetch orders of the current user
  let userOrders = await prisma.order.findMany({
    where: {
      OR: [
        {
          //! Typo!!!
          cutomerEmail: user.email,
        },
        {
          ownerEmail: user.email,
        },
      ],
      // NOT: {
      //   status: "Cancelled",
      // },
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
  // console.log(userOrders);
  // let userOrders = await prisma.user.findFirst({
  //   where: {
  //     email: user.email,
  //   },
  //   include: {
  //     Order: {
  //       include: {
  //         Review: true,
  //         product: {
  //           include: {
  //             farm: true,
  //           },
  //         },
  //       },
  //       where: {
  //         NOT: {
  //           status: "New",
  //         },
  //       },
  //     },
  //   },
  // });

  return {
    props: { userOrders: JSON.stringify(userOrders), currentUser: user },
  };
}

OrderUser.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
