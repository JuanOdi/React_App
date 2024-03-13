import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Cart from "../../../src/Pages/Cart";

function Header() {
  return (
    <div className="bg-black ">
      <Nav
        className="me-auto my-2 my-lg-0  bg-black"
        style={{ maxHeight: "100px" }}
        navbarScroll
      >
        <Nav.Link href="/about" className="ml-20 text-white text-xs">
          About
        </Nav.Link>

        <Nav.Link href="/startSelling " className=" text-white text-xs">
          Start Selling
        </Nav.Link>
        <Nav.Link href="/download " className=" text-white text-xs">
          Download
        </Nav.Link>
        <Nav.Link href="/follow " className=" text-white text-xs">
          Follow us on
        </Nav.Link>
      </Nav>

      <Navbar expand="lg">
        <Container fluid className="">
          <Navbar.Brand
            href="/"
            className=" font-semibold text-2xl text-white ml-20 uppercase"
          >
            siyapee
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 w-96 ml-24"
                aria-label="Search"
              />
              <Button variant="outline-success" className="text-white ">
                Search
              </Button>
            </Form>

            {/* Pass cart and updateQuantity props to Cart component */}
            <Nav.Link href="/cart " className=" text-white text-md ml-96">
              Cart
            </Nav.Link>
            <Nav.Link
              href="/sellerCentre "
              className="ml-10 text-white text-xs"
            >
              Seller Centre
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
