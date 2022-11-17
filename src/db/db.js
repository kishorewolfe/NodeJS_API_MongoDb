const mongoose = require('mongoose')
const validator =  require('validator')
mongoose.connect('mongodb://localhost:27017/apidbkish',{
    useNewUrlParser:true
})


//mongoose import
//create mongoose model
//assign it new data
//save.then.catch