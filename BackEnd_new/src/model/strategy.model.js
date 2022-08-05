const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://jikku:jikku123@cluster0.ly4pn.mongodb.net/?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  }
);
const Schema = mongoose.Schema;

const StrategySchema = new Schema({
  stratname: String,
  strategy: String,
  //creationDate: { type: DATE, default: Date.now }
});

const strategyModel = mongoose.model("strategy", StrategySchema, "strategy");

module.exports = strategyModel;
