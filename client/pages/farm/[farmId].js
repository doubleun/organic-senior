// Components imports
import Layout from "../layout/_layout";
import ItemCard from "./_itemCard";
import FarmImages from "./_farmImages";
import ItemModal from "./modals/_itmModal";
import ReviewStars from "/components/Global/reviewStars";

// Nextjs imports
import { useRouter } from "next/router";
import Image from "next/image";
import { getSession } from "next-auth/react";

// Bootstrap imports
import Alert from "react-bootstrap/Alert";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import {
  BsFillPencilFill,
  BsCheck2Circle,
  BsX,
  BsPatchCheckFill,
} from "react-icons/bs";

// SQL Database
import prisma from "../../prisma/client";

import { useState, useRef } from "react";

export default function Farm({ farmInfo, farmProducts, farmOwner }) {
  const router = useRouter();
  const [readMore, setReadMore] = useState(false);
  const [editFarmImages, setEditFarmImages] = useState(false);
  const searchInput = useRef();
  // State for setting edit mode
  const [editFarmProducts, setEditFarmProducts] = useState(false);
  // State for showing item modal and a state for keeping product index to render in update modal
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  // State for showing alert message
  const [alertSuccess, setAlertSuccess] = useState(false);
  // State for keeping track of the products in the front-end
  const [farmProductsUI, setFarmProductsUI] = useState(farmProducts);

  // Handle search product
  function handleSearchProduct() {
    setFarmProductsUI(
      farmProducts.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchInput.current.value.toLowerCase())
      )
    );
  }

  return (
    <main className="farmPageMain">
      {/* Add new product modal */}
      <div
        className="farmPageMain"
        id={showItemModal ? "modal" : ""}
        onClick={() => setShowItemModal(false)}
      ></div>
      {showItemModal ? (
        <ItemModal
          farmId={farmInfo.id}
          selectedProductIndex={selectedProductIndex}
          setShowItemModal={setShowItemModal}
          setAlertSuccess={setAlertSuccess}
          farmProductsUI={farmProductsUI}
          setFarmProductsUI={setFarmProductsUI}
        />
      ) : null}

      {/* Farm details section */}
      <section className="farmDetails">
        {/* Hover farm images to edit */}
        <div
          onMouseEnter={() => {
            if (farmOwner) setEditFarmImages(true);
          }}
          onMouseLeave={() => setEditFarmImages(false)}
        >
          <FarmImages
            userInfo={farmInfo.user}
            farmInfo={farmInfo}
            editFarmImages={editFarmImages}
            setAlertSuccess={setAlertSuccess}
          />
        </div>
        <div className="container farmContainer">
          <div className="farmProfileRow">
            {/* Farm name and address */}
            <Image src={farmInfo.user.image} width="120px" height="120px" />
            <div className="flexProfile">
              <div>
                <h3>{farmInfo.name}</h3>
                <p>Organically made from hearts of local</p>
              </div>
              <div>
                <div className="badgesContainer mb-2">
                  <span className="badge bg-partner">
                    <BsPatchCheckFill />
                    <p>Partner</p>
                  </span>
                </div>
              </div>
              <div>
                <p>3,211 sales</p>
                <ReviewStars ratings={4} />
              </div>
            </div>

            <div className="farmLocation">
              <h5>Address</h5>
              <p className="text-secondary">Province: {farmInfo.province}</p>
              <p className="text-secondary">District: {farmInfo.district}</p>
              <p className="text-secondary">
                Sub-District: {farmInfo.subDistrict}
              </p>
              <p className="text-secondary">
                Postal-Code: {farmInfo.postalCode}
              </p>
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
              ref={searchInput}
              onChange={handleSearchProduct}
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
                {farmOwner ? (
                  <div>
                    {editFarmProducts ? (
                      <>
                        <div
                          className="farmEditItemsButton-done"
                          onClick={() => setEditFarmProducts(false)}
                          style={{
                            marginInlineStart: "2rem",
                            width: "5rem",
                            textAlign: "center",
                          }}
                        >
                          Done
                        </div>
                      </>
                    ) : (
                      <div
                        className="farmEditItemsButton"
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
                ) : null}
              </div>

              {/* Grid items(Products) */}
              <div className="farmItemsGrid">
                {/* Render all products */}
                {farmProductsUI.length !== 0
                  ? farmProductsUI.map((itm, index) => (
                      <div
                        onClick={(e) => {
                          if (editFarmProducts) {
                            setSelectedProductIndex(index);
                            setShowItemModal(true);
                            return;
                          } else {
                            router.push(`/product/${itm.id}`);
                          }
                        }}
                        key={itm.id}
                      >
                        <ItemCard
                          editFarmProducts={editFarmProducts}
                          productObj={itm}
                          setAlertSuccess={setAlertSuccess}
                          setFarmProductsUI={setFarmProductsUI}
                          key={itm.id}
                        />
                      </div>
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
                      setSelectedProductIndex(null);
                      setShowItemModal(true);
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

  // Get farm id from the params
  const { farmId } = context.query;

  // redirect if not logged in
  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  // Fetch farm info
  const farmInfo = await prisma.farmMain.findFirst({
    where: {
      id: parseInt(farmId),
    },
    // Fetch farm owner data
    include: {
      user: true,
    },
  });

  // Check if the current user is the farm owner or not
  const farmOwner = farmInfo.user.email === session.user.email;

  // no farm redirect
  if (!farmInfo)
    return {
      redirect: {
        destination: "/home/catalogue",
        permanent: false,
      },
    };

  // Fetch farm products
  const farmProducts = await prisma.product.findMany({
    where: {
      farm_id: farmInfo.id,
    },
    orderBy: {
      id: "asc",
    },
  });

  await prisma.$disconnect();

  // console.log(farmProducts);

  return {
    props: {
      user,
      farmInfo,
      farmProducts,
      farmOwner,
    },
  };
}

Farm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};