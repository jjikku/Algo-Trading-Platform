const express = require("express");
const booksRouter = express.Router();
const booksModel = require("../model/book.model");
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

booksRouter.post("/addbook", verifyToken, function (req, res) {
    var newbook = {
      bookname:req.body.book.title,
      authorname:req.body.book.author,
      image:req.body.book.image,
      about:req.body.book.about
     };

    console.log("add book route")
    console.log(req.body);
    var addbook = new booksModel(newbook);
    addbook.save();
    res.send(req.body);
  });

   booksRouter.get("/",verifyToken, function(req,res){
    //console.log(req.params.email);
    //booksRouter.get("/", function(req,res){
    console.log(req.originalUrl);
    console.log("Books router");
     //console.log(checkuser);
     try{
        booksModel.find({})
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
  
    booksRouter.get("/:id", verifyToken, function(req,res){
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
      


        // booksRouter.get("/:id",function(req,res){
        //     //console.log(req.params.email);
                
            
        //     console.log("Books router- ID");
        //      //console.log(checkuser);
        //      try{
        //         booksModel.find({"_id":req.params.id})
        //         .then ((books) => {
        //             console.log(books);
        //             res.send(books);
        
        //         });
        //         }
        //         catch(e)
        //         {
        //             console.log(e);
        //             console.log("error");
        //             res.send(e);
        //         }
        
        //     });
          
// const books = require('../data/books');
//const bookdata = require("../model/BookModel");
//const nav = require("../../public/js/nav");

//router to render books page
// booksRouter.get("/", function (req, res) {
//   bookdata.find().then(function (books) {
//     res.render("books", {
//       books
//     });
//   });
// });

//router to render addbook page
// booksRouter.get("/addbook", function (req, res) {
//   res.render("addbook", {
//   });
// });

//router to add book
// booksRouter.post("/add", function (req, res) {
//   var item = {
//     title: req.body.title,
//     author: req.body.author,
//     image: req.body.image,
//     about: req.body.about,
//   };
//   console.log(item);
//   const book = new bookdata(item);
//   book.save();
//   res.redirect("/books");
// });

//router for singlebook
// booksRouter.get("/:id", function (req, res) {
//   const id = req.params.id;
//   bookdata.findOne({ _id: id }).then(function (book) {
//     res.render("book", {
//       book
//     });
//   });
// });

//router to delete book
// booksRouter.post("/delete", function (req, res) {
//   const id = req.body.id;

//   bookdata.findOneAndDelete({ _id: id }).then(function () {
//     res.redirect("/books");
//   });
// });

//router to edit book
// booksRouter.post("/edit", function (req, res) {
//   bookdata.findById(req.body.id, function (err, data) {
//     if (err) {
//       throw err;
//     } else {
//       res.render("editbook", {
//         data
//       });
//     }
//   });
// });

//router to update book
// booksRouter.post("/update", function (req, res) {
//   bookdata.findByIdAndUpdate(
//     req.body.id,
//     { $set: req.body },
//     function (err, data) {
//       if (err) {
//         res.json({ status: "Failed" });
//       } else if (data.n == 0) {
//         res.json({ status: "No match Found" });
//       } else {
//         res.redirect("/books");
//       }
//     }
//   );
// });

module.exports = booksRouter;
