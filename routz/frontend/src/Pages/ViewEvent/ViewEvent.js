import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../ViewEvent/ViewEvent.scss";
import { Spinner } from "react-bootstrap";
import { Routes, Route, useParams } from "react-router-dom";
import { BuildingOfficeIcon , UserIcon , CheckIcon , CalendarIcon} from "@heroicons/react/24/solid";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container, Button } from "react-bootstrap";
function ViewEvent() {
  const [oneApiCall , setOneApiCall] = useState(true) 
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState(false);

  const [eventDuration, setEventDuration] = useState();
  const ViewEventApi =
    process.env.REACT_BASE_API_URL + process.env.REACT_APP_VIEW_EVENT_API;
  // We can call useParams() here to get the params,
  // or in any child element as well!
  let { eventName } = useParams();

  const getDay = (data) =>{
    var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    var d = new Date(data);
    return days[d.getDay()];
  } 
  const getMonth =(data) =>{
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const d = new Date(data);
  return monthNames[d.getMonth()]; 
  }

  useEffect(() => {
    if(oneApiCall) {
 
    axios
      .get(
        ViewEventApi + "/" + eventName,
    
        {
          eventId: eventName,
        }
      )
      .then(function (response) {
        setOneApiCall(false)
        setLoading(false);
        setEventData(response.data.data);
     
        if(typeof(response.data.data.eventduration) == 'string') {
          var setDateFrom = JSON.parse(response.data.data.eventduration).From;
          var setDateTo = JSON.parse(response.data.data.eventduration).to;
          var dayFrom = getDay(setDateFrom);
          var dayTo = getDay(setDateTo);
          var monthTo =getMonth(setDateTo);
          var monthFrom =getMonth(setDateFrom);
          var setStartDate = dayFrom + ' ' + new Date(setDateFrom).getDate() + ' ' + monthFrom + ' ' + new Date(setDateFrom).getFullYear()
          var setEndDate = dayTo + ' ' + new Date(setDateTo).getDate() + ' ' + monthTo + ' ' + new Date(setDateTo).getFullYear()
          setEventDuration({'from':setStartDate, 'to' : setEndDate })
        
        } else {
          var setDateFrom = response.data.data.eventduration.From;
          var setDateTo = response.data.data.eventduration.to;
          var dayFrom = getDay(setDateFrom);
          var dayTo = getDay(setDateTo);
          var monthTo =getMonth(setDateTo);
          var monthFrom =getMonth(setDateFrom);
          var setStartDate = dayFrom + ' ' + new Date(setDateFrom).getDate() + ' ' + monthFrom + ' ' + new Date(setDateFrom).getFullYear()
          var setEndDate = dayTo + ' ' + new Date(setDateTo).getDate() + ' ' + monthTo + ' ' + new Date(setDateTo).getFullYear()
          setEventDuration({'from':setStartDate, 'to' : setEndDate })
        
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }, [oneApiCall]);

  return (
    <Container fluid className="p-0">
      {loading && (
        <div className='loading-con'>
          <Spinner
            style={{ color: "#0d6efd" }}
            as='span'
            animation='grow'
            size='lg'
            role='status'
            aria-hidden='true'
          />
        </div>
      )}
      {!loading && (
        <div className='event-container'>
          <div className="top-container">
         <div className="event-cover-pic">
          <div className="overlay"></div>
          <img src={ process.env.REACT_BASE_API_URL + eventData?.eventcoverpic?.destination.split('./')[1] + '/' + eventData?.eventcoverpic?.filename}/>
         </div>
         <div className="bannerInfo">
          <div className="banner-con">
          <p>Register Now</p>
          <h1>{eventData?.eventtitle}</h1>
          <p>{eventData?.eventSubheading}</p>
          <Button href="#">Apply Now</Button>
          </div>
         </div>
         </div>
         <div className="middleBadge">
          <div className="m-b-container">
        <div className='items'>
        <div className="box-badge">  <span>  <BuildingOfficeIcon class='h-6 w-6 text-blue-500' /></span><span><p>Organiser</p>
        <h4>{eventData?.creatorcompany}</h4></span>
        </div>
        </div>
       
        <div className='items'> <div className="box-badge"> <span>  <UserIcon class='h-6 w-6 text-blue-500' /></span><span><p>City</p>
        <h4> {eventData?.city ? eventData?.city?.name : 'unknown'}</h4></span>
        </div></div>
        <div className='items'>  <div className="box-badge"><span>  <CalendarIcon class='h-6 w-6 text-blue-500' /></span><span><p>Start Date</p>
        <h4> {eventDuration?.from}</h4></span>
        </div></div>
        <div className='items'> <div className="box-badge"><span>  <CalendarIcon class='h-6 w-6 text-blue-500' /></span><span><p>End Date</p>
        <h4> {eventDuration?.to}</h4></span>
        </div></div>
        </div>
      </div>
      <div className="bottomeText">
      <Col>
        <div className="box-badge textContent"   dangerouslySetInnerHTML={{__html: eventData?.eventdiscription}}> 
        </div>
        </Col>
       
          </div>
        </div>
       
      )}
    </Container>
  );
}

export default ViewEvent;
