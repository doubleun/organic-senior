// Component imports
import Layout from "/components/Layout";
// import OrderCard from "/components/Order/orderCard";
import AlertSnack from "/components/Global/alertSnack";
import InProgressPage from "/components/Order/pages/InProgress";
import FinishedPage from "/components/Order/pages/Finnished";
import UserInfoModal from "/components/Order/userInfoModal";

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
  const [showUserModal, setShowUserModal] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [alert, setAlert] = useState(false);
  // console.log(userOrders);

  //* === Functions === *//
  function showUserInfoModal(userInfo) {
    console.log(userInfo);
    setShowUserModal(true);
    setUserInfo(userInfo);
  }

  async function handleRespondOrder(orderId, status, progress) {
    let cancelReamarks;
    if (!status || !orderId) return;

    if (confirm(`This order will be "${status}"`)) {
      if (status === "Cancelled") {
        // If canclling an order, the prompt will shows up to ask for the reason
        cancelReamarks = prompt("กรุณาระบุสาเหตุการยอกเลิกออเดอร์นี้");
        // If no remark the function will return
        if (cancelReamarks === null || cancelReamarks === "") return;
      }

      const res = await fetch("http://localhost:3000/api/order/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "RES_ORDER",
          order_id: orderId,
          order_status: status,
          order_progress: progress,
          order_remark: cancelReamarks || null,
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
      {/* SignUp Modal */}
      <UserInfoModal
        showUserModal={showUserModal}
        setShowUserModal={setShowUserModal}
        userInfo={userInfo}
      />
      {/* Alert snack */}
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
            orders={ordersUI.filter(
              (order) =>
                order.status === "In Progress" || order.status === "New"
            )}
            currentUser={currentUser}
            handleRespondOrder={handleRespondOrder}
            showUserInfoModal={showUserInfoModal}
          />
        ) : (
          <FinishedPage
            orders={ordersUI.filter(
              (order) =>
                order.status === "Completed" || order.status === "Cancelled"
            )}
            currentUser={currentUser}
            showUserInfoModal={showUserInfoModal}
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
    orderBy: {
      id: "desc",
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
