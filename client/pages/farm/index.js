// Components imports
import Layout from "../layout/_layout";
import ItemCard from "./_itemCard";
import FarmImages from "./_farmImages";
import NewItmModal from "./modals/_newItmModal";

// Nextjs imports
import Image from "next/image";
import { getSession } from "next-auth/react";

// Bootstrap imports
import Alert from "react-bootstrap/Alert";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import { BsFillPencilFill, BsCheck2Circle, BsX } from "react-icons/bs";

// SQL Database
import prisma from "../../prisma/client";

import { useState } from "react";

export default function Farm({ userInfo, farmInfo, farmProducts }) {
  const [readMore, setReadMore] = useState(false);
  const [editFarmImages, setEditFarmImages] = useState(false);
  const [editFarmProducts, setEditFarmProducts] = useState(false);
  const [showNewItmModal, setShowNewItmModal] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [farmProductsUI, setFarmProductsUI] = useState(farmProducts);

  return (
    <main className="farmPageMain">
      {/* Add new product modal */}
      <div
        className="farmPageMain"
        id={showNewItmModal ? "modal" : ""}
        onClick={() => setShowNewItmModal(false)}
      ></div>
      {showNewItmModal ? (
        <NewItmModal
          setShowNewItmModal={setShowNewItmModal}
          setAlertSuccess={setAlertSuccess}
          setFarmProductsUI={setFarmProductsUI}
        />
      ) : null}

      {/* Farm details section */}
      <section className="farmDetails">
        {/* Hover farm images to edit */}
        <div
          onMouseEnter={() => setEditFarmImages(true)}
          onMouseLeave={() => setEditFarmImages(false)}
        >
          <FarmImages
            userInfo={userInfo}
            farmInfo={farmInfo}
            editFarmImages={editFarmImages}
            setAlertSuccess={setAlertSuccess}
          />
        </div>
        <div className="container farmContainer">
          <div className="farmProfileRow">
            {/* Farm name and address */}
            <Image src="/images/farmProfile.jpg" width="120px" height="120px" />
            <div className="flexProfile">
              <div>
                <h3>{farmInfo.name}</h3>
                <p>Organically made from hearts of local</p>
              </div>
              <p>3,211 sales</p>
            </div>

            <div className="farmLocation">
              <h5>Address</h5>
              <p>Province: {farmInfo.province}</p>
              <p>District: {farmInfo.district}</p>
              <p>Sub-District: {farmInfo.subDistrict}</p>
              <p>Postal-Code: {farmInfo.postalCode}</p>
            </div>
          </div>

          {/* About farm */}
          <div className="farmAboutRow">
            <div className="farmAboutAnnouncement">
              <h5>Announcement</h5>
              <p>Last updated on Sep 26, 2020</p>
            </div>
            <div className="farmAbout">
              <h5>About</h5>
              <p id={!readMore ? undefined : "more"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
                harum distinctio nobis, ut doloribus autem sed iure, corporis
                exercitationem rerum alias. Veritatis saepe inventore impedit
                alias tempora veniam deserunt voluptate! Lorem, ipsum dolor sit
                amet consectetur adipisicing elit. Ratione autem nostrum tempora
                accusantium maiores voluptas, harum impedit eum. Quod, ullam.
              </p>
              <a onClick={() => setReadMore(!readMore)}>
                {readMore ? "Read less" : "Read more"}
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Farm content section */}
      <section className="farmContent">
        <div className="container">
          {/* Top part of the content */}
          <div className="farmTopContent">
            <h5 style={{ flexGrow: 1 }}>Categories</h5>
            {/* Product search input */}
            <FormControl
              type="search"
              placeholder="Search"
              className="productSearchInput"
              aria-label="Search"
            />
          </div>

          {/* Items display */}
          <div className="farmBodyContent">
            {/* Categories (left-side) */}
            <div className="farmBodyContentCategories">
              <ListGroup as="ul">
                <ListGroup.Item as="li" active>
                  All
                </ListGroup.Item>
                <ListGroup.Item as="li">Vegetable</ListGroup.Item>
                <ListGroup.Item as="li">Fruits</ListGroup.Item>
                <ListGroup.Item as="li">Oranges</ListGroup.Item>
                <ListGroup.Item as="li">Strawberries</ListGroup.Item>
                <ListGroup.Item as="li">Grapes</ListGroup.Item>
                <ListGroup.Item as="li">Onions</ListGroup.Item>
                <ListGroup.Item as="li">Garlic</ListGroup.Item>
                <ListGroup.Item as="li">Lynchee</ListGroup.Item>
              </ListGroup>
            </div>
            {/* Items(Products) (right-side) */}
            <div className="farmBodyContentItems">
              {/* Edit items(Products) */}
              <div className="farmEditItemsMenu">
                <h4>All items</h4>
                {editFarmProducts ? (
                  <>
                    <div
                      className="farmEditItemsButton-gray"
                      onClick={() => setEditFarmProducts(false)}
                      style={{
                        width: "5rem",
                        textAlign: "center",
                      }}
                    >
                      Cancel
                    </div>
                    <div
                      className="farmEditItemsButton-green"
                      onClick={() => setEditFarmProducts(false)}
                      style={{
                        marginInlineStart: ".6rem",
                        width: "5rem",
                        textAlign: "center",
                      }}
                    >
                      Done
                    </div>
                  </>
                ) : (
                  <div
                    className="farmEditItemsButton-green"
                    id="edit"
                    onClick={() => setEditFarmProducts(true)}
                  >
                    <BsFillPencilFill
                      style={{ fontSize: "14px", marginInline: "6px" }}
                    />
                    Edit items
                  </div>
                )}
              </div>

              {/* Grid items(Products) */}
              <div className="farmItemsGrid">
                {/* Render all products */}
                {farmProductsUI.length !== 0
                  ? farmProductsUI.map((itm, index) => (
                      <ItemCard
                        editFarmProducts={editFarmProducts}
                        productName={itm.name}
                        productStock={itm.stockAmount}
                        productPrice={itm.price}
                        productImage={itm.productImages[0]}
                        key={index + itm.name}
                      />
                    ))
                  : null}
                <div
                  style={
                    editFarmProducts
                      ? { display: "unset" }
                      : { display: "none" }
                  }
                >
                  {/* Add new product */}
                  <div
                    onClick={(e) => {
                      setShowNewItmModal(true);
                      e.stopPropagation();
                    }}
                  >
                    <ItemCard addNewProduct />
                  </div>
                </div>
              </div>
            </div>
            {/* Items(Products) (right-side) */}
          </div>
        </div>
      </section>
      {/* Farm content section */}

      {/* Alert for image uplaoded */}
      {alertSuccess ? (
        <Alert variant="success" className="alertSubmiited">
          <BsCheck2Circle /> Update profile successfully!
          <BsX onClick={() => setAlertSuccess(false)} />
        </Alert>
      ) : null}
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const user = session?.user;

  // redirect
  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  // Fetch user info
  const userInfo = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });

  // Fetch farm info
  //TODO: Fetch farm accroding to id in the route params
  const farmInfo = await prisma.farmMain.findFirst({
    where: {
      user_id: userInfo.id,
    },
  });

  // no farm redirect
  if (!farmInfo)
    return {
      redirect: {
        destination: "/home/catalogue",
        permanent: false,
      },
    };

  //TODO: Check if the userInfo.id === farmInfo.user_id to see if the user is an admin or not, if they are allow them to edit the farm

  // Fetch farm products
  const farmProducts = await prisma.product.findMany({
    where: {
      farm_id: farmInfo.id,
    },
  });

  await prisma.$disconnect();

  // console.log(farmProducts);

  return {
    props: {
      user,
      userInfo,
      farmInfo,
      farmProducts,
    },
  };
}

Farm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
