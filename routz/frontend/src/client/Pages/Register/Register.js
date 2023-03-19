import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Register/Register.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Banner3 from "../../assets/images/reg_banner.jpg";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Select } from "antd";
import { Data } from "../../App";
const userTypes = ["company", "biker"];
function Register() {
  let navigate = useNavigate();
  const registerAPI =
    process.env.REACT_BASE_API_URL + process.env.REACT_APP_REGISTER;

  const [fullname, setFullname] = useState("");
  const [usertype, setUserType] = useState(userTypes[0]);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState();

  const { loginState, setLoginState } = useContext(Data);
  console.log(usertype)
  const submitForm = async (e) => {
    e.preventDefault();
    if (confPassword == password) {
      setLoading(!loading);
      axios
        .post(registerAPI, {
          name: fullname,
          username: username,
          email: email,
          phone: phone,
          usertype: usertype,
          companyname: companyname,
          password: password,
        })
        .then(function (response) {
          setLoading(false);
          if (!response.data.sucessStatus) {
            setError(true);
            setMessage(response.data?.error || response.data?.data);
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
    } else {
      setError(true);
      setMessage("Password not matching");
    }
  };
  const handleUserType = (value) => {
    setUserType(userTypes.filter((ele)=> ele == value)[0]);
  };
  return (
    <div className='login_con shadow-lg  bg-white'>
      <Col md={4} className='login_banner'  style={{background: `url(${Banner3})`}}>
        <h1>Meet on Road</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer{" "}
        </p>
      </Col>
      <Col md={8} className='login-form'>
        <Form onSubmit={submitForm}>
          <h2>Register Here !</h2>
          <Row>
            <Col sm={6}>
              <Form.Group className='mb-3 ' controlId='formBasicName'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder='Name'
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group className='mb-3 ' controlId='formBasicPhone'>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder='Phone'
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className='mb-3 ' controlId='formBasicUsername'>
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  value={username}
                  type='text'
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='User Name'
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group className='mb-3 ' controlId='formBasicUsertype'>
                <Form.Label>Iam a Biker / From Company</Form.Label>

                <Select
                defaultValue={userTypes[0]}
                  onChange={handleUserType}
                  options={userTypes.map((option) => ({
                    label: option,
                    value: option,
                  }))}
                />
              </Form.Group>
            </Col>
         {usertype == 'company' && <Col sm={6}>
              <Form.Group className='mb-3 ' controlId='formBasicCompany'>
                <Form.Label>Company</Form.Label>
                <Form.Control
                  value={companyname}
                  type='text'
                  onChange={(e) => setCompanyname(e.target.value)}
                  placeholder='Company Name'
                />
              </Form.Group>
            </Col>}   

          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group className='mb-3 ' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className='mb-3 ' controlId='formBasicConfPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  value={confPassword}
                  type='password'
                  onChange={(e) => setConfPassword(e.target.value)}
                  placeholder='Confirm Password'
                />
              </Form.Group>
            </Col>
          </Row>
          <div className='bottom-button'>
            <Button
              variant='primary'
              type='submit'
              size='md'
              disabled={
                !(
                  password.length > 0 &&
                  fullname.length > 0 &&
                  usertype.length > 0 &&
                  phone.length > 0 &&
                  email.length > 0 &&
                  username.length > 0 &&
                  confPassword.length > 0
                )
              }>
              {loading && (
                <Spinner
                  as='span'
                  animation='grow'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
              )}
              {loading ? "Please Wait" : "Register Now"}
            </Button>
          </div>
        </Form>

        {error && (
          <Form.Group
            className='form-con errormsg'
            controlId='formBasicCheckbox'>
            <p>{message}</p>
          </Form.Group>
        )}
      </Col>
    </div>
  );
}

export default Register;
