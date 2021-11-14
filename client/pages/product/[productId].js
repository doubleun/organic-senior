// Component imports
import Layout from "../layout/_layout";
import Comment from "/components/Product/comment";
import ReviewStars from "../../components/Global/reviewStars";
import {
  FaMinus,
  FaPlus,
  FaStore,
  FaCommentsDollar,
  FaCircleNotch,
} from "react-icons/fa";

// Nextjs imports
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";

// Bootstrap imports
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// SQL Database
import prisma from "../../prisma/client";

export default function ProductPage({ productDetail }) {
  console.log(productDetail.farm);
  const router = useRouter();
  const [productQuantity, setProductQuantity] = useState(1);
  return (
    <main className="productPageMain">
      {/* Product image, name, price and shop profile (top section) */}
      <section className="container">
        {/* Product image, name, price card */}
        <Card className="productDetailBannerCard">
          <div className="productDetailBanner">
            <Image
              src={productDetail.productImages[0]}
              width="400px"
              height="400px"
            />
            <div className="productDetailBannerContent">
              <div>
                <h4>{productDetail.name}</h4>
                {/* Ratings */}
                <div className="ratingsSoldContainer">
                  <ReviewStars ratings={4} displayNumber />
                  <p>
                    149 <span className="text-secondary">Sold</span>
                  </p>
                  {/* <p className="text-secondary">No Rating Yet</p> */}
                </div>
              </div>
              <h2>฿{productDetail.price}</h2>

              {/* Shipping */}
              <div>
                <p className="text-secondary">Shipping</p>
                <Form.Check
                  inline
                  label="Delivery"
                  name="group1"
                  type="radio"
                />
                <Form.Check
                  inline
                  label="Store Front"
                  name="group1"
                  type="radio"
                />
              </div>

              {/* Variation */}
              <div>
                <p className="text-secondary">Variation</p>
                <select className="form-select">
                  <option value="1">200 G</option>
                  <option value="2">500 G</option>
                  <option value="3">1 KG</option>
                  <option value="4">1.2 KG</option>
                  <option value="5">1.5 KG</option>
                </select>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-secondary">Quantity</p>
                <div className="productQuantityFlex">
                  <div>
                    <FaMinus
                      onClick={() => setProductQuantity((prev) => prev - 1)}
                    />

                    <input type="number" defaultValue={productQuantity} />
                    <FaPlus
                      onClick={() => setProductQuantity((prev) => prev + 1)}
                    />
                  </div>
                  <p>30 pieces available</p>
                </div>
              </div>

              {/* Buy button */}
              <Button variant="success">Buy Now</Button>
            </div>
          </div>
        </Card>

        {/* Shop profile card */}
        <div className="productShopeProfileCard">
          <Card>
            <div className="productShopeProfileContent">
              {/* Profile image */}
              <Image
                src={productDetail.farm.user.image}
                width="120px"
                height="90px"
              />
              <div className="productShopeProfileLeft">
                <h5>{productDetail.farm.name}</h5>
                <div className="shopActiveSign" style={{ color: "#7fad39" }}>
                  <FaCircleNotch />
                  <p>Active</p>
                </div>
                <div>
                  <Button
                    className="productShopeProfileButtons text-white"
                    variant="info"
                  >
                    <FaCommentsDollar />
                    Contact
                  </Button>
                  <Button
                    className="productShopeProfileButtons"
                    variant="outline-success"
                    onClick={() =>
                      router.push(`/farm/${productDetail.farm.id}`)
                    }
                  >
                    <FaStore />
                    View Shop
                  </Button>
                </div>
              </div>

              <div className="productShopeProfileRight">
                <p className="text-secondary">About farm</p>
                <p className="text-secondary">Products</p>
                <p className="text-secondary">Rating</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Detail section */}
      <section className="productDetailBody container">
        <div className="productDetailBodyCard card">
          <div className="card-body">
            <h4 className="card-title">Product Description</h4>
            <p className="card-text">{productDetail.description}</p>
          </div>
        </div>
      </section>

      {/* Comment section */}
      <section className="productDetailComment container">
        <div className="productDetailCommentCard card">
          <div className="card-body">
            <h4 className="card-title">
              Review for this item{" "}
              <span className="badge rounded-pill bg-light text-dark">
                (2,400)
              </span>
            </h4>

            {/* Comments */}
            <Comment />
            <Comment />
          </div>
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const user = session?.user;

  // Get product id from the params
  const { productId } = context.query;

  // redirect if not logged in
  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  //Get product from database
  const productDetail = await prisma.product.findFirst({
    where: {
      id: parseInt(productId),
    },
    include: {
      farm: {
        include: {
          user: true,
        },
      },
    },
  });

  console.log(productDetail);

  return {
    props: {
      productDetail,
    },
  };
}

ProductPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
