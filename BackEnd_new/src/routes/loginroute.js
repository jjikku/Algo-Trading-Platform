const express = require('express'); 
const loginRouter = express.Router();
const jwt = require("jsonwebtoken");
const users = require("../model/users.model");

loginRouter.post("/",function(req,res){
        
    var checkuser = {
           email:req.body.login.email,
           pwd:req.body.login.pwd
    };
    console.log("Login router");
     //console.log(checkuser);
     try{
        users.findOne({ "email": checkuser.email }, (error,user) => {
            if(error){
                console.log(error);
            }
            else{
                if(!user)
                {
                    //res.status(401).send("Invalid Email");
                    res.json({status:false});

                }
                else if(checkuser.pwd !== user.pwd) {
                    //res.status(401).send("Invalid Password");
                    res.json({status:false});
                }
                else{
                    let payload = {subject: user._id};
                    let token = jwt.sign(payload,"secretkey");
                    res.status(200).send({status:true,fname:user.fname,lname:user.lname,token});
                }
            }
        });
    }
       
        catch(e)
        {
            console.log("error");
            res.send(e);
        }

    });
    

module.exports = loginRouter;