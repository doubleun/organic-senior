import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ReviewStars from '/components/Global/reviewStars'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  FaStore,
  FaCommentsDollar,
  FaStoreAlt,
  FaUserAlt,
  FaUserCircle,
} from 'react-icons/fa'
// import { handleRespondOrder } from '/pages/order/farm'

function orderCard({
  incomingOrder,
  finished,
  orderObj,
  handleRespondOrder,
  directToProduct,
  showUserInfoModal,
}) {
  const router = useRouter()
  // console.log(orderObj);

  //* === Functions === *//
  function handleDirectRoute() {
    // console.log(orderObj);
    // If order is cancelled, user will not be able to get to the progress page
    if (orderObj.status === 'Cancelled') return

    // If directToProduct is true, then we'll direct user to product page
    if (directToProduct) {
      router.push(`/product/${orderObj.product.id}`)
    } else {
      // Else direct them to the progress page
      router.push(`/order/progress/${orderObj.id}`)
    }
  }

  //* === Main === *//
  return (
    <Card className="orderCardContainer">
      <Card.Body>
        {/* Farm shop flex */}
        <div className="farmShopFlex">
          {/* Left side (ie. display shop) */}
          {incomingOrder ? (
            <div>
              <FaUserAlt />
              <h5>
                {orderObj.user.name} ({orderObj.user.email})
              </h5>
              {/* TODO: HERE */}
              <Button
                className="productShopeProfileButtons text-white"
                variant="info"
                onClick={() => showUserInfoModal(orderObj.user)}
              >
                <FaUserCircle />
                <span>View user info</span>
              </Button>
            </div>
          ) : (
            <div>
              <FaStoreAlt />
              <h5>{orderObj.product.farm.name}</h5>
              {orderObj.product.farm.socialLink ? (
                <a href={orderObj.product.farm.socialLink} target="_blank">
                  <Button
                    className="productShopeProfileButtons text-white"
                    variant="info"
                  >
                    <FaCommentsDollar />
                    <span>Contact</span>
                  </Button>
                </a>
              ) : null}
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
            <h6
              className={
                orderObj.status === 'Cancelled' ? 'text-danger' : 'text-success'
              }
            >
              Status: {orderObj.status}
            </h6>
          )}
        </div>

        {/* Product display flex */}
        <div className="productDisplayFlex" onClick={handleDirectRoute}>
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

        {/* Remark order date, btn flex */}
        <div className="remarkOrderDateFlex">
          {orderObj.remark ? (
            <h6 className="text-danger">Remark: {orderObj.remark}</h6>
          ) : (
            <h6></h6>
          )}
          {/* Order date, btn flex */}
          <div className="orderDateBtn">
            <p className="text-secondary">
              Ordered date: (
              {new Date(Date.parse(orderObj.date)).toISOString().slice(0, 10)})
            </p>
            {orderObj.status === 'New' && incomingOrder ? (
              <>
                <Button
                  variant="danger"
                  onClick={() =>
                    handleRespondOrder(orderObj.id, 'Cancelled', 0)
                  }
                >
                  DECLINE
                </Button>
                <Button
                  variant="success"
                  onClick={() =>
                    handleRespondOrder(orderObj.id, 'In Progress', 1)
                  }
                >
                  ACCEPT
                </Button>
              </>
            ) : (
              <Button
                variant="success"
                onClick={handleDirectRoute}
                disabled={orderObj.status === 'Cancelled'}
              >
                {directToProduct ? 'VIEW PRODUCT' : 'VIEW ORDER'}
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default orderCard
