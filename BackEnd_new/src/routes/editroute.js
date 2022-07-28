const express = require("express");
const editBooksRouter = express.Router();
const booksModel = require("../model/book.model");
const jwt = require("jsonwebtoken");

//const { verifyToken } = require("../../ verifytoken");
function verifyToken(req, res, next) {
  const auth = req.headers["authorization"];
  console.log("auth = " + auth);
  if (!auth) {
    console.log("No auth");
    return res.status(200).send(req);
  }
  let token = auth.split(" ")[1];
  if (token === "") {
    console.log("No token");

    return res.status(401).send("Unauthorized Request");
  }
  let payload = jwt.verify(token, "secretkey");
  if (!payload) {
    console.log("No payload");

    return res.status(401).send("Unauthorized Request");
  }
  req.userId = payload.subject;
  next();
}

editBooksRouter.post("/:id", verifyToken, function (req, res) {
  var editedbook = {
    bookname: req.body.book.bookname,
    authorname: req.body.book.authorname,
    image: req.body.book.image,
    about: req.body.book.about,
  };

  console.log("add book route");
  console.log(req.body);
  var editbook = new booksModel(editedbook);

  booksModel.findByIdAndUpdate(
    req.params.id,
    { $set: editedbook },
    function (err, data) {
      if (err) {
        res.status(401).send(err);
      } else {
        res.send(data);
      }
    }
  );
});

module.exports = editBooksRouter;
