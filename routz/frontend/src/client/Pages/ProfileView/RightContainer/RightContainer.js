import React from 'react'
import Banner3 from "../../../assets/images/login_banner.jpg";
import { MapPinIcon } from "@heroicons/react/24/solid";

function RightContainer({userData}) {
  return (
    <div className='right-cover'  >
      <div className='cover-pic-dexktop'  style={{ background: `url(${process.env.REACT_BASE_API_URL + userData.coverpic?.destination +'/'+ userData.coverpic?.filename}), #3e505e` }}>
        <div className='location'>
        <MapPinIcon class='h-6 w-6 text-blue-100 location-icon' /> {userData.location?.city}  {userData.location?.state} 
        </div>
      <div className="user-name">
        <div className='bannerInfo'> <p>
             {userData.usertype} 
            </p></div>
        
           
          </div>
      </div>
      <div className='rt-main-container'>
        <div className='center-con'>
          <div className='latestVisits'>
            <h4>Latest Visits</h4>
            <ul>
              <li><div className='thumbsSpan'><div className='img-con'><img src={Banner3}/></div></div></li>
              <li><div className='thumbsSpan'><div className='img-con'><img src={Banner3}/></div></div></li>
              <li><div className='thumbsSpan'><div className='img-con'><img src={Banner3}/></div></div></li>
              <li><div className='thumbsSpan'><div className='img-con'><img src={Banner3}/></div></div></li>
              <li><div className='thumbsSpan'><div className='img-con'><img src={Banner3}/></div></div></li>
              <li><div className='thumbsSpan'><div className='img-con'><img src={Banner3}/></div></div></li>
           
             
            
            </ul>
          </div>
        </div>
      <div className="right-con">
      {userData?.intro &&  <div className='about-sec'>
            <h5>Introduction</h5>
            <p> {userData.intro} </p>
          </div> }
       
          </div>
      </div>
    </div>
  )
}

export default RightContainer