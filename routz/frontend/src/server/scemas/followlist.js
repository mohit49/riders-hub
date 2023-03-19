const mongoose = require("mongoose");

const followList = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  followersnames: {
    type: Array,
    required: true,
  },
});

const FollowList = new mongoose.model("Followlist", followList);
module.exports = FollowList;
