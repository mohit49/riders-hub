import React, { useState, useEffect, useContext,  } from "react";
import axios from "axios";
import "../ProfileView/ProfileView.scss";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Data } from "../../App";
import Container from "react-bootstrap/Container";
import { Button, Result } from 'antd';
import CoverView from "./CoverView/CoverView";
import RightContainer from "./RightContainer/RightContainer";

import PageError from "../../Component/PageError/PageError";
const profileFetch =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_PROFILE_FETCH;
function ProfileView() {
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(true);
  const [userData, setUserData] = useState();
  let { userId } = useParams();
  console.log(userId)
  useEffect(() => {
    setLoader(true)
    axios
      .get(profileFetch+ '/'+userId)
      .then(function (response) {
        console.log(response.data.sucessStatus +'dddd')
        if(response.data.sucessStatus) {
          setUserData(response.data.data);
          setLoader(false)
          setError(false)
        } else {
          setLoader(false)
          setError(true)
        }

       
      })
      .catch(function (error) {
        console.log(error);
        setLoader(false)
        setError(true)
      });
  }, []);

  return (

    <Container className="mn-container">
      {(loader && !error) && <Spinner animation="border" variant="primary"  />}
     
    {(!loader && !error) &&  <CoverView userData={userData}  /> }
    {(!loader && !error) &&  <RightContainer   userData={userData}   />}
   
    {(!loader && error) &&  <PageError userId={userId}/>}
    
    </Container>
  );
}

export default ProfileView;
