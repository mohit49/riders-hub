import path from 'path';
import fs from 'fs';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../src/App';


import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

const appReact = App;

const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("./db/db");
const { createProxyMiddleware } = require("http-proxy-middleware");

const cors = require("cors");
const https = require("https");
const router = express.Router()

app.use('/images', express.static(path.join(__dirname, 'images')))
//const bodyParser = require('body-parser');
const http = require("http").Server(app);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "500mb" }));
//app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser());

const serverRenderer = (req, res, next) => {
  
  fs.readFile(path.resolve('../dist/index.html'), 'utf8', (err, data) => {
    console.log(data)
    let html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    );
    console.log(html);
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      )
    )
  })
}
router.use('^/$', serverRenderer)

router.use(
  express.static(path.resolve(__dirname, '..', 'dist'), { maxAge: '30d' })
)

// tell the app to use the above rules
app.use(router)

app.use(express.static('../dist'))
/**
 * Api require Modules Name
 * @type {string}
 */
app.use(express.static(__dirname + '/images'));
const registerPage = require("./modules/registration/registration");
app.post("/api/register", registerPage);

const loginPage = require("./modules/login/login");
app.post("/api/login", loginPage);

const users = require("./modules/users/users");
app.get("/api/users", users);
const editprofile = require("./modules/editprofile/editprofile");
app.post("/api/editprofile", editprofile);

const createevent = require("./modules/createevent/createevent");
app.post("/api/createevent", createevent);

const viewevent = require("./modules/createevent/fetchEvent");
const searchEvent = require("./modules/createevent/viewEvents");
app.get("/api/viewevent/search", searchEvent);
app.get("/api/viewevent/:eventName", viewevent);



const followers = require("./modules/follow/follow");
app.post("/api/follow", followers);
const unfollow = require("./modules/follow/unfollow");
app.post("/api/unfollow", unfollow);
const getProfile = require("./modules/editprofile/fetchprofile");
app.get("/api/profile", getProfile);
const viewProfile = require("./modules/editprofile/viewProfile");
app.get("/api/profile/:username", viewProfile);

const posts = require("./modules/posts/fetchPosts");
app.get("/api/posts", posts);


const showrooms = require("./modules/showrooms/searchshowrooms");
app.get("/api/showrooms", showrooms);

const uploadpostImage = require("./modules/uploadImage/uploadImage");
app.post("/api/uploadpostImage", uploadpostImage);
const addPosts = require("./modules/posts/addPosts");
app.post("/api/addPosts", addPosts);

const searchBar = require("./modules/search-bar/search-bar");
app.get("/api/search-bar", searchBar);
http.listen(3004, function () {
  console.log("listening on *:4000");
});