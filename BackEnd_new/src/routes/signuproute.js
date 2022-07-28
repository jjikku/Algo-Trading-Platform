const express = require("express");
const jwt = require("jsonwebtoken");
const signupRouter = express.Router();
const signupModel = require("../model/signup.model")
//const user = require("../data/user");


// app.post("/signup", (req,res) => {
//   res.send(JSON.stringify(req.body));
// }); 

signupRouter.post("/", function (req, res) {
  var newuser = {
    fname:req.body.signup.fname,
    lname:req.body.signup.lname,
    email:req.body.signup.email,
    pwd:req.body.signup.pwd
   };
  console.log("signup route")
  console.log(newuser.email);
  signupModel.findOne({ "email": newuser.email }, (error,user) => {
    console.log("error="+error);
    console.log("user="+user);
      if(error)
      {
        console.log(error);
      }
      else if(user)
      {
        console.log("user exists");
        res.json({status:false});
      }
      else
      {
        var signup = new signupModel(newuser);
        signup.save((error,newuser) => {
          console.log("saved");
          console.log("error= " + error);
          console.log("new user=" + newuser);
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
  
  //res.send(JSON.stringify(req.body));
});

module.exports = signupRouter;
