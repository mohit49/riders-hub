import React from "react";
import "./CoverView.scss";
import Banner3 from "../../../assets/images/login_banner.jpg";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import  profilepic from '../../../assets/images/propic.jpg'
function CoverView({userData}) {
  return (
    <>
    <div className="mobile-cover-pic"  style={{background:`url(${process.env.REACT_BASE_API_IMAGES + userData.coverpic?.destination +'/'+ userData.coverpic?.filename}), #3e505e ` }}></div>

      <div className="left-contaner">
        <div className="picture-section">
          <div className="pro-pic">
<img src={`${userData.profilepic?.filename ? process.env.REACT_BASE_API_IMAGES + userData.profilepic.destination +'/'+ userData.profilepic.filename : profilepic}`}/>          </div>
          <div className="profile-name">
            <p>  {userData.name} <span>( {userData.username})</span></p>
          </div>
        
          <div className="follow-btn">
            <Button as="button" variant="primary">
              Follow
            </Button>
          </div>
          <div className="followers">
            <ul className="followersList">
              <li>
                <p>42</p> <span>Posts</span>
              </li>
              <li>
                <p>1320</p>
                <span>followers</span>
              </li>
              <li>
                <p>18k </p>
                <span>following</span>
              </li>
            </ul>
          </div>
          <div className="completed-KMS">
            <div className="kms-con"><h4>Kilometers completed</h4>
            <h5>{userData.kms} kms</h5>
            </div>
            <div className="bike-own">
            <div className="kms-con"><h4>Bike Own</h4>
            <h5>{userData.bikeinfo}</h5>
            </div>
    
          </div>
          </div>

      
        </div>
      </div>
    </>
  );
}

export default CoverView;
