// Components imports
import Layout from "../../layout/_layout";
import ProgressStepperCard from "/components/Order/progressStepperCard";
import ProgressDetailCard from "../../../components/Order/progressDetailCard";

import { getSession } from "next-auth/react";

// SQL Database
import prisma from "/prisma/client";

export default function OrderProgress({ orderInfo }) {
  orderInfo = JSON.parse(orderInfo);
  console.log(orderInfo);
  return (
    <main className="orderProgressPage">
      <section className="orderProgressSection container">
        {/* Content */}
        {/* Stepper card */}
        <ProgressStepperCard orderObj={orderInfo} />

        {/* Order detail card */}
        <ProgressDetailCard orderObj={orderInfo} />
      </section>
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const user = session?.user;

  // Get order id from the params
  const { orderId } = context.query;

  // redirect if not logged in
  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  // Fetch order info
  const orderInfo = await prisma.order.findFirst({
    where: {
      id: parseInt(orderId),
    },
    // Fetch farm owner data
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

  return {
    props: { orderInfo: JSON.stringify(orderInfo) },
  };
}

OrderProgress.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
