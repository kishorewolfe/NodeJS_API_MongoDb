const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
 const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true

    },
    completed:{
        type:Boolean,
        required:true

    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        trim:true,
        required:true

    },

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],    
    avatar:{
        type:Buffer,
        
    }

    
},{
    timestamps:true
})
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})
userSchema.methods.generateAuthToken = async function(){
    const user = this 
    const token = await jwt.sign({_id:user.id.toString()},"thistoken")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.methods.toJSON = function(){
    const user = this
    const publicUser = user.toObject()
    delete publicUser.tokens
    delete publicUser.password
    return publicUser
}
userSchema.statics.findByCredentials = async(email,password)=>{
    const user = await User.findOne({email})
    if(!user){
            throw new Error("USER NOT FOUND")
        }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("PASSSWORD Worng")
    }
    return user

}
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8)
    }
    next()
})
const User = mongoose.model('usertasks',userSchema)
module.exports = User