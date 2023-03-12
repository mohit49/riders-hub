const express = require("express");
const router = express.Router();
const UploadPosts = require("../../scemas/uploadPosts.js");
// DB Import

var multer = require("multer");
var fs = require("fs");
const Register = require("../../scemas/registration");
const authenticateJWT = require("../../middleware/auth");
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    var path;
    path = `./images/${req.userId}/posts/${req.body.postType}`;

    fs.mkdirSync(path, { recursive: true });
    return cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + req.userId + '_' + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });
var currentdate = new Date(); 
var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
router.post(
  "/addPosts",
  authenticateJWT,
  upload.any("uploadImages"),
  async (req, res, next) => {
    if (req.files?.length > 0) {
      const userDetails = await Register.findOne(
        { _id: req.userId },
        { password: 0 }
      );
  
      const uploadPosts = new UploadPosts({
        postpics: req.files,
        postType: req.body.postType,
        authorid: req.userId,
        authorinfo: userDetails,
        posttitle: req.body.postTitle,
        timestamp : datetime,
        postdiscription:req.body.postData
      });
      const postData = await uploadPosts.save();
      res.status(200).json({
        sucessStatus: true,
        data: postData,
      });
    } else {
      const userDetails = await Register.findOne(
        { _id: req.userId },
        { password: 0 }
      );
     
      const uploadPosts = new UploadPosts({
        postType: req.body.postType,
        authorid: req.userId,
        authorinfo: userDetails,
        posttitle: req.body.postTitle,
        timestamp : datetime,
        postdiscription:req.body.postData
      });
      const postData = await uploadPosts.save();
      res.status(200).json({
        sucessStatus: true,
        data: postData,
      });
    }
  }
);

module.exports = router;
