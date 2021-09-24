import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

import { HiHeart } from "react-icons/hi";
import { HiShoppingBag } from "react-icons/hi";

const MainNavbar = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="mainNavbar"
    >
      <Container>
        <Link href="/home/catalogue">
          <Navbar.Brand>
            <img src="https://technext.github.io/ogani/img/logo.png" alt="" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="linkNav">
            <Link href="/home/catalogue">
              <Nav.Link as="a">HOME</Nav.Link>
            </Link>
            <Link href="/">
              <Nav.Link as="a">SHOP</Nav.Link>
            </Link>
            <Link href="/">
              <Nav.Link as="a">CONTACT</Nav.Link>
            </Link>
          </Nav>
          <Nav className="endNav">
            <Nav.Link href="#deets">
              <HiHeart />
            </Nav.Link>
            <Nav.Link href="#memes">
              <HiShoppingBag />
            </Nav.Link>
            <p>logged in as: </p>
            <NavDropdown as="h6" title="Tester" className="loginStatus">
              <NavDropdown.Item as="button">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
