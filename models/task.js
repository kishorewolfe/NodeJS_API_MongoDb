const mongoose = require('mongoose')
const User = require('../models/user')
const TaskScheme = new mongoose.Schema({
    taskname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:User
    }
},{
    timestamps:true
})
const Task = mongoose.model('Task',TaskScheme)
module.exports = Task