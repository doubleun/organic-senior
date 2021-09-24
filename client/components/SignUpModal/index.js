import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import BackDrop from "./BackDrop";

const Modal = ({ showSignUp, setShowSignUp }) => {
  return (
    <BackDrop showSignUp={showSignUp} setShowSignUp={setShowSignUp}>
      <div
        className="signUpBox"
        style={{ display: showSignUp ? "flex" : "none" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Create an account</h1>
        <Form>
          <div className="inputSameLine">
            <Form.Group controlId="signUpFName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
            </Form.Group>

            <Form.Group controlId="signUpLName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="signUpEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="signUpPass">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" placeholder="Enter password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="signUpConfPass">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="text" placeholder="Enter confirm password" />
          </Form.Group>

          <Form.Check
            type="checkbox"
            id="default-checkbox"
            label="I agree to the Terms and Conditions"
          />

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </BackDrop>
  );
};

export default Modal;
