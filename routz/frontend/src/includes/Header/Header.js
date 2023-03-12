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
import "../Header/header.scss";
import GetLocation from "../../Middleware/GetLocation"
function Header() {
  const getLocation = GetLocation();
  let location = useLocation();
  let navigate = useNavigate();
  const profileFetch =
    process.env.REACT_BASE_API_URL + process.env.REACT_APP_PROFILE_FETCH;
  const { loginState, setLoginState, profileData, setProfileData , setUserPosition , userPosition } =
    useContext(Data);
  const [loading, setLoading] = useState(true);
  const [loginData, setLoginData] = useState();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }

    function showError() {
      setUserPosition(false);
    }

    function showPosition() {
      getLocation()
        .then((position) => {
          setUserPosition(position);
      
        
        })
        .catch((err) => {
          setUserPosition(false);
        });
    }
  }, []);

  useEffect(() => {
    axios
      .get(profileFetch, { withCredentials: true })
      .then(function (response) {
        if (!response.data.sucessStatus) {
          console.log(response.data.data);
          setLoginState(false);
          setLoading(false);
        }
        if (response.data.data == "loginError") {
          setLoginState(false);
          setProfileData(response.data.data);
          setLoading(false);
          //navigate("/login");
        } else {
          console.log(response.data.data);
          setLoginState(true);
          setLoginData(response.data.data);
          setProfileData(response.data.data);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [loginState]);
  return (
    <>
      {["sm"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          bg='dark'
          variant='dark'
          sticky='top'>
          <Container>
            <Navbar.Brand href='#'>Navbar Offcanvas</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement='end'>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className='justify-content-end flex-grow-1 pe-3'>
                  <LinkContainer to='/'>
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>

                  <Nav.Link href='#action1'>Search Biker</Nav.Link>
                  <Nav.Link href='#action2'>Find Event</Nav.Link>
                  <Nav.Link href='#action2'>Find Show Room</Nav.Link>
                  {loading && (
                    <>
                      <Spinner
                        animation='border'
                        role='status'
                        variant='light'
                        size='sm'>
                        <span className='visually-hidden'>Loading...</span>
                      </Spinner>
                    </>
                  )}
                  {!loading && (
                    <>
                      {loginState && (
                        <Dropdown>
                          <Dropdown.Toggle
                            variant='primary'
                            id='dropdown-basic'>
                            <span className='profile-pic'>
                              <img
                                src={
                                  process.env.REACT_BASE_API_URL +
                                  loginData?.profilepic?.destination +
                                  "/" +
                                  loginData?.profilepic?.filename
                                }
                              />
                            </span>{" "}
                            Hi! {loginData?.name}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <NavDropdown.Item href='#action3'>
                              Menu
                            </NavDropdown.Item>
                            <NavDropdown.Item href='#action4'>
                              Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavLink
                              to='/create-events'
                              className='dropdown-item'>
                              Create event
                            </NavLink>
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                      {!loginState && (
                        <LinkContainer to='/login'>
                          <Button variant='primary'>Login / Register</Button>
                        </LinkContainer>
                      )}
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;
