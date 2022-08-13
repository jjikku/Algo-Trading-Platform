const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/AlgoTrading",
{
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// mongoose.connect(
//     "mongodb+srv://jikku:jikku123@cluster0.ly4pn.mongodb.net/?retryWrites=true&w=majority",
//     {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     }
//   );
 const Schema = mongoose.Schema;

var BookSchema = new Schema({
    bookname: String,
    authorname:String,
    image: String,
    about:String
})

var booksModel = mongoose.model('books', BookSchema, "books");                        //UserData is the model and NewBookData is the schema

module.exports = booksModel;