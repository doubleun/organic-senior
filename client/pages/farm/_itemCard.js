import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsXLg } from "react-icons/bs";

export default function ItemCard({
  editFarmProducts,
  productObj,
  setAlertSuccess,
  setFarmProductsUI,
  addNewProduct,
}) {
  // Delete item function
  const handleDeleteProduct = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updateRes = await fetch(
        "http://localhost:3000/api/farm/update-product-database",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "delete",
            productId: productObj.id,
          }),
        }
      );
    } else {
      return;
    }
    // Update UI
    setFarmProductsUI((prev) =>
      prev.filter((product) => product.id !== productObj.id)
    );

    // Show success alert
    setAlertSuccess(true);
    setTimeout(() => setAlertSuccess(false), 6000);
    console.log("Successfully delete a product");
  };

  return (
    <>
      {addNewProduct ? (
        <Card style={{ width: "15rem" }} className="farmItemCard">
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
        <Card style={{ width: "15rem" }} className="farmItemCard">
          {editFarmProducts ? (
            <Button
              className="farmItmCardRemove"
              variant="alert"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteProduct();
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
                <span className="stock">
                  In Stock: {productObj.stockAmount}
                </span>
              )}
              <br />
              THB {productObj.price} <br />
              pill
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
