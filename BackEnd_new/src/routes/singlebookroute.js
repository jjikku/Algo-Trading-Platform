const express = require("express");
const singleBookRouter = express.Router();
const booksModel = require("../model/book.model")
const jwt = require("jsonwebtoken");

function verifyToken(req,res,next) {
    const auth =  req.headers['authorization'];
    console.log("auth = " + auth);
   if(!auth)
   {
       console.log("No auth");
     return res.status(200).send(req);
   }
   let token = auth.split(" ")[1];
   if(token === "")
   {
       console.log("No token");

     return res.status(401).send("Unauthorized Request");
 
   }
   let payload = jwt.verify(token,"secretkey");
   if(!payload)
   {
       console.log("No payload");

     return res.status(401).send("Unauthorized Request");
 
   }
   req.userId = payload.subject;
   next();
 }
    singleBookRouter.get("/:id", verifyToken, function(req,res){
        //console.log(req.params.email);
            
        
        console.log("Books router");
         //console.log(checkuser);
         try{
            booksModel.find({"_id":req.params.id})
            .then ((books) => {
                console.log(books);
                res.send(books);
    
            });
            }
            catch(e)
            {
                console.log(e);
                console.log("error");
                res.send(e);
            }
    
        });
      
        singleBookRouter.delete("/:id", verifyToken, function(req,res){
            //console.log(req.params.email);
                
            
            console.log("Books delete router");
             //console.log(checkuser);
             try{
                const id = req.params.id;
                booksModel.findOneAndDelete({ _id: id })
                    .then(function () {
                        res.send(req.body);

                });                
                }
                
                catch(e)
                {
                    console.log(e);
                    console.log("error");
                    res.send(e);
                }
        
            });
          

module.exports = singleBookRouter;
