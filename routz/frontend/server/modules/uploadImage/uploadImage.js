const express = require("express");
const router = express.Router();
// DB Import

var multer  = require('multer')
var fs = require('fs');

const fileStorageEngine = multer.diskStorage({
  destination:(req,file,cb) =>{
    var path;


      path = `./images/${file.originalname.split('.')[0]}/events`
    
 
   
    fs.mkdirSync(path, { recursive: true })
    return cb(null, path)
},
filename:(req,file,cb) =>{
    cb(null,Date.now() + '_' + file.originalname)
}
});
const upload = multer({storage: fileStorageEngine});
router.post("/uploadpostImage/:files", upload.single('image'),  async (req, res, next) => {




});

module.exports = router;
