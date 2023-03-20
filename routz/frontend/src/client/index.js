
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { hydrateRoot } from 'react-dom/client';
import App from "./App";


const rootNode = document.getElementById('root');
const root = ReactDOM.hydrateRoot(rootNode, <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter></React.StrictMode>);


