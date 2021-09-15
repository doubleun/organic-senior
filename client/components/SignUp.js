import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignUp = ({ showSignUp }) => {
  return (
    <div
      className="signUpBox"
      style={{ display: showSignUp ? "flex" : "none" }}
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

      {/* <form>
        <input type="checkbox" value="asd" id="signUpCheck" />
        <label htmlFor="signUpCheck">I agree to the Terms and Conditions</label>
        <br />
        <button className="hbutton-primary">Register</button>
      </form> */}
    </div>
  );
};

export default SignUp;
