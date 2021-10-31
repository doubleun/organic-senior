import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsXLg } from "react-icons/bs";

export default function ItemCard({
  editFarmProducts,
  productName,
  productPrice,
  productStock,
  productImage,
  addNewProduct,
}) {
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
            <Button className="farmItmCardRemove" variant="alert">
              <BsXLg />
            </Button>
          ) : null}
          <Card.Img
            variant="top"
            src={productImage}
            style={{ height: "58%" }}
          />
          <Card.Body>
            <Card.Title>{productName}</Card.Title>
            <Card.Text>
              In Stock: {productStock} <br />
              THB {productPrice} <br />
              pill
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
