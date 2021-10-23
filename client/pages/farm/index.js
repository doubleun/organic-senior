// Components imports
import Layout from "../layout/_layout";
import ItemCard from "./_itemCard";
import FarmImages from "./_farmImages";
import NewItmModal from "./modals/_newItmModal";

// Nextjs imports
import Image from "next/image";
import { getSession } from "next-auth/react";

// Bootstrap imports
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import { BsFillPencilFill } from "react-icons/bs";

// SQL Database
import prisma from "../../prisma/client";

import { useState } from "react";

export default function Farm({ userInfo, farmInfo, mockProducts }) {
  const [readMore, setReadMore] = useState(false);
  const [editFarmImages, setEditFarmImages] = useState(false);
  const [editFarmProducts, setEditFarmProducts] = useState(false);
  const [showNewItmModal, setShowNewItmModal] = useState(false);

  return (
    <main className="farmPageMain">
      {/* Modal */}
      <div
        className="farmPageMain"
        id={showNewItmModal ? "modal" : ""}
        onClick={() => setShowNewItmModal(false)}
      ></div>
      {showNewItmModal ? <NewItmModal /> : null}

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
                {mockProducts.map((itm, index) => (
                  <ItemCard
                    productName={itm.name}
                    productStock={itm.stock}
                    productPrice={itm.price}
                    productImage={itm.image}
                    key={index + itm.name}
                  />
                ))}
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

  await prisma.$disconnect();

  //* MOCK PRODUCTS *//

  const mockProducts = [
    {
      name: "Best orange",
      stock: 10,
      price: 20,
      image:
        "https://www.luluhypermarket.com/medias/1291292-01.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxMjM5OTh8aW1hZ2UvanBlZ3xpbWFnZXMvaDU0L2g4MS85MTQ4Mjc4MTEyMjg2LmpwZ3w0ODI2ZjY1NzU5NGU3ZGJiYTExMTM4NzNkODZlYjRjYTBmNzNkMTdkYmQ0ZjFiMTk0YjNlMDk3YjRkZTUxNjVh",
    },
    {
      name: "Strawberries",
      stock: 5,
      price: 35,
      image:
        "https://f.btwcdn.com/store-34660/product/c93a36a6-b39e-d836-da28-58ce291f6f59.jpg",
    },
    {
      name: "Grapes",
      stock: 32,
      price: 40,
      image:
        "https://pictures.attention-ngn.com//portal/30/402600/products/1572787745.8241_115_o.jpg",
    },
    {
      name: "Good onion",
      stock: 21,
      price: 25,
      image:
        "https://f.btwcdn.com/store-43065/product/e83b4a8a-b28d-62a3-45fd-6010eee9bf20.jpg",
    },
    {
      name: "Carrot",
      stock: 45,
      price: 15,
      image: "https://m.media-amazon.com/images/I/71S6oQqVa5L._SL1500_.jpg",
    },
    {
      name: "Apple",
      stock: 17,
      price: 22,
      image:
        "https://escapemaker.com/wp-content/uploads/2019/01/snapdragon.jpg",
    },
    {
      name: "Cellery",
      stock: 56,
      price: 12,
      image:
        "https://www.gardeningknowhow.com/wp-content/uploads/2021/06/fresh-celery.jpg",
    },
  ];

  return {
    props: {
      user,
      userInfo,
      farmInfo,
      mockProducts,
    },
  };
}

Farm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
