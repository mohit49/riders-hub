const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/routz',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
}).then(()=>{
    console.log('connection sucess')
}).catch((e)=>{
    console.log(e)
})
//mongodb://127.0.0.1:27017/routz


