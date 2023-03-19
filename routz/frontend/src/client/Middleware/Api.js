import React from 'react'
import { axios } from 'axios';
function ApiRequest(request,method,data) {
let apiURl;
const loginAPI =  process.env.REACT_BASE_API_URL + process.env.REACT_APP_LOGIN_API;


axios[method](loginAPI, {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export default ApiRequest