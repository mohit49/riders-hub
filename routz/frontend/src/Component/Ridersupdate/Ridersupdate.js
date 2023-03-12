import axios from 'axios';
import React,{useContext, useEffect, useState} from 'react'
import { Container ,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../Ridersupdate/Ridersupdate.scss'
import { Data } from "../../App";
import { Card } from 'antd';

import { LinkContainer } from 'react-router-bootstrap';

const { Meta } = Card;
const ShowroomsApi =  process.env.REACT_BASE_API_URL +  process.env.REACT_APP_SHOWROOMS;
function Ridersupdate() {
    const [cityShowRooms, setCityShowRooms] = useState();
    const [loader, setLoader] = useState();
    const [error, setError] = useState();
    const { userPosition } = useContext(Data);

    useEffect(()=>{
        if(userPosition?.city?.length > 0 ) {
            axios.get(ShowroomsApi + "/?limit=15&index=0&city=" + userPosition?.city).then(function (response) {
   
                if (response.data.sucessStatus) {
                  setError(false);
                  setLoader(false);
                  setCityShowRooms(response.data.data)
                } else {
                  setError(true);
                  setLoader(false);
                }
              });
        } else if (!(typeof userPosition === 'undefined') && userPosition == false) {
              axios.get(ShowroomsApi + "/?limit=15&index=0").then(function (response) {
   
                if (response.data.sucessStatus) {
                  setError(false);
                  setLoader(false);
                  setCityShowRooms(response.data.data)
                } else {
                  setError(true);
                  setLoader(false);
                }
              });
        }
     
    },[userPosition?.city])
   

  return (
    <div className='riders-update'>
    <Container>
        <h3><span>Top Showrooms in your area</span> <Link>View All</Link></h3>
<div className='card-container-showrooms'>
    <div className='card-container-showrooms-ul'>
       
            {cityShowRooms && Object.values(cityShowRooms).map((ele,index) =>
             <div className='card-container-showrooms-list '   key={index}>
                <Card
              
                cover={
                  <img
                    alt='example'
                    src={
                      process.env.REACT_BASE_API_URL +
                      ele.more[0].profilepic?.destination +
                      "/" +
                      ele.more[0].profilepic?.filename
                    }
                  />
                }>
                <h4>{ele.name}</h4>
                <p className='organizer'>{ele.phone}</p>
                <p className='organizer'>{ele.email}</p>
                <p className='city'>{ele?.more[0]?.location?.city} {ele?.more[0]?.location?.state}</p>
               
                <hr />
              
                <LinkContainer to={`showrooms/${ele._id}`}>
                  <Button
                    variant='primary'
                    size='md'
                    className='buttonCard'>
                    View Now
                  </Button>
                </LinkContainer>
              </Card>
              </div>
            )




            }

      
    </div>
</div>
        </Container>   
    </div>
  )
}

export default Ridersupdate