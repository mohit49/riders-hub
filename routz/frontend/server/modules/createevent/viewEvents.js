const querystring = require("querystring");
const express = require("express");
const router = express.Router();

// DB Import
const Createevent = require("../../scemas/createevent");

const authenticateJWT = require("../../middleware/auth");

router.get("/viewevent/search", async (req, res) => {
  const city = req.query?.city;
  const limit = req.query?.limit;
  const creatorId = req.query?.creatorId;
  const indexNo = req.query?.index;
  const query = req.query?.query || "";

  var dataQuery;
if (!city && !creatorId && !query) {

  Createevent.find({},
    function (err, data) {
      if(data) {
      res.json(data);
      } else {
      
      }
    }
  );

} else {

  Createevent.find(
    {
      $or: [
        {
          'creatorid': creatorId,
        },
        {
          "city.name": city,
        }
      ],
      'eventtitle': {
        $regex: new RegExp(query),
      }
      
    },
    function (err, data) {
      res.json(data);
    }
  )
    .limit(limit)
    .skip(indexNo);
}
});
module.exports = router;








