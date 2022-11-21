const { default: mongoose } = require('mongoose')
const request = require('supertest')
const app = require('../app')
const jwt = require("jsonwebtoken")
const User = require('../models/user')
const userID = new mongoose.Types.ObjectId()
const userValue ={
    _id:userID,
    name:"Test3",
age:23,
completed:true,
email:"test6@gmail.com",
password:"test6",
tokens:[{
    token: jwt.sign({_id:userID.toString()},"thistoken")

}]
}
beforeEach(async()=>{
    await User.deleteMany()
    await new User(userValue).save()
})
test("TESTING Login USERTASK",async()=>{
    await request(app).post("/usertasks/login").send({
email:"test6@gmail.com",
password:"test6"
    }).expect(200)
})

test("TESTING Failed Login  USERTASK",async()=>{
    await request(app).post("/usertasks/login").send({
email:"test6@gmail.com",
password:"failedVal"
    }).expect(400)
})

test("TESTING AUTH",async()=>{
    await request(app).get("/usertasks/me")
    .set('Authorization',`Bearer ${userValue.tokens[0].token}`)
    .send()
    .expect(200)
})