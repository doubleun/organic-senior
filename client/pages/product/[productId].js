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
import AlertSnack from "/components/Global/alertSnack";

// Nextjs imports
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useMemo, useRef } from "react";

// Bootstrap imports
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// SQL Database
import prisma from "../../prisma/client";

export default function ProductPage({ productDetail, currentUser }) {
  const router = useRouter();
  const [alert, setAlert] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const [productShipMethod, setProductShipMethod] = useState();
  const [productPrice, setProductPrice] = useState(
    productDetail.price[0].price
  );
  const [selectedImage, setSelectedImage] = useState(
    productDetail.productImages[0]
  );
  // const productShipMethod = useRef();
  const productUnit = useRef();

  //* === Functions === *//
  // Calculate total price
  const calTotalPrice = useMemo(() => productPrice * productQuantity);

  // Order function
  async function handleOrder() {
    // if no delivery method selected, return
    if (!productShipMethod) return;

    const res = await fetch("http://localhost:3000/api/order/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "ADD_ORDER",
        user_id: currentUser.id,
        product_id: productDetail.id,
        deliveryMethod: productShipMethod,
        selectedVariation: {
          unit: productUnit.current.selectedOptions[0].innerHTML,
          price: productPrice,
        },
        customerEmail: currentUser.email,
        ownerEmail: productDetail.farm.user.email,
        amount: productQuantity,
        totalPrice: calTotalPrice,
      }),
    });

    if (res.status === 200) {
      // Show success alert
      setAlert(true);
      setTimeout(() => setAlert(false), 6000);
    }
    console.log(res);
  }

  return (
    <main className="productPageMain">
      {alert ? <AlertSnack setAlert={setAlert} /> : null}
      {/* Product image, name, price and shop profile (top section) */}
      <section className="container">
        {/* Product image, name, price card */}
        <Card className="productDetailBannerCard">
          <div className="productDetailBanner">
            {/* Product image gallery*/}
            <div className="productDetailBannerImageGallery">
              <div className="imageGallerySlider">
                <ul>
                  {productDetail.productImages.map((image, index) => (
                    <li
                      className={selectedImage === image ? "selected" : null}
                      onClick={() => setSelectedImage(image)}
                      key={index}
                    >
                      <Image
                        src={image}
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="cover"
                      />
                    </li>
                  ))}
                </ul>
              </div>
              {/* Preview image */}
              <div className="productImagePreview">
                <Image
                  src={selectedImage}
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            </div>

            {/* Product detail content */}
            <div className="productDetailBannerContent">
              <div>
                <h4>{productDetail.name}</h4>
                <div className="badgesContainer mb-2">
                  <span className="badge bg-warning text-dark">30% off</span>
                  <span className="badge bg-custom-primary-outline">
                    Certified
                  </span>
                </div>
                {/* Ratings */}
                <div className="ratingsSoldContainer">
                  <ReviewStars ratings={2} displayNumber />
                  <p>
                    149 <span className="text-secondary">Sold</span>
                  </p>
                  {/* <p className="text-secondary">No Rating Yet</p> */}
                </div>
              </div>
              <h2>฿{calTotalPrice}</h2>

              {/* Shipping */}
              <div>
                <p className="text-secondary">Shipping</p>
                {productDetail.farm.delivery ? (
                  <Form.Check
                    inline
                    label="Delivery"
                    name="method"
                    type="radio"
                    value="Delivery"
                    onChange={(e) =>
                      setProductShipMethod(e.currentTarget.value)
                    }
                  />
                ) : null}
                {productDetail.farm.storeFront ? (
                  <Form.Check
                    inline
                    label="Store Front"
                    name="method"
                    type="radio"
                    value="Store Front"
                    onChange={(e) =>
                      setProductShipMethod(e.currentTarget.value)
                    }
                  />
                ) : null}
              </div>

              {/* Variation */}
              <div>
                <p className="text-secondary">Variation</p>
                <select
                  className="form-select"
                  onChange={(e) =>
                    setProductPrice(e.currentTarget.selectedOptions[0].value)
                  }
                  ref={productUnit}
                >
                  {productDetail.price.map((option, index) => (
                    <option value={option.price} key={index}>
                      {option.unit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-secondary">Quantity</p>
                <div className="productQuantityFlex">
                  <div>
                    <FaMinus
                      onClick={() =>
                        setProductQuantity((prev) =>
                          prev > 1 ? prev - 1 : prev
                        )
                      }
                    />

                    <input
                      type="number"
                      value={productQuantity}
                      onChange={(e) =>
                        setProductQuantity(parseInt(e.target.value))
                      }
                    />
                    <FaPlus
                      onClick={() => setProductQuantity((prev) => prev + 1)}
                    />
                  </div>
                  <p>30 pieces available</p>
                </div>
              </div>

              {/* Buy button */}
              <Button variant="success" onClick={handleOrder}>
                Buy Now
              </Button>
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
                <p className="text-secondary">Rating:</p>
                <p className="text-secondary">
                  Products:
                  <span className="text-success ms-2">
                    {productDetail.farm.Product.length}
                  </span>
                </p>
                <p className="text-secondary">
                  Address:
                  <span className="text-secondary ms-2">
                    {productDetail.farm.province}, {productDetail.farm.district}
                    , {productDetail.farm.subDistrict}
                  </span>
                </p>
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

//* === Nextjs exports === *//
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
          Product: true,
        },
      },
    },
  });

  //Get current user
  const currentUser = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });

  // console.log(productDetail);

  return {
    props: {
      productDetail,
      currentUser,
    },
  };
}

ProductPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
