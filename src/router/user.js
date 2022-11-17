

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const router = new express.Router
const auth = require("../middleware/auth")

const bcrypt = require('bcryptjs')
const { default: mongoose } = require('mongoose')
router.get('/usertasks',auth,(req,res)=>{
    User.find({}).then((taks)=>{
        res.send(taks)
    })
})
router.get('/usertasks/me',auth,(req,res)=>{
        res.send(req.user)
    
})



//findByCredentials

router.post('/usertasks/login',async(req,res)=>{
    try{
        console.log("LOGIN")

        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await  user.generateAuthToken() 
        res.send({user,token}).status(200)
    }
    catch(e){
        console.log("error",e)
    }
})
router.post("/usertasks/logout",auth,async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            console.log("LOGOUT")
           return  token.token!==req.token
        })
        await req.user.save()
        res.send()

    }
    catch(e){
        res.send(e).status(500)
    }

})
router.post("/usertasks/logoutall",auth,async (req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch(e){
        res.send(e).status(500)
    }

})
router.patch('/usertasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
 

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const user = await User.findById(req.params.id)
        console.log(req.body,user)
        updates.forEach((update)=>{
            user[update]=req.body[update]
            
        })
        await user.save()

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.post('/usertasks',async  (req, res) => {
    const stud = new User(req.body);

    try{

    await stud.save()
    const token =await  stud.generateAuthToken()
        res.send({stud,token})
    
    }
    catch(err){
        res.send(err).status(404)
    }
  
})
router.delete('/usertasks/:id',async(req,res)=>{
    try{
        const del_user = await User.findByIdAndDelete(req.params.id)
        if(!del_user){
            return res.status(404).send()
        }
        res.status(200).send(del_user)

    }
    catch(e){
        res.status(500)

    }
})

module.exports = router