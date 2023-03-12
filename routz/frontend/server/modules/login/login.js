const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// DB Import
const Register = require("../../scemas/registration");

const accessTokenSecret = "NOTESAPI";
router.post("/login", async (req, res) => {
  try {
    let data;
    const getEmail = await Register.findOne(
      { email: req.body.username },
      { email: 1 }
    );

    const username = await Register.findOne(
      { username: req.body.username },
      { username: 1 }
    );
    const phone = await Register.findOne(
      { phone: req.body.username },
      { phone: 1 }
    );
    if (getEmail !== null || username !== null || phone !== null) {
      if (username !== null) {
        data = "username";
      }
      if (getEmail !== null) {
        data = "email";
      }
      if (phone !== null) {
        data = "phone";
      }
      const fetchD = await Register.findOne(
        { [data]: req.body.username },
        { password: 1 }
      );

      if (fetchD.password === req.body.password) {
        const userdata = await Register.findOne(
          { [data]: req.body.username },
          { password: 0 }
        );
        let token;
        const accessToken = jwt.sign(
          { username: userdata.username, id: userdata._id },
          accessTokenSecret,
          {
            expiresIn: "15m", // expires in 24 hours
          }
        );
        res.cookie("token", accessToken, {
          maxAge: 2 * 3600 * 1000,
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
          data: userdata,
          authToken: accessToken,
        });
      } else {
        res.status(200).json({
          sucessStatus: false,
          data: `Please enter the correct Password`,
        });
      }
    } else {
      res.status(200).json({
        sucessStatus: false,
        data: `Please enter the correct User Name, Email, or Phone no`,
      });
    }
  } catch (error) {
    res.status(200).json({
      sucessStatus: false,
      data: `Something Went Wrong while connecting with servies`,
    });
  }
});

module.exports = router;
