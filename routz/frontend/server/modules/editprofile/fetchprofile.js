const express = require("express");
const router = express.Router();
// DB Import
const Register = require("../../scemas/registration");
const Profileinfo = require("../../scemas/profileinfo");
const authenticateJWT = require("../../middleware/auth");

router.get("/api/profile", authenticateJWT, async (req, res) => {
  const username = await Register.findOne({ _id: req.userId }, { password: 0 });
  const userExist = await Profileinfo.findOne(
    { username: username.username },
    { password: 0 }
  );
  res.status(200).json({
    sucessStatus: true,
    data: userExist,
  });
});

module.exports = router;
