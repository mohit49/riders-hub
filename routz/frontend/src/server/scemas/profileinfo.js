const mongoose = require("mongoose");

const info = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  bikeinfo: {
    type: String,
  },
  companyinfo: {
    type: String,
  },
  about: {
    type: String,
  },
  followers: {
    type: String,
  },
  kms: {
    type: String,
  },
  profilepic: {
    type: Object,
  },
  ridingsince: {
    type: String,
  },
  coverpic: {
    type: Object,
  },
  location: {
    type: Object,
  },
  intro: {
    type: String,
  },
});

const Profileinfo = new mongoose.model("Profileinfo", info);
module.exports = Profileinfo;
