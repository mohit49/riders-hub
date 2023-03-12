const express = require("express");
const router = express.Router();

// DB Import
const Createevent = require("../../scemas/createevent");

const authenticateJWT = require("../../middleware/auth");

router.get("/api/viewevent/:eventName", async (req, res) => {

    if( !req.params.eventName.includes('search')) {
      const getEvent = await Createevent.findOne({ _id: req.params.eventName });

      res.status(200).json({
        sucessStatus: true,
        data: getEvent,
      });
    }
 


});









module.exports = router;

