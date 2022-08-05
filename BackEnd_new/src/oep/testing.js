// //only for testing
const TRADE_EXECUTION = require('./trade_execution');
instrumentId = "13793420" // "HINDALCO-EQ" //WIPRO-EQ" //ACC-EQ";
orderquantity = 1
buysell = 'BUY'
let orderno = TRADE_EXECUTION.executetrade(instrumentId, orderquantity, buysell);
orderno.then(data => {
        console.log(data.message, data.executionPrice, data.apporderNo, data.data);
    });
   
// var abeesg = [
//     {buysell: 'BUY', orderquantity: 1,instrumentId: 'MARUTI-EQ'},
//     {buysell: 'SELL',orderquantity: 3,instrumentId: 'HINDALCO-EQ'},
//     {buysell: 'BUY', orderquantity: 2,instrumentId: 'TATAMOTORS-EQ'}
// ]
// for(i=0;i<abeesg.length;i++)
// {
//     instrumentId = abeesg[i].instrumentId;
//     orderquantity = abeesg[i].orderquantity;
//     buysell = abeesg[i].buysell;

//     let orderno = TRADE_EXECUTION.executetrade(instrumentId, orderquantity, buysell);
//     orderno.then(data => {
//         console.log(data.message, data.executionPrice, data.apporderNo,);
//     });
// }
