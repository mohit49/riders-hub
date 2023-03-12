import React, { useState,useEffect, useContext  } from "react";
import axios from "axios";
import "../Profile/Profile.scss";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Data } from "../../App";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Coverpic from "../../uiElements/Coverpic/Coverpic";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { ModalBox } from "../../uiElements/modal/modal";
import ProfileData from "../../includes/ProfileData/ProfileData";
import EditInfo from "../../Middleware/Forms/EditInfo";
import CreatePost from "../../Component/CreatePost/CreatePost";
const profileFetch =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_PROFILE_FETCH;
function Profile() {
  const [show,setShow] = useState(false);
 const [loading, setLoading] = useState();
  const handleClose = () => setShow(false)
  const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [profileStatus, setUpdateProfileStatus] = useState(false);
    const [state, setState] = useState();
  let navigate = useNavigate();
  const { loginState, setLoginState, profileData, setProfileData } =
    useContext(Data);
  useEffect(() => {
    if(loginState) {
    setLoading(true);
    axios
      .get(profileFetch, { withCredentials: true })
      .then(function (response) {
        if (!response.data.sucessStatus) {
          setLoading(false);
          console.log(response.data.data);
        }
        if (response.data.data == "loginError") {
          console.log(response.data.data);
         
          setLoading(false);
          setLoginState(false);
          navigate("/login");
        } else {
          console.log(response.data.data)
       
          setLoading(false);
          setLoginState(true);
          setCountry(response?.data?.data?.location?.country);
          setCity(response?.data?.data?.location?.city);
          setState(response?.data?.data?.location?.state);

         
          
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }, [loginState, profileStatus]);

  const openModal = (()=>{
    setShow(true)
   
  })
  return (
    
    <Container>
    
    {loading  && <div className="loading-con"><Spinner style={{color: "#0d6efd"}}
                  as="span"
                  animation="grow"
                  size="lg"
                  role="status"
                  aria-hidden="true"
                /></div> }
     {!loading && <Coverpic city={city} state={state}  country={country} /> }
     {!loading &&  <Container className="p-0 mtop">
        <Row>
          <Col md={3}>
            <Card
              className="shadow-sm p-3 mb-5 bg-white rounded"
              border="light"
              style={{ width: "100%" }}
            >
              {profileData &&
              <Card.Body>
               
                <Card.Title>About</Card.Title>
              
                  <Card.Text
                  dangerouslySetInnerHTML={{ __html: profileData?.intro }}
                  ></Card.Text>
                  <hr/>
                  <Card.Text>
                  <p>
                  <strong>Bike Info :</strong> {profileData?.bikeinfo}
                  </p>

                  </Card.Text>
                  <p>
                  <strong>Distance Covered :</strong> {profileData?.kms}
                  </p>
                  <p>
                  
                  <strong>Location :</strong> {`${city} , ${state}, ${country}`}
                  </p>
                

                  <p>
                  <strong>Company :</strong> {profileData?.companyinfo}
                  </p>
                 
                
              
                
              
                <Button variant="primary" onClick={openModal} >Edit Info</Button>
                
              </Card.Body>
              }
            </Card>
          </Col>
          <Col md={7}>
          <CreatePost profileData={profileData}/>
          </Col>
          <Col>
            <Card className="shadow-sm  mb-2 bg-white rounded" border="light">
              <Card.Header>Friends</Card.Header>
              <Card.Body>
                <Card.Title> 200 </Card.Title>
              </Card.Body>
            </Card>
            <Card className="shadow-sm  mb-2 bg-white rounded" border="light">
              <Card.Header>Followers</Card.Header>
              <Card.Body>
                <Card.Title> 200 </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container> }
      <ModalBox  show={show}  handleCloseModal={handleClose} content={<EditInfo  handleCloseModal={handleClose} setUpdateProfileStatus={setUpdateProfileStatus} distance={profileData?.kms} location={city +","+ state + "," + country} resIntro={profileData?.intro} bikeInfo={profileData?.bikeinfo}/>} modalHeading="Update Profile Informations"/>
    </Container>
  );
}

export default Profile;
