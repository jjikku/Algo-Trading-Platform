const express = require("express");
const jwt = require("jsonwebtoken");
const signupRouter = express.Router();
const signupModel = require("../model/signup.model")
var bcrypt = require('bcrypt');

//const user = require("../data/user");


// app.post("/signup", (req,res) => {
//   res.send(JSON.stringify(req.body));
// }); 

signupRouter.post("/", function (req, res) {
  var hashedPassword;

  bcrypt.genSalt(10, function (err, Salt) {
  
    // The bcrypt is used for encrypting password.
    bcrypt.hash(req.body.signup.pwd, Salt, function (err, hash) {
  
        if (err) {
            return console.log('Cannot encrypt');
        }
  
        hashedPassword = hash;
        console.log("hashed pwd = " + hash);
        var newuser = {
          fname:req.body.signup.fname,
          lname:req.body.signup.lname,
          email:req.body.signup.email,
          pwd:hashedPassword,
          blockstatus:0,
          userstatus:0,
          isAdmin:0
         };

         console.log("Signup Route")
         signupModel.findOne({ "email": newuser.email }, (error,user) => {
           console.log("error="+error);
           // console.log("user="+user);
             if(error)
             {
               console.log(error);
             }
             else if(user)
             {
               console.log("This Email Id Exists");
               res.json({status:false});
             }
             else
             {
               var signup = new signupModel(newuser);
               signup.save((error,newuser) => {
                 console.log("User Saved");
                 console.log("error= " + error);
                 console.log("New User=" + newuser);
                 if(error)
                 {
                   console.log(error);
                   res.json({status:true});
                 }
                 else
                 {
                   // let payload = {subject: newuser._id};
                   // let token = jwt.sign(payload,"secretkey");
                   res.json({status:true}).status(200);
       
                 }
               } 
               );
             }
         });
         
        
    })
});

  // var newuser = {
  //   fname:req.body.signup.fname,
  //   lname:req.body.signup.lname,
  //   email:req.body.signup.email,
  //   pwd:"1234",
  //   blockstatus:0,
  //   userstatus:0,
  //   isAdmin:0
  //  };
  
  //res.send(JSON.stringify(req.body));
});

module.exports = signupRouter;
