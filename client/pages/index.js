import { useState } from "react";
import { signIn } from "next-auth/react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import SignUpModal from "../components/SignUpModal";

export default function Landing() {
  const [showSignUp, setShowSignUp] = useState();
  const callbackRedirect = {
    callbackUrl: "http://localhost:3000/home/catalogue",
  };

  return (
    <main className="mainLandingPage">
      <section className="landingTopSection">
        {/* SignUp Modal */}
        <SignUpModal showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
        <div className="landingLoginBox">
          <div className="loginBoxContent">
            <h4>ORGANIC PLATFORM</h4>
            <h2>OGANI</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formEmail">
                {/* <Form.Label>Email Address</Form.Label> */}
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formPassword">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control type="password" placeholder="Enter password" />
              </Form.Group>
            </Form>
            <Button variant="success" className="landingLoginButton">
              Login
            </Button>
            <h5>Or</h5>
            <Button
              variant="primary"
              onClick={() => signIn("facebook", callbackRedirect)}
            >
              <img src="svgs/facebook_ico.svg" alt="" />
              Continue with Facebook
            </Button>
            <Button
              variant="danger"
              onClick={() => signIn("google", callbackRedirect)}
            >
              <img src="svgs/google_ico.svg" alt="" />
              Continue with Google
            </Button>
            <p>
              Not have an account yet?
              <span onClick={() => setShowSignUp(true)}>Sign up</span>
            </p>
          </div>
        </div>
      </section>

      {/* First section footer (features) */}
      <section className="topFooterSection">
        <div className="container">
          <div className="landingTopFooter">
            <div className="topFooterContent">
              <h2>Our features</h2>
              <span />
              <h5>We provide an easier way to be healthy</h5>
            </div>
            <div className="topFooterContent">
              <ul>
                <li>
                  Looking for a healthy diet? Our goal is to make organic
                  products much more accessible to everyone, and everywhere in
                  Thailand.
                </li>
                <li>
                  Products sold on our platform are sold directly from local
                  farmers all over Thailand. And you can checkout where the farm
                  is located before purchase
                </li>
              </ul>
            </div>
            <div className="topFooterContent">
              <ul>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate eveniet voluptates distinctio suscipit atque eaque
                  vitae temporibus labore cumque expedita reiciendis sunt non in
                  laudantium maiores a asperiores aperiam inventore amet ad,
                  praesentium, sapiente impedit repellendus dolor! Enim, dolores
                  error!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
