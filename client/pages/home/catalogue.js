//React imports
import { useState } from "react";
// import Layout from "../../components/Layout";
import Layout from "../layout/_layout";
import CatalogueCarousel from "../../components/Carousel/CatalogueCarousel";
import FeaturedProductCard from "../../components/Catalogue/FeaturedProductCard";

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

export default function Catalogue({ products, listFeatured, user }) {
  const [activeFeatured, setActiveFeatured] = useState(0);

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
            <ListGroup.Item as="li" action href="">
              Fresh Meat
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Vegetable
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Fruits & Nut Gifts
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Ocean Foods
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Butter & Eggs
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Fastfood
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Fresh Onion
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Papaya & Crisps
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Oatmeal
            </ListGroup.Item>
            <ListGroup.Item as="li" action href="">
              Fresh Bananas
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
                    onClick={() => {
                      setActiveFeatured(index);
                    }}
                  >
                    {itm}
                  </li>
                );
              })}
            </ul>

            {/* Product cards */}
            <Row className="productCardsGrid">
              {products.map((product) => (
                <Col xs={12} lg={3} key={product.id}>
                  <FeaturedProductCard product={product} />
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

  console.log(user);

  const listFeatured = ["All", "Oranges", "Melons", "Berries", "Vegetables"];
  const products = [
    {
      id: 1,
      name: "Crab Pool Security",
      category: "Oranges",
      image: "https://technext.github.io/ogani/img/featured/feature-1.jpg",
    },
    {
      id: 2,
      name: "Crab Pool Security",
      category: "Melons",
      image: "https://technext.github.io/ogani/img/featured/feature-2.jpg",
    },
    {
      id: 3,
      name: "Crab Pool Security",
      category: "Berries",
      image: "https://technext.github.io/ogani/img/featured/feature-3.jpg",
    },
    {
      id: 4,
      name: "Crab Pool Security",
      category: "Oranges",
      image: "https://technext.github.io/ogani/img/featured/feature-4.jpg",
    },
    {
      id: 5,
      name: "Crab Pool Security",
      category: "Berries",
      image: "https://technext.github.io/ogani/img/featured/feature-5.jpg",
    },
    {
      id: 6,
      name: "Crab Pool Security",
      category: "Vegetables",
      image: "https://technext.github.io/ogani/img/featured/feature-5.jpg",
    },
    {
      id: 7,
      name: "Crab Pool Security",
      category: "Oranges",
      image: "https://technext.github.io/ogani/img/featured/feature-5.jpg",
    },
  ];

  return {
    props: { listFeatured, products, user },
  };
}

Catalogue.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
