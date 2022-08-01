const express = require("express");
const strategyRouter = express.Router();
const strategyModel = require("../model/strategy.model");
const { execution_engine } = require("../cep/execution_engine");
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

strategyRouter.post("/addstrategy", function (req, res) {
    var newstrategy = {
      stratname:req.body.strat.stratname,
      strategy:req.body.strat.strategy
      
     };

    console.log("strategy route")
    console.log(req.body);
    var addstrategy= new strategyModel(newstrategy);
    addstrategy.save();
    res.send(req.body);
  });

   strategyRouter.get("/",verifyToken, function(req,res){
    //console.log(req.params.email);
    //booksRouter.get("/", function(req,res){
    console.log(req.originalUrl);
    console.log("strategy router");
     //console.log(checkuser);
     try{
        strategyModel.find({})
        .then ((strategy) => {
            console.log(strategy);
            res.send(strategy);

        });
        }
        catch(e)
        {
            console.log(e);
            console.log("error");
            res.send(e);
        }

    });
  
    // strategyRouter.get("/:id", verifyToken, function(req,res){
      strategyRouter.get("/strategy/:id", function (req, res) {
        //console.log(req.params.email);
        //booksRouter.get("/", function(req,res){
        console.log(req.originalUrl);
        console.log("Strategy router");
        //console.log(checkuser);
        try {
          let strategyId = req.params.id;
              //let strategyId = '62dfa9e2f7f2bc1d6f601e47';
              //console.log(strategyId);
                  strategyModel.findById(strategyId).then((strategy) => {
                  if (!strategy) {
                      return res.status(400).json({
                          message: 'There is no strategy with the given id in our database.'
                      });
                  }
                  else{
                      console.log('execution engine call');
                      console.log(strategy.strategy);
                  
                      execution_engine(strategy.strategy);
                      console.log('execution engine called');
                      return res.status(200).send(strategy.strategy);
                  }
      
      
        }) 
      }
      catch (e) {
          console.log(e);
          console.log("error");
          res.send(e);
        }
      });
      
      
        module.exports=strategyRouter;