const querystring = require("querystring");
const express = require("express");
const router = express.Router();

// DB Import
const Createevent = require("../../scemas/createevent");
const RegisterData = require("../../scemas/registration");
const profileInfo = require("../../scemas/profileinfo");
const authenticateJWT = require("../../middleware/auth");

router.get("/showrooms", async (req, res) => {
  const limit = Number(req.query?.limit);
  const state = req.query?.state;
  const city = req.query?.city;
  const queryIndex = Number(req.query?.index);
  const query = req.query?.query?.toLowerCase() || "";

if(city?.length > 0) {
  var profileSearch = await RegisterData.aggregate([
    {
      $match: {
        usertype: "company",
        $and: [
          {
            $or: [
              { name: { $regex: new RegExp(query, "i") } },
              { username: { $regex: new RegExp(query, "i") } },
            ],
          },
        ],
      },
    },
    { $skip: queryIndex ? queryIndex : 0},

    { $limit : limit ? limit : 0 },

    {
      $lookup: {
        from: `profileinfos`,
        localField: "username",
        foreignField: "username",
        as: "more",

      },
      
    },
    { $match : {
      $or: [{ 'more.location.city': city }],
            }
     },
    { $unset: "password" }
  ]);
}
else if(state?.length > 0) {
  var profileSearch = await RegisterData.aggregate([
    {
      $match: {
        usertype: "company",
        $and: [
          {
            $or: [
              { name: { $regex: new RegExp(query, "i") } },
              { username: { $regex: new RegExp(query, "i") } },
            ],
          },
        ],
      },
    },
    { $skip: queryIndex ? queryIndex : 0},

    { $limit : limit ? limit : 0 },

    {
      $lookup: {
        from: `profileinfos`,
        localField: "username",
        foreignField: "username",
        as: "more",

      },
      
    },
    { $match : {
      $and: [{$or:[{ 'more.location.state': state }],
            }]}
     },
    { $unset: "password" }
  ]);
} else if(!state?.length > 0 && !city?.length > 0)  {

  var profileSearch = await RegisterData.aggregate([
    {
      $match: {
        usertype: "company",
        $and: [
          {
            $or: [
              { name: { $regex: new RegExp(query, "i") } },
              { username: { $regex: new RegExp(query, "i") } },
            ],
          },
        ],
      },
    },
    { $skip: queryIndex ? queryIndex : 0},

    { $limit : limit ? limit : 0 },

    {
      $lookup: {
        from: `profileinfos`,
        localField: "username",
        foreignField: "username",
        as: "more",

      },
      
    },
    { $unset: "password" }
  ]);

}
  res.status(200).json({
    sucessStatus: true,
    data: profileSearch,
  });
});

module.exports = router;
