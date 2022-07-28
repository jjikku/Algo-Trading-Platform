const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const loginRouter = require("./src/routes/loginroute");
const signupRouter = require("./src/routes/signuproute");
const homeRouter = require("./src/routes/homeroute");
const booksRouter = require("./src/routes/booksroute");
const editBooksRouter = require("./src/routes/editroute")
const singleBookRouter = require("./src/routes/singlebookroute")
require('dotenv').config();

const app = new express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
// app.use("/home", homeRouter);
app.use("/books", booksRouter);
app.use("/singlebook", singleBookRouter);
app.use("/editbook",editBooksRouter);

const PORT = (process.env.PORT || 5000);

app.listen(PORT, () => {
  console.log(`Server Ready on ${PORT}`);
});