const express = require("express");
const app = express();
const multer = require('multer');
require("./src/db/db");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./src/router/user");
const taskRouter = require("./src/router/task");
const jwt = require('jsonwebtoken')
const port = process.env.PORT;
app.use(express.json());
// app.use((req,res,next)=>{
//   if(req.method==='GET'){
//     res.send("GET IS NOT AVAIBLE").sendStatus(503)
//     console.log("GET")

//   }
//   else{
//     next()
//   }
// })

const upload = multer({
  dest:'images',
  limits:{
    fileSize:100000000
  },
  fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(doc|docx)$/)){
        return cb(new Error("Please upload Docx"))
    }
    else{
      console.log(file)
    }
    cb(undefined,true)

    
  }
})
app.post('/upload',upload.single('upload'),(req,res)=>{
  res.send();
  console.log(res)
},(error,req,res,next)=>{
  res.status(400).send({message:error.message})
})
app.use(userRouter);
app.use(taskRouter);




app.listen(port, (req, res) => {
  console.log("The event is listening" + port);
});

const main =async ()=>{
  const user = await User.findById('636bc8460e4e86cd74d3e75b')
  await user.populate('tasks')

}

main()