const express = require('express')
const Task = require('../../models/task')
const router = new express.Router
const auth = require("../middleware/auth")
 

router.post("/task", auth,async (req, res) => {
    const task = new Task({
      ...req.body,
      owner:req.user._id
    });
  
    try {
      await task.save();
      res.status(201).send(task);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  router.patch("/task/:id", async (req, res) => {
    try {
      const user = await Task.findByIdAndUpdate("6348549463a1460d761700db", {
        completed: true,
      });
      if (!user) {
        res.status(404);
      }
      res.send(user);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  router.delete("/taskview/:id", async (req, res) => {
    try {
      const del_user = await Task.findByIdAndDelete(req.params.id);
      if (!del_user) {
        return res.status(404).send();
      }
      res.status(200).send(del_user);
    } catch (e) {
      res.status(500);
    }
  });
  //{{url}}/tasks?completed=true
  //{{url}}/tasks?limit=2&skip=3
  router.get("/tasks",auth,async  (req, res) => {
      const match = {}
      const sort={}
  if (req.query.completed) {
      match.completed = req.query.completed === 'true'
  }

  if(req.query.sortby){
    const parts=req.query.sortby.split(':')
    sort[parts[0]]=parts[1]==='desc'?-1:1
  }
    try{
      await req.user.populate({
        path:'tasks',
        match,
        options:{
          limit:parseInt(req.query.limit),
          skip:parseInt(req.query.skip),
          sort
        }
      })
      res.send(req.user.tasks);
      console.log(match)

    }
    catch(e){
      res.status(500).send();
      console.log(match)


    }
  });

  // GET /tasks?completed=true
// router.get('/tasks', auth, async (req, res) => {


//   try {
//       await req.user.populate(
//        'tasks'
//       ).execPopulate()
//       res.send(req.user.tasks)
//   } catch (e) {
//       res.status(500).send()
//   }
// })

  
  router.get("/taskView/:id", (req, res) => {
    const _id = req.params.id;
    Task.findById(_id)
      .then((user) => {
        if (!user) {
          res.status(404);
        }
        res.status(200).send(user);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

module.exports=router