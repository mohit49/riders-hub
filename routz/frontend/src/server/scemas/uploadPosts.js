const mongoose = require("mongoose");

const info = new mongoose.Schema({
  authorid: {
    type: String,
    required: true,
  },
  authorinfo: {
    type: Object,
    required: true,
  },
  timestamp: {
    type: String,
  },
  postType : {
    type: String,
    required: true,
  },
  posttitle: {
    type: String,
  },
  postdiscription: {
    type: String,
  },
 locationposted: {
    type: Object,
  },
  postpics: {
    type: Object,
  }
 
});

const uploadPosts = new mongoose.model("UploadPosts", info);
module.exports = uploadPosts;
