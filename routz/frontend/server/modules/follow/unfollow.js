const express = require("express");
const router = express.Router();
// DB Import
const Register = require("../../scemas/registration");
const FollowList = require("../../scemas/followlist");
const authenticateJWT = require("../../middleware/auth");

router.post("/unfollow", authenticateJWT, async (req, res) => {
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

    if (
      fetchFollowList !== null &&
      fetchFollowList["followersnames"].length > 0
    ) {
      const checkUserExist =
        fetchFollowList["followersnames"].indexOf(followingUserName);
      fetchFollowList["followersnames"] = fetchFollowList[
        "followersnames"
      ].splice(checkUserExist, fetchFollowList["followersnames"]);
      const getData = await FollowList.updateOne({
        username: usernameFetch.username,
        followersnames: fetchFollowList["followersnames"],
      });

      res.status(200).json({
        sucessStatus: true,
        data: `You have unfollowed ${followingUserName}`,
      });
    } else {
      res.status(200).json({
        sucessStatus: false,
        data: `You already unFollowed ${followingUserName}`,
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
