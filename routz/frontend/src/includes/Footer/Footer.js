import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Data } from "../../App";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import "../Footer/Footer.scss";
import GetLocation from "../../Middleware/GetLocation";
import { createFromIconfontCN } from "@ant-design/icons";
import { Space } from "antd";
import { InstagramOutlined , YoutubeOutlined  } from '@ant-design/icons';
function Footer() {
  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
  });

  return (
    <>
      <footer className="page-footer font-small blue pt-4">
        <Container>
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <div className="col-md-2 mb-md-0 mb-3">
                <ul className="list-unstyled">
                  <li>logo</li>
                  <li>
                    <Space>
                      <LinkContainer to="/">
                      <InstagramOutlined />
                      </LinkContainer>
                      <LinkContainer to="/">
                        <IconFont type="icon-facebook" />
                      </LinkContainer>
                      <LinkContainer to="/">
                        <IconFont type="icon-twitter" />
                      </LinkContainer>
                      <LinkContainer to="/">
                      <YoutubeOutlined />
                      </LinkContainer>
                    </Space>
                  </li>

                </ul>
              </div>
              <div className="col-md-2 mb-md-0 mb-3">
                <ul className="list-unstyled">
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>Search Bikers</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>Find Events</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>Finde Showrooms</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>Create Event</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>Find Showroom</Nav.Link>
                    </LinkContainer>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 mb-md-0 mb-3">
                <ul className="list-unstyled">
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>View Profile</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>See top rated bikes</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>Find Events</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>Finde Showrooms</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>Create Event</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>Find Showroom</Nav.Link>
                    </LinkContainer>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 mb-md-0 mb-3">
                <ul className="list-unstyled">
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>View Profile</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>See top rated bikes</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>Find Events</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>Finde Showrooms</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>Create Event</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/">
                      <Nav.Link>Find Showroom</Nav.Link>
                    </LinkContainer>
                  </li>
                </ul>
              </div>
              
            </div>
          </div>
        </Container>
        <div className="footer-copyright text-center py-3">
          © 2023 Copyright:
          <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
