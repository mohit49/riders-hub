require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import { App } from "./App";
import "./App.scss";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";

ReactDOM.hydrate(  <BrowserRouter>
 <Router>
    <App />
    </Router>
  </BrowserRouter>, document.documentElement);

