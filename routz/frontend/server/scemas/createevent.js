const mongoose = require("mongoose");

const info = new mongoose.Schema({
  createrid: {
    type: String,
    required: true,
  },
  creatorname: {
    type: String,
    required: true,
  },
  creatorusername: {
    type: String,
    required: true,
  },
  creatorcompany:{
    type: String,
  },
  eventtitle: {
    type: String,
  },
  eventdiscription: {
    type: String,
  },
  eventSubheading:{
    type: String,
  },
  eventduration: {
    type: Object,
  },
  city: {
    type: Object,
  },
  state: {
    type: Object,
  },
  eventcoverpic: {
    type: Object,
  }
 
});

const createeventInfo = new mongoose.model("Createevent", info);
module.exports = createeventInfo;
