import Card from "react-bootstrap/Card";

const FeaturedProductCard = ({ product }) => {
  return (
    <Card className="productCard">
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Text>
          {product.name}
          <br />
          <span className="productPrice">$30.00</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FeaturedProductCard;
