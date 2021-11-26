import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ReviewStars from "/components/Global/reviewStars";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  FaStore,
  FaCommentsDollar,
  FaStoreAlt,
  FaUserAlt,
} from "react-icons/fa";

function orderCard({ newOrder, finished, orderObj, handleRespondOrder }) {
  const router = useRouter();
  return (
    <Card className="orderCardContainer">
      <Card.Body>
        {/* Farm shop flex */}
        <div className="farmShopFlex">
          {/* Left side (ie. display shop) */}
          {newOrder ? (
            <div>
              <FaUserAlt />
              <h5>{orderObj.user.name}</h5>
            </div>
          ) : (
            <div>
              <FaStoreAlt />
              <h5>{orderObj.product.farm.name}</h5>
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
                onClick={() => router.push(`/farm/${orderObj.product.farm.id}`)}
              >
                <FaStore />
                View Shop
              </Button>
            </div>
          )}

          {/* Right side (ie. rating) */}
          {finished ? (
            <ReviewStars ratings={4} displayNumber />
          ) : (
            orderObj.status
          )}
        </div>

        {/* Product display flex */}
        <div className="productDisplayFlex">
          {/* Left side (ie. image, name, variation, amount) */}
          <div className="productDisplayFlexImage">
            <Image
              src={orderObj.product.productImages[0]}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="cover"
            />
          </div>
          <div className="productNameVariations">
            <h6>{orderObj.product.name}</h6>
            <p className="text-secondary">
              Variation: {orderObj.selectedVariation.unit}
            </p>
            <p>x{orderObj.amount}</p>
          </div>
          {/* Right side (ie. price) */}
          <div className="orderCardPriceTag">
            <p>Total: </p>
            <h4>{orderObj.total_price}</h4>
          </div>
        </div>

        {/* Order date, btn flex */}
        <div className="orderDateBtn">
          <p className="text-secondary">
            Ordered date: (
            {new Date(Date.parse(orderObj.date)).toISOString().slice(0, 10)})
          </p>
          {orderObj.status === "New" ? (
            <>
              <Button variant="danger">DECLINE</Button>
              <Button
                variant="success"
                onClick={() => handleRespondOrder(orderObj.id, "In Progress")}
              >
                ACCEPT
              </Button>
            </>
          ) : (
            <Button
              variant="success"
              onClick={() => router.push(`/order/progress/${orderObj.id}`)}
            >
              VIEW ORDER
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default orderCard;
