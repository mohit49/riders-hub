const express = require("express");
const router = express.Router();
// DB Import
const Register = require("../../scemas/registration");

const authenticateJWT = require("../../middleware/auth");

router.get("/users", authenticateJWT, async (req, res) => {
  const username = await Register.findOne({ _id: req.userId }, { username: 1 });
  res.status(200).json({
    sucessStatus: username,
    data: `fetch Page`,
  });
});

module.exports = router;
