import React, {useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import GetLocation from '../GetLocation';
const EditProfileApi = process.env.REACT_BASE_API_URL + process.env.REACT_APP_EDIT_PROFILE
function EditInfo({distance,location,bikeInfo,setUpdateProfileStatus, resIntro, handleCloseModal}) {
    const getLocation = GetLocation()
    const [loading, setLoading] = useState();
    const [authToken, setAuthToken] = useState();
    const [geolocation, setGeolocation] = useState(true);
    const [position, setPosition] = useState();
    const [bikeName, setBikeName] = useState();
    const [profilesucess, setProfilesucess] = useState(false);
    const [distanceCoverd, setdistanceCoverd] = useState();
    const [intro, setIntro] = useState();
const checkGeolocation =  () =>{
     if(!geolocation) {
       
    setGeolocation(true)
    } else {
        setLoading(true)
        getLocation()
        .then((position) => {
            setLoading(false)
            setPosition(position)
        })
        .catch((err) => {
          
        });
        setGeolocation(false)
    }

}

const updateProfile = (e)  =>{
 e.preventDefault();
 setProfilesucess(true);
const city = position?.city;
const state = position?.state;
const country = position?.country;
console.log(bikeName, distanceCoverd)

axios.post(EditProfileApi, {
  bikeinfo: bikeName,
  kms: distanceCoverd,
  location: position,
  intro: intro
},
  { withCredentials: true })
        .then(function (response) {
          setUpdateProfileStatus(true);
          handleCloseModal();
          setProfilesucess(false);
        });

}

   





  return (
    <Form>
      {profilesucess && <Spinner style={{color: "#0d6efd"}} as="span" animation="grow" size="lg" role="status" aria-hidden="true"/>}
      {!profilesucess && <>
        <Form.Group className="mb-3" controlId="formBikeName">
        <Form.Label>Your introduction</Form.Label>
        <Form.Control as="textarea" rows={3}  value={intro } defaultValue={resIntro}  onChange={(e)=>setIntro(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBikeName">
        <Form.Label>Bike Name</Form.Label>
        <Form.Control type="text" placeholder="Bike Name" value={bikeName ? bikeName : bikeInfo } onChange={(e)=>setBikeName(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDistabceCoverd">
      <Form.Label>Distance Covered</Form.Label>
        <Form.Control type="text" placeholder="Distance Coverd" value={distanceCoverd ? distanceCoverd : distance}  onChange={(e)=>setdistanceCoverd(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCity">
      <Form.Check 
        type="switch"
        id="custom-switch"
        label="Use Current Location"
        onChange={checkGeolocation}
      />
</Form.Group>
      {geolocation && 
      <Form.Group className="mb-3" controlId="formBasicCity">
      <Form.Label>Location</Form.Label>
        <Form.Control type="text" placeholder="State" />
      </Form.Group>
   }
     {!geolocation && 
    
     <Form.Group className="mb-3" controlId="formBikeName">
        <Form.Label>Current Location  {loading && <Spinner style={{color: "#0d6efd"}} as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"/> }</Form.Label>
       
        {!loading && <Form.Control type="text" value={`${position?.city} , ${position?.state}, ${position?.country}`} placeholder="Fetching Location..." /> }
      </Form.Group>
}

      
      <Button variant="primary" type="submit" onClick={updateProfile}>
        Submit
      </Button>
      </>
      }
     
    </Form>
  )
}

export default EditInfo