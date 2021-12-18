//React imports
import { useState, useMemo } from "react";
// import Layout from "../../components/Layout";
import Layout from "/components/Layout";
import CatalogueCarousel from "/components/Carousel/CatalogueCarousel";
// import FeaturedProductCard from "../../components/Catalogue/FeaturedProductCard";
import ItemCard from "/components/Farm/ItemCard";

// Bootstrap imports
import { BsList } from "react-icons/bs";
import { FaPhoneSquareAlt } from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import prisma from "/prisma/client";

export default function Catalogue({ listFeatured, user, featuredProducts }) {
  const [activeFeatured, setActiveFeatured] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productsUI, setProductsUI] = useState(featuredProducts);

  console.log(productsUI);

  // Filter product based on selected category
  const filteredProducts = useMemo(
    () =>
      selectedCategory === "All"
        ? productsUI
        : productsUI.filter((product) => product.category === selectedCategory),
    [productsUI, selectedCategory]
  );
  const router = useRouter();

  return (
    <main className="container">
      <section>
        <div className="catalogueTopContainer">
          <ListGroup
            defaultActiveKey="#link1"
            className="catalogueTopContainer-Left"
          >
            <ListGroup.Item as="li">
              <BsList />
              All departments
            </ListGroup.Item>
            <ListGroup.Item as="li" action>
              Fruits
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Vegetable
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Dairy
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Meat
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Nuts
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Grains
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Orange
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Salmon
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Onion
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Strawberry
            </ListGroup.Item>
          </ListGroup>

          <div className="catalogueTopContainer-Right">
            <div className="searchBar">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="What do you need?"
                  aria-label="Search for products"
                />
                <Button className="searchButton">SEARCH</Button>
                <FaPhoneSquareAlt />
                <div className="topBarContact">
                  <h5>+66 11.188.888</h5>
                  <p>support 24/7 time</p>
                </div>
              </InputGroup>
            </div>
            <CatalogueCarousel />
          </div>
        </div>
      </section>

      {/* Featured Product section */}
      <section className="featuredProductSection">
        {/* Catalogue Banner(s) */}
        <div className="catalogueBanners">
          <img src="/images/catalogueBanner-1.jpg" alt="" />
          <img src="/images/catalogueBanner-2.jpg" alt="" />
        </div>

        {/* Product cards container */}
        <div className="productCardsContainer">
          <div className="topSelectors">
            <h3>Featured Product</h3>
          </div>

          {/* Products listing */}
          <div>
            <ul className="productButtons">
              {listFeatured.map((itm, index) => {
                return (
                  <li
                    key={itm + index}
                    className={
                      activeFeatured === index ? "active-featured" : ""
                    }
                    onClick={(e) => {
                      setActiveFeatured(index);
                      setSelectedCategory(e.target.innerHTML);
                    }}
                  >
                    {itm}
                  </li>
                );
              })}
            </ul>

            {/* Product cards */}
            <Row className="productCardsGrid">
              {filteredProducts.map((product) => (
                <Col xs={12} lg={3} key={product.id}>
                  <div onClick={() => router.push(`/product/${product.id}`)}>
                    <ItemCard productObj={product} />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </section>
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

  // Get farm products
  const featuredProducts = await prisma.product.findMany({
    orderBy: {
      name: "asc",
    },
    take: 8,
  });

  const listFeatured = ["All", "Fruits", "Vegetables", "Meat", "Dairy"];

  return {
    props: { listFeatured, user, featuredProducts },
  };
}

Catalogue.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
