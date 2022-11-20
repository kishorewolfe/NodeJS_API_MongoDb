const nodemailer = require('nodemailer')

const testAccount ={
    user:"email",
    pass:"pass"
}
let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },  tls : { rejectUnauthorized: false }
  });




 const sendWelcomeMail =(email,name)=>{
    var composemail = {
        from:"email",
        to:`${email}`,
        subject:"HI TEST MAIL",
       text:`Welcome Mr.${name},Thanks For subscribing`
    }
    transporter.sendMail(composemail,function(error,info){
        if(error){
            console.log("ERROR",error)
        }
        else{
            console.log(info)
        }
    })

}
 const accCanceleMail =(email,name)=>{
    var composemail = {
        from:"mail",
        to:`${email}`,
        subject:"HI TEST MAIL",
       text:`GoodBye Mr.${name},Thanks For subscribing,Wish you all success`
    }
    transporter.sendMail(composemail,function(error,info){
        if(error){
            console.log("ERROR",error)
        }
        else{
            console.log(info)
        }
    })

}

module.exports = {
    sendWelcomeMail,
    accCanceleMail
}
