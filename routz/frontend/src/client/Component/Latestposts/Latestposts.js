import React, { useEffect, useState } from "react";
import "../Latestposts/Latestposts.scss";
import { Container } from "react-bootstrap";
import Slickslider from "../../uiElements/Slickslider/Slickslider";
import axios from "axios";
import { Spinner } from "react-bootstrap";
const fetchposts =  process.env.REACT_BASE_API_URL +  process.env.REACT_APP_POSTS;
function Latestposts() {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(false);
  useEffect(() => {
    setLoader(true);
    axios
      .get(fetchposts + "/?limit=15&index=0&type=photos")
      .then(function (response) {
   
        if (response.data.sucessStatus) {
          setError(false);
          setLoader(false);
          setData(response.data.data)
        } else {
          setError(true);
          setLoader(false);
        }
      });
  },[]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable:true,
    responsive: [
        {
          breakpoint: 1800,
          settings: {
            slidesToShow: 4,
           
          }
        },
        {
            breakpoint: 1290,
            settings: {
              slidesToShow: 3,
             
            }
          },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };
  return (
    <div className="content-area-latest-posts">
        {error && <p>somthing went worng</p>}
        
        {(!error && !loader) &&  <Slickslider data={data} settings={settings} />}
        {(!error && loader) &&  <div className='loder_overlay'>
  <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>}
  
    </div>
  );
}

export default Latestposts;
