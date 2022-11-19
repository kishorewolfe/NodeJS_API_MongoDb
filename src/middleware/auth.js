const { response } = require("express")
const jwt = require("jsonwebtoken")
const User = require('../../models/user')

const auth = async (req,res,next)=>{
    console.log("MIDDLEWARE WORKED!")
    try{
        const token = req.header("Authorization").replace('Bearer ','')
        const decoded = jwt.verify(token,"thistoken")
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})
        req.user=user 
        next()

    }
    catch(e){
        res.send(401).sendStatus({error:"Authentication failes"})

    }
}

module.exports=auth