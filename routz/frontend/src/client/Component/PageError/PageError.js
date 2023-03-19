import React from 'react'
import Banner3 from "../../assets/images/error.png";
import '../PageError/PageError.scss'
import Button from "react-bootstrap/Button";
function PageError({userId}) {
  return (
    <div className='error-con'>
        <div className='errorText'>
            <h2>OOPS!</h2>
            <h4>The User ID You loking for is not available</h4>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
            <Button as="button" variant="primary">
              Search Profile
            </Button>
        </div>

        <div className='image-container'> <img src={Banner3}/></div>
        
    </div>
  )
}

export default PageError