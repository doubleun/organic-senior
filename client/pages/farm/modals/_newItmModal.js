import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function NewItemModal() {
  return (
    <div className="farmAddNewItemModal">
      <h3>Add new items</h3>
      <p id="subtitle">Add</p>
      <div className="customDivider">
        <span className="dividerText">About product</span>
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="addProductName">
          <Form.Label>Product name</Form.Label>
          <Form.Control type="text" placeholder="Product name" />
        </Form.Group>

        <Form.Label>Category</Form.Label>
        <Form.Select className="mb-3">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>

        <Form.Group className="mb-3" controlId="addProductDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        {/* Product stock checkbox */}
        <div className="addProductStockFlex">
          <Form.Group className="mb-3" controlId="addProductInStock">
            <Form.Check type="checkbox" label="In stock" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="addProductName">
            <Form.Control type="number" placeholder="Enter stock amount" />
          </Form.Group>
        </div>

        <Button variant="secondary" type="button">
          Cancel
        </Button>
        <Button variant="primary" type="button">
          Submit
        </Button>
      </Form>
    </div>
  );
}
