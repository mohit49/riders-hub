import React ,{useState} from 'react'
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyBVYCFCEYRhy-qNRq5G62ngBzHaprwsLqA");
Geocode.setLocationType("ROOFTOP");
const GetLocation =  () => {
    var selCity,selState,selCountry;
  
  const proms = ()=> new Promise(function (resolve, reject) {
    
    navigator.geolocation.getCurrentPosition((position) => {
        var lat = position.coords.latitude;
        var long = position.coords.longitude

        Geocode.fromLatLng(lat, long).then(
            (response) => {
                const address = response.results[0].formatted_address;
              
                for (let i = 0; i < response.results[0].address_components.length; i++) {
                  for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                    switch (response.results[0].address_components[i].types[j]) {
                      case "locality":
                        selCity = response.results[0].address_components[i].long_name;
                        break;
                      case "administrative_area_level_1":
                        selState = response.results[0].address_components[i].long_name;
                        break;
                      case "country":
                        selCountry = response.results[0].address_components[i].long_name;
                        break;
                    }
                  }
                } 
                return resolve({
                    city : selCity,
                    state:selState,
                    country: selCountry,
      
                  }) 
              
            },
            (error) => {
                reject(error);
            }
          );
        
      })

      
      });

      return proms
}

export default GetLocation

