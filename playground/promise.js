require('../src/db/db')
const Task = require('../models/task')

Task.findByIdAndUpdate('634829641c83fb0a09c3b28f',{completed:true}).then((user)=>{
    return Task.countDocuments({completed:true})
}).then((result)=>{
    console.log(result)
})
