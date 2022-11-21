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


app.use(userRouter);
app.use(taskRouter);




app.listen(port, (req, res) => {
  console.log("The event is listening" + port);
});



module.exports=app