// Component imports
import Layout from "../layout/_layout";
// import OrderCard from "/components/Order/orderCard";
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
  const [tabInProgress, setTabInProgress] = useState(true);
  userOrders = JSON.parse(userOrders);

  return (
    <main className="mainOrderPage">
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
            Finished
          </h5>
        </div>

        {/* Content */}
        <div className="inProgressTabContainer">
          {/* Order cards */}
          {tabInProgress ? (
            <InProgressPage orders={userOrders} currentUser={currentUser} />
          ) : (
            // TODO: Add finished orders
            <FinishedPage
              orders={userOrders.filter((order) => order.status === "Finished")}
            />
          )}
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
      NOT: {
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
