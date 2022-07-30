const mongoose=require('mongoose');
mongoose.connect(
    "mongodb+srv://jikku:jikku123@cluster0.ly4pn.mongodb.net/?retryWrites=true&w=majority",
    {
        useUnifiedTopology:true,
        useNewUrlParser:true,
    }
);
const Schema = mongoose.Schema;
var StrategySchema=new Schema({
 stratname: String,
 strategy:String

})
var strategyModel=mongoose.model('strategy',StrategySchema,"strategy");
module.exports=strategyModel;