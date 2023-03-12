import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Login/Login.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Data } from "../../App";
import Banner3 from "../../assets/images/login_banner.jpg";
function Login() {
  let navigate = useNavigate();
  const loginAPI =
    process.env.REACT_BASE_API_URL + process.env.REACT_APP_LOGIN_API;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);
  const [loginName, setLoginName] = useState();
  const [password, setPassword] = useState();
  const { loginState, setLoginState } = useContext(Data);



  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(!loading);
    axios
      .post(loginAPI, {
        username: loginName,
        password: password,
      })
      .then(function (response) {
        setLoading(false);
        if (!response.data.sucessStatus) {
          setError(true);
          setMessage(response.data.data);
        } else {
          setError(false);
          setMessage("");
          document.cookie = `token= ${response.data.authToken}`;
          setLoginState(true);
          navigate("/profile");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="login_con shadow-lg  bg-white">
      <Col md={7} className="login_banner" style={{background: `url(${Banner3})`}}>
        <h1>Meet on Road w</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer{" "}
        </p>
      </Col>
      <Col md={5} className="login-form">
        <Form onSubmit={submitForm}>
          <h2>Login Here !</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter user name phone or email</Form.Label>
            <Form.Control
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              placeholder="Enter user name phone or email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button
              variant="primary"
              type="submit"
              size="md"
              disabled={!(loginName && password)}
            >
              {loading && (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {loading ? "Please Wait" : "Login"}
            </Button>
          </div>
        </Form>
        <Form.Group className="form-con" controlId="formBasicCheckbox">
          <p>
            Not registered yet ? <Link to="/register">Register Now</Link>
          </p>
        </Form.Group>
        <Form.Group className="form-con" controlId="formBasicCheckbox">
          <p>Or login with</p>
          <FacebookLogin
            appId="1088597931155576"
            autoLoad={false}
            fields="name,email,picture"
          />
        </Form.Group>
        {error && (
          <Form.Group
            className="form-con errormsg"
            controlId="formBasicCheckbox"
          >
            <p>{message}</p>
          </Form.Group>
        )}
      </Col>
    </div>
  );
}

export default Login;
