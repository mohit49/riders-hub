const express = require("express");
const router = express.Router();
// DB Import
const Register = require("../../scemas/registration");
const FollowList = require("../../scemas/followlist");
const authenticateJWT = require("../../middleware/auth");

router.post("/api/follow", authenticateJWT, async (req, res) => {
  const followList = [];
  const usernameFetch = await Register.findOne(
    { _id: req.userId },
    { username: 1 }
  );
  const followingUserName = req.body.username;
  const followerExist = await Register.findOne(
    { username: followingUserName },
    { username: 1 }
  );
  if (followerExist !== null) {
    const fetchFollowList = await FollowList.findOne(
      { username: usernameFetch.username },
      { followersnames: 1 }
    );
    if (fetchFollowList !== null) {
      const checkUserExist = fetchFollowList["followersnames"].filter(
        (ele, index) => ele == followingUserName
      );

      if (checkUserExist.length > 0) {
        res.status(200).json({
          sucessStatus: false,
          data: `You have already followed ${followingUserName}`,
        });
      } else {
        const fetchList = fetchFollowList["followersnames"];
        fetchList.push(followingUserName);
        const getData = await FollowList.updateOne({
          username: usernameFetch.username,
          followersnames: fetchList,
        });
        res.status(200).json({
          sucessStatus: true,
          data: `You Followed ${followingUserName}`,
        });
      }
    } else {
      followList.push(req.body.username);
      const followlist = new FollowList({
        username: usernameFetch.username,
        followersnames: followList,
      });
      const userData = await followlist.save();
      res.status(200).json({
        sucessStatus: true,
        data: `You Followed ${followingUserName}`,
      });
    }
  } else {
    res.status(200).json({
      sucessStatus: false,
      data: `Somthing went wrong! may be the user you are trying is not available `,
    });
  }
});

module.exports = router;
