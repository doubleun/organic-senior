import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { BsXLg } from 'react-icons/bs'

export default function ItemCard({
  editFarmProducts,
  productObj,
  setAlertSuccess,
  setFarmProductsUI,
  addNewProduct,
  showProvince,
}) {
  // Delete item function
  const handleDeleteProduct = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      const res = await fetch('/api/farm/update-product-database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          productId: productObj.id,
        }),
      })
      if (res.status === 200) {
        // Update UI
        setFarmProductsUI((prev) =>
          prev.filter((product) => product.id !== productObj.id)
        )

        // Show success alert
        setAlertSuccess(true)
        setTimeout(() => setAlertSuccess(false), 6000)
        console.log('Successfully delete a product')
      }
    } else {
      return
    }
  }

  return (
    <>
      {addNewProduct ? (
        <Card style={{ width: '15rem' }} className="farmItemCard">
          <Card.Img variant="top" src="/images/imagePlaceholder.jpg" />
          <Card.Body>
            <Card.Title>Add new product</Card.Title>
            <Card.Text>
              ... <br />
              THB ...
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card style={{ width: '15rem' }} className="farmItemCard">
          {editFarmProducts ? (
            <Button
              className="farmItmCardRemove"
              variant="alert"
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteProduct()
              }}
            >
              <BsXLg />
            </Button>
          ) : null}
          <Card.Img variant="top" src={productObj.productImages[0]} />
          <Card.Body>
            <Card.Title>{productObj.name}</Card.Title>
            <Card.Text>
              {productObj.stockAmount === 0 ? (
                <span className="stock-out">Out of stock</span>
              ) : (
                <span className="stock text-secondary">
                  In Stock: {productObj.stockAmount}
                </span>
              )}
              <span className="badgesContainer">
                <span className="badge bg-warning text-dark">30% off</span>
                <span className="badge bg-custom-primary-outline">
                  Certified
                </span>
              </span>
              <span className="price">
                {productObj.price[0].price} THB/
                {productObj.price[0].unit}
              </span>
              {showProvince ? (
                <span className="province text-secondary">
                  From: {showProvince}
                </span>
              ) : null}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  )
}
