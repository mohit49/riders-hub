const querystring = require("querystring");
const express = require("express");
const router = express.Router();

// DB Import
const Createevent = require("../../scemas/createevent");
const RegisterData = require("../../scemas/registration");
const authenticateJWT = require("../../middleware/auth");

router.get("/search-bar", async (req, res) => {
  const searchtype = req.query?.searchtype;
  const limit = Number(req.query?.limit);
  const queryIndex = 0;
  const query = req.query?.query?.toLowerCase() || "";
  const state = req.query?.state || "";
  const city = req.query?.city || "";

  var searchArray = { resultBikers: {}, resultEvents: {} };
if(state.length > 0 && city.length > 0) {
   var profileSearch = await RegisterData.aggregate([
      {
        $match: {
          usertype: "biker",
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
       { $match : {
        $and: [{$or:[{ 'more.location.city': city }],
              }]}
       },
      { $unset: "password" }
    ]);
  } else if(state.length > 0){
   
    var profileSearch = await RegisterData.aggregate([
      {
        $match: {
          usertype: "biker",
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
  } else if(city.length > 0) {
    var profileSearch = await RegisterData.aggregate([
      {
        $match: {
          usertype: "biker",
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
    
  
      {
        $lookup: {
          from: `profileinfos`,
          localField: "username",
          foreignField: "username",
          as: "more",
  
        },
        
      },
     
       { $match : {
        $and: [{$or:[{ 'more.location.city': city }],
              }]}
       },
       { $skip: queryIndex ? queryIndex : 0},
  
       { $limit : limit ? limit : 0 },
      { $unset: "password" }
    ]);
  }
  
  else {
    var profileSearch = await RegisterData.aggregate([
      {
        $match: {
          usertype: "biker",
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

  var eventResultSearch = await Createevent.find({
    $and: [
      {
        $or: [
          { eventtitle: { $regex: new RegExp(query) } },
          { creatorname: { $regex: new RegExp(query) } },
        ],
      },
    ],
  })
    .limit(limit)
    .skip(queryIndex);
  if (searchtype?.includes(",")) {
    var searchTypeArray = searchtype.split(",");
    if (searchTypeArray.indexOf("biker") > -1) {
      searchArray.resultBikers = profileSearch;
    }
    if (searchTypeArray.indexOf("event") > -1) {
      searchArray.resultEvents = eventResultSearch;
    }
   
  } else if (searchtype?.length > 0) {

    if (searchtype == "biker") {
      searchArray.resultBikers = profileSearch;
   
    }
    if (searchtype == "event") {
      searchArray.resultEvents = eventResultSearch;
    }
 
  } else {

  }
  res.status(200).json({
    sucessStatus: true,
    data: searchArray,
  });
});

module.exports = router;
