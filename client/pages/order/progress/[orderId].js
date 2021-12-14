// Components imports
import Layout from "../../layout/_layout";
import ProgressStepperCard from "/components/Order/progressStepperCard";
import ProgressDetailCard from "../../../components/Order/progressDetailCard";
import AlertSnack from "/components/Global/alertSnack";
import ProgressTrackingModal from "../../../components/Order/progressTrackingModal";
import OrderReviewModal from "../../../components/Order/orderReviewModal";
import Comment from "/components/Product/comment";

// Nextjs imports
import { getSession } from "next-auth/react";

// React imports
import { useState } from "react";

// SQL Database
import prisma from "/prisma/client";

export default function OrderProgress({ orderInfo, currentUser }) {
  orderInfo = JSON.parse(orderInfo);
  const [alert, setAlert] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [orderUI, setOrderUI] = useState(orderInfo);
  const isOwner = orderInfo.ownerEmail === currentUser.email;
  // console.log(orderInfo);

  //* === Functions * === //
  // Handle update to the next progress
  async function handleUpdateProgress(trackID = "") {
    if (orderUI.progress === 1 && trackID === "") return;
    const newProgress = orderUI.progress + 1;
    const res = await fetch("http://localhost:3000/api/order/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: orderUI.progress === 1 ? "INIT_PROGRESS" : "UPDATE_PROGRESS",
        order_id: orderUI.id,
        new_progress: newProgress,
        track_id: trackID,
      }),
    });

    if (res.status === 200) {
      // Show success alert
      setAlert(true);
      setTimeout(() => setAlert(false), 6000);

      // Update UI
      setOrderUI((prev) => ({ ...prev, progress: newProgress }));
      if (orderUI.progress === 1)
        // Close modal
        setShowTrackingModal(false);
    }
  }

  // Handle rate order
  async function handleRateOrder(rating, comment) {
    const newProgress = orderUI.progress + 1;
    const res = await fetch("http://localhost:3000/api/order/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "RATE_PROGRESS",
        order_id: orderUI.id,
        new_progress: newProgress,
        rating,
        comment,
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      // Show success alert
      setAlert(true);
      setTimeout(() => setAlert(false), 6000);
      // Update UI
      setOrderUI((prev) => ({
        ...prev,
        progress: newProgress,
        Review: data.prismaRes.Review,
      }));
      // Close modal
      setShowReviewModal(false);
    }
  }

  //* === Main * === //
  return (
    <main className="orderProgressPage">
      <div
        className="orderProgressPage"
        id={showTrackingModal || showReviewModal ? "modal" : ""}
        onClick={() => {
          setShowTrackingModal(false);
          setShowReviewModal(false);
        }}
      ></div>
      {/* Show tracking modal */}
      {showTrackingModal ? (
        <ProgressTrackingModal
          setShowTrackingModal={setShowTrackingModal}
          handleUpdate={handleUpdateProgress}
        />
      ) : null}
      {/* Review Modal */}
      {showReviewModal ? (
        <OrderReviewModal
          setShowReviewModal={setShowReviewModal}
          handleRateOrder={handleRateOrder}
        />
      ) : null}
      {alert ? <AlertSnack setAlert={setAlert} /> : null}
      {/* Order progress (stepper) and order detail (card) section */}
      <section className="orderProgressSection container">
        {/* Content */}
        {/* Stepper card */}
        <ProgressStepperCard
          orderObj={orderUI}
          setShowTrackingModal={setShowTrackingModal}
          setShowReviewModal={setShowReviewModal}
          handleUpdateProgress={handleUpdateProgress}
          isOwner={isOwner}
        />

        {/* Order detail card */}
        <ProgressDetailCard orderObj={orderInfo} incomingOrder={isOwner} />
      </section>

      {/* Comment (review) section */}
      {orderUI.Review !== null ? (
        <section className="productDetailComment container">
          <h5 className="card-title">Review</h5>
          <div className="productDetailCommentCard card">
            <div className="card-body">
              {/* Comments */}
              <Comment review={orderUI.Review} user={orderUI.user} />
            </div>
          </div>
        </section>
      ) : null}
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
    props: { orderInfo: JSON.stringify(orderInfo), currentUser: user },
  };
}

OrderProgress.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
