



import React from "react";
import { App } from "./App";
import "./App.scss";
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(  
  <StrictMode>
 <Router>
    <App />
    </Router>
    </StrictMode>
 , document.getElementById('root'));

