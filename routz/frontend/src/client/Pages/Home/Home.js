import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Data } from "../../App";
import "../Home/Home.scss";
import Container from "react-bootstrap/Container";
import Slider from "../../uiElements/Slider/Slider";
import LatestEvents from "../../Component/LatestEvents/LatestEvents";
import Banner1  from "../../assets/images/banner1.jpg";
import Banner2  from "../../assets/images/banner2.jpg";
import Banner3  from "../../assets/images/banner3.jpg";
import Banner1_mob  from "../../assets/images/banner1_mob.jpg";
import Banner2_mob  from "../../assets/images/banner2_mob.jpg";
import Banner3_mob  from "../../assets/images/banner3_mob.jpg";
import SearchBar from "../../Component/SearchBar/SearchBar";
import Latestposts from "../../Component/Latestposts/Latestposts";
import Ridersupdate from "../../Component/Ridersupdate/Ridersupdate";
import RidersFeed from "../../Component/RidersFeed/RidersFeed";
const profileFetch =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_PROFILE_FETCH;
function Home() {
  const { loginState, setLoginState, profileData, setProfileData } =
    useContext(Data);
const sliderItem = {
    slide1:{
        'image': Banner1,
        'img_mob':Banner1_mob,
        'cta': true,
        'ctaLink':'#',
        'ctaText':'Find Now',
        'sliderHeading':'Find And event for riding',
        'sliderText':`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`,
        'className':'slider-con-inner',
        'buttonVariant':'primary',
        'btnSize':'md'
    },
    slide2:{
        'image':Banner2,
        'img_mob':Banner2_mob,
        'cta': true,
        'ctaLink':'#',
        'ctaText':'Search Now',
        'sliderHeading':'Search for a Rider',
        'sliderText':`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`,
        'className':'slider-con-inner',
        'buttonVariant':'primary',
        'btnSize':'md'
    },
    slide3:{
        'image':Banner3,
        'img_mob':Banner3_mob,
        'cta': true,
        'ctaLink':'www.google.com',
        'ctaText':'Search Now',
        'sliderHeading':'Search for a Show Room',
        'sliderText':`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`,
        'className':'slider-con-inner',
        'buttonVariant':'primary',
        'btnSize':'md'
    },
}
  return (
    <>
    <Container className="simpleSection">
      <Slider effect='fade' autoPlay={true} items={sliderItem} dotPosition='bottom' buttonClass='primary' className='slider-home'/>
<SearchBar/>
    </Container>
     <Container className="bgChange" fluid>
   <LatestEvents/>
   </Container>
   
   <Latestposts/>
  
   <Ridersupdate/>
<RidersFeed/>
 
   </>
  );
}

export default Home;
