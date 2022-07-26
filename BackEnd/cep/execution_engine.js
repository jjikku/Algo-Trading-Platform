const readCSV = require('../Api/data_adapter/adapter');
const async = require('async');
const set_n = require('./strategy_functions');
const order_array = [];
var order = [];


// async.parallel({
//     one: function(callback) {
//         var CE_data;
//         readCSV('../Api/34800CE.csv', function(ce_data){
//             //console.log(ce_data);
//             let time = ce_data.toString().split(',')[0].split(' ')[1];
//             let close = ce_data.toString().split(',')[4];
//             // console.log('ce time = ' + time);
//             // console.log('ce close = ' + close);
//         }),
//         callback(null, 1);

//     },
//     two: function(callback) {
//         readCSV('../Api/34800PE.csv', function(pe_data){
//             //console.log(pe_data);
//             let time = pe_data.toString().split(',')[0].split(' ')[1];
//             let close = pe_data.toString().split(',')[4];
//             // console.log('pe time = ' + time);
//             // console.log('pe close = ' + close);
//         }),
//         callback(null, 2);
//     }
// }, function(err, results) {
//     console.log('results =' + results);
//     // results is equal to: { one: 1, two: 2 }
// });



// Loaded from DB on deploy
function dummy_straddle(){
    var s,ce,pe;
    var set1 = set_n('09:16:00','15:25:00',40,'s','ce',34800,'current_week',10);
    var set2 = set_n('09:16:00','15:25:00',40,'s','pe',34800,'current_week',10);
    var set3 = set_n('09:20:00','15:20:00',60,'s','pe',34800,'current_week',20);
    var set4 = set_n('09:25:00','15:20:00',60,'s','ce',34800,'current_week',20);

    return ([set1,set2,set3,set4]);
}
var flag = 0;

 function execution_engine(strategy){
    var ce_buy_sell = [],pe_buy_sell=[];
    var ce_entry_price=[],pe_entry_price=[];
    var ce_inst=[],pe_inst=[];
    var ce_strike=[],pe_strike=[];
    var ce_expiry=[],pe_expiry=[];
    var ce_qty=[],pe_qty=[];
    var ce_flag = [],pe_flag = [];
    //var set_n_params = dummy_straddle();
    console.log('Strategy = ' + strategy);
    //const set_n_params = new Function(strategy)();
    //const set_n_params = strategy.parseFunction();  
  
    //const set_n_params = eval(strategy);
    //var set_n_params = eval(`var f = function(){ return ${strategy};}; f() ;`) ;
    let F = new Function('return ' + strategy)();

    let set_n_params = F();
    console.log('set_n_params');
    //console.log(set_n_params);
    //setTimeout(strategy, 1).forEach(function (element,i) {
    set_n_params.forEach(function (element,i) {
        async.parallel({
            i: function(callback) {
                if(element.ce_pe === 'ce')
                {
                    readCSV('./Api/34800CE.csv', function(ce_data){
                        //console.log(ce_data);
                        let time = ce_data.toString().split(',')[0].split(' ')[1];
                        let close = parseInt(ce_data.toString().split(',')[4]);
                        //  console.log('ce time = ' + time);
                        //  console.log('ce close = ' + close);
                         if(time == element.entry_time) 
                         {
                            console.log('time match');
                            ce_entry_price[i] = close;
                            ce_inst[i] = element.ce_pe;
                            ce_strike[i] = element.strike;
                            ce_expiry[i] = element.expiry;
                            ce_buy_sell[i] = element.buy_sell;
                            console.log('buy_sell:',ce_buy_sell[i]);

                            ce_qty[i] = element.qty_in_lots;
                            order[i] = {inst:ce_inst[i],strike:ce_strike[i],expiry:ce_expiry[i],buy_sell:ce_buy_sell[i],qty:ce_qty[i]};
                            push_order_array(order[i]);
                            ce_flag[i] = 0;
                         }
                         
                         else if(ce_buy_sell[i] === 's')
                            {

                          //      console.log('close:' + close);
                          //      console.log('entry: = ' + entry_price);
                                if(((close >= ce_entry_price*((element.stop_loss_percentage/100)+1)) || (time == element.exit_time)) && !ce_flag[i])
                                {
                                    let buy_sell = 'b';
                                    order[i] = {inst:ce_inst[i],strike:ce_strike[i],expiry:ce_expiry[i],buy_sell:buy_sell,qty:ce_qty[i]};
                                    push_order_array(order[i]);
                                    ce_flag[i] = 1;    
                                }
                            }
                            else if(ce_buy_sell[i] === 'b')
                            {
                                if(((close <= ce_entry_price*(1-(element.stop_loss_percentage/100))) || (time == element.exit_time)) && !ce_flag[i])
                                {
                                    let buy_sell = 's';
                                    order[i] = {inst:ce_inst[i],strike:ce_strike[i],expiry:ce_expiry[i],buy_sell:buy_sell,qty:ce_qty[i]};
                                    push_order_array(order[i]);
                                    ce_flag[i] = 1;    

                                }

                            }
                    });
                }
                else if(element.ce_pe === 'pe')
                {
                    readCSV('./Api/34800PE.csv', function(pe_data){
                        //console.log(pe_data);
                        let time = pe_data.toString().split(',')[0].split(' ')[1];
                        let close = pe_data.toString().split(',')[4];
                        //  console.log('pe time = ' + time);
                        //  console.log('pe close = ' + close);
                        // console.log(time);
                        // console.log(element.entry_time);
                         if(time == element.entry_time)
                         {
                            console.log('time match');
                             pe_entry_price[i] = close;
                             pe_inst[i] = element.ce_pe;
                             pe_strike[i] = element.strike;
                             pe_expiry[i] = element.expiry;
                             pe_buy_sell[i] = element.buy_sell;
                             pe_qty[i] = element.qty_in_lots;
                             order[i] = {inst:pe_inst[i],strike:pe_strike[i],expiry:pe_expiry[i],buy_sell:pe_buy_sell[i],qty:pe_qty[i]};
                             //console.log(order[i]);
                            push_order_array(order[i]);
                            pe_flag[i] = 0;
                            
                         }
                         if(pe_buy_sell[i] === 's')
                            {
                                //console.log('exit = '+element.exit_time);
                                //console.log('time = '+time);
                                if(((close >= pe_entry_price*((element.stop_loss_percentage/100)+1))  || (time == element.exit_time)) && !pe_flag[i])
                                {
                                    let buy_sell = 'b';
                                    order[i] = {inst:pe_inst[i],strike:pe_strike[i],expiry:pe_expiry[i],buy_sell:buy_sell,qty:pe_qty[i]};
                                    push_order_array(order[i]);
                                    pe_flag[i] = 1;

                                }
                            }
                            else if(pe_buy_sell[i] === 'b')
                            {
                                if(((close <= pe_entry_price*(1-(element.stop_loss_percentage/100)))  || (time == element.exit_time)) && !pe_flag[i])
                                {
                                    let buy_sell = 's';
                                    order[i] = {inst:pe_inst[i],strike:pe_strike[i],expiry:pe_expiry[i],buy_sell:buy_sell,qty:pe_qty[i]};
                                    push_order_array(order[i]);
                                    pe_flag[i] = 1;
                                }

                            }
                            
                    });
                }    

                callback(null, i);    
                
        }
                    
        
            });



    });

    return order_array;
}

//execution_engine();

function push_order_array(order)
{
    order_array.push(order);
    var popped = order_array.pop();
    console.log(popped);
}

function pop_order_array(){
    return order_array.pop();
}

module.exports = {execution_engine,pop_order_array};
// module.exports = pop_order_array;
//  {
//     pop_order_array,
//     execution_engine,
//     dummy
// };