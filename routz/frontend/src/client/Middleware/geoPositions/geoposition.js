import React from 'react'
import GetLocation from '../GetLocation';
function geoposition() {
    const getLocation = GetLocation();
    getLocation()
           .then((position) => {
              
               return position
           })
           .catch((err) => {
            return err
           });
        }
   
   




export default geoposition