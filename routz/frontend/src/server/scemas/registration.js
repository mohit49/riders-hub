const mongoose = require('mongoose');

const users = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    companyname : {
        type:String,
        
    },
    phone : {
        type:String,
        required:true
    },
    usertype : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    }

})

const Register = new mongoose.model("Registration",users);
module.exports = Register;