const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// DB Import
const Register = require("../../scemas/registration");

const UpdateprofileData = require("../../scemas/profileinfo");
const accessTokenSecret = "NOTESAPI";
router.post("/api/register", async (req, res) => {

  try {
    const emailRegex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
    const phoneNumRegex =
      /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
    const usernameRegex = /^[a-z0-9_-]{3,16}$/;
    const email = req.body.email;
    const phoneNum = req.body.phone;
    const userName = req.body.username;
    if (!userName.match(usernameRegex)) {
      res.status(200).json({
        sucessStatus: false,
        data: `Please enter valid user name containing spacial character `,
      });
    }
    if (!email.match(emailRegex)) {
      res.status(200).json({
        sucessStatus: false,
        data: `Please enter valid email ID`,
      });
    }
    if (!phoneNum.match(phoneNumRegex)) {
      res.status(200).json({
        sucessStatus: false,
        data: `Please enter valid Phone number`,
      });
    } else {
      const getEmail = await Register.findOne(
        { email: req.body.email },
        { email: 1 }
      );
      const username = await Register.findOne(
        { username: req.body.username },
        { username: 1 }
      );
      const phone = await Register.findOne(
        { phone: req.body.phone },
        { phone: 1 }
      );
      if (getEmail !== null || username !== null || phone !== null) {
        if (username !== null) {
          res.status(200).json({
            sucessStatus: false,
            error: "username is already exist",
          });
          return false;
        }

        if (getEmail !== null) {
          res.status(200).json({
            sucessStatus: false,
            error: "Email is already exist",
          });
          return false;
        }

        if (phone !== null) {
          res.status(200).json({
            sucessStatus: false,
            error: "Phone Number is already exist",
          });
          return false;
        }
      } else {
        const registerUsers = new Register({
          name: req.body.name.toLowerCase(),
          username: req.body.username.toLowerCase(),
          email: req.body.email,
          phone: req.body.phone,
          usertype: req.body.usertype,
          companyname: req.body.companyname,
          password: req.body.password,
        });
        const updateprofileData = new UpdateprofileData({
          name: req.body.name.toLowerCase(),
          username: req.body.username.toLowerCase(),
          companyinfo: req.body.companyname,
        });
        const pdata = await updateprofileData.save();
        const userData = await registerUsers.save();

        const accessToken = jwt.sign(
          { username: userData.username, id: userData._id },
          accessTokenSecret,
          {
            expiresIn: "5m", // expires in 24 hours
          }
        );
        res.cookie("token", accessToken, {
          maxAge: 1 * 3600 * 1000,
          httpOnly: true,
          path: "",
          sameSite: "none",
          secure: false,
        }); // maxAge: 2 hours
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header("Access-Control-Allow-Credentials", true);
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.status(200).json({
          sucessStatus: true,
          data: `Hi! ${userData.name} Sucessfully Registerd`,
        });
      }
    }
  } catch (error) {
    res.status(200).json({
      sucessStatus: false,
      data: `Something Went Wrong while connecting with servies`,
    });
  }
});

module.exports = router;
