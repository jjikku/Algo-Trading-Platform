const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://jikku:jikku123@cluster0.ly4pn.mongodb.net/?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
const Schema = mongoose.Schema;

const StrategySchema = new Schema({
  title: String,
  strategy: String,
  //creationDate: { type: DATE, default: Date.now }
});

const STRATEGY = mongoose.model("strategy", StrategySchema, "strategy");

module.exports = STRATEGY;
