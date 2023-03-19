import React, { Component } from "react";
import { Carousel } from "antd";

const Slickslider = ({ settings, data }) => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <Carousel {...settings} afterChange={onChange}>
      {Object.values(data).map((itemsVal, index) => {
        return <div key={index}  className='item-con'>
          <div className="post-contnet">
            <p>{itemsVal?.authorinfo?.name} ({itemsVal?.authorinfo?.username})</p>
            <p>{itemsVal?.authorinfo?.usertype} </p>
          </div>
          <div className="item-img">
<img src={process.env.REACT_BASE_API_URL  + itemsVal.postpics[0].destination+'/'+ itemsVal?.postpics[0]?.filename}/>
        </div>
        </div>
      })}
      
    </Carousel>
  );
};
export default Slickslider;
