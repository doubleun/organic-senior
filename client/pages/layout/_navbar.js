// Component imports
import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

// Icon imports
import { FaBell, FaReceipt } from "react-icons/fa";

// Auth and react imports
import { signOut, useSession } from "next-auth/react";

import { useEffect, useState } from "react";

const MainNavbar = () => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  const [farm, setFarm] = useState();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (isUser) {
      // console.log(session);
      async function fetchFarm() {
        const res = await fetch("http://localhost:3000/api/farm/get-farm", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ email: session.user.email }),
        });
        const data = await res.json();
        setFarm(data.prismaRes.FarmMain);
        console.log(data);
      }
      fetchFarm();
    }
  }, [status]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="mainNavbar"
      sticky="top"
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
            <Link href="/shop">
              <Nav.Link as="a">SHOP</Nav.Link>
            </Link>
            {/*// ! Edit route ! */}
            <Link href="#">
              <Nav.Link as="a">CONTACT</Nav.Link>
            </Link>
          </Nav>
          <Nav className="endNav">
            {/* <Nav.Link href="/order/farm">{farm ? <FaBell /> : null}</Nav.Link> */}
            <Nav.Link href="/order/user">
              <FaReceipt />
            </Nav.Link>
            <p>logged in as: </p>
            <NavDropdown
              as="h6"
              title={session ? session.user.name : "...."}
              className="loginStatus"
            >
              {farm ? (
                <Link href={`/farm/${farm.id}`}>
                  <NavDropdown.Item as="button">Farm</NavDropdown.Item>
                </Link>
              ) : null}

              <Link href="/settings/profile">
                <NavDropdown.Item as="button">Settings</NavDropdown.Item>
              </Link>

              <NavDropdown.Divider />
              <NavDropdown.Item as="button" onClick={() => signOut()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
