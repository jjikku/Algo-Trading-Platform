const { readCSV } = require('../Api/data_adapter/adapter');
const { API_Md_login,getxts } = require('../Api/data_adapter/adapter');
const { getMasterData } = require('../Api/data_adapter/adapter');
const { getInstId } = require('../Api/data_adapter/adapter');
const { getLTP } = require('../Api/data_adapter/adapter');
const async = require('async');
const set_n = require('./strategy_functions');
const order_array = [];
var order = [];


// Loaded from DB on deploy
function dummy_straddle(){var s,ce,pe;var set1 = set_n('09:16:00','15:25:00',40,'s','ce',34800,'current_week',10);var set2 = set_n('09:16:00','15:25:00',40,'s','pe',34800,'current_week',10);var set3 = set_n('09:20:00','15:20:00',60,'s','pe',34800,'current_week',20);var set4 = set_n('09:25:00','15:20:00',60,'s','ce',34800,'current_week',20);function set_n(entry_time,exit_time,stop_loss_percentage,buy_sell,ce_pe,strike,expiry,qty_in_lots) {var set_params = {entry_time:entry_time,buy_sell:buy_sell,exit_time:exit_time,stop_loss_percentage:stop_loss_percentage,ce_pe:ce_pe,strike:strike,expiry:expiry,qty_in_lots:qty_in_lots};return set_params;}return ([set1,set2,set3,set4]);}
var flag = 0;

 async function execution_engine(strategy){
    var ce_buy_sell = [],pe_buy_sell=[];
    var ce_entry_price=[],pe_entry_price=[];
    var ce_inst=[],pe_inst=[];
    var ce_strike=[],pe_strike=[];
    var ce_expiry=[],pe_expiry=[];
    var ce_qty=[],pe_qty=[];
    var ce_flag = [],pe_flag = [];
    var inst_id = [];
    var LTP = [];
    console.log('Strategy = ' + strategy);
    //await API_Md_login();
    let xts = await getxts();
    await API_Md_login(xts);
    await getMasterData(xts);
    
    let F = new Function('return ' + strategy)();

    let set_n_params = F();
    console.log('set_n_params');
    console.log(set_n_params);
    set_n_params.forEach(async function (element,i) {
        async.parallel({
            i: async function() {
                 function getLtp(callback) {
                    try{
                        getInstId((element.strike + element.ce_pe), element.expiry, function(random_data) {
                            callback(random_data);
                        });    
                    }
                    catch(err)
                    {
                        console.log(err);
                    }
                    
                     //return inst_id[i];
                  }
                
                 

    
                setInterval(async () => {
                    getLtp(async function(result) {
                        inst_id[i] = result;
                        //console.log("EE = " + inst_id[i]);
                        LTP[i] = await getLTP(xts,inst_id[i]);
                        console.log('inst ID = ' + inst_id[i] + ': LTP = ' + LTP[i]);
                     }); 
                }, 1000)
                // if(element.ce_pe === 'ce')
                // {
                //     readCSV("../Api/34800CE.csv", function(ce_data){
                //         //console.log(ce_data);
                //         let time = ce_data.toString().split(',')[0].split(' ')[1];
                //         let close = parseInt(ce_data.toString().split(',')[4]);
                //         //  console.log('ce time = ' + time);
                //         //  console.log('ce close = ' + close);
                //          if(time == element.entry_time) 
                //          {
                //             console.log('time match');
                //             ce_entry_price[i] = close;
                //             ce_inst[i] = element.ce_pe;
                //             ce_strike[i] = element.strike;
                //             ce_expiry[i] = element.expiry;
                //             ce_buy_sell[i] = element.buy_sell;
                //             console.log('buy_sell:',ce_buy_sell[i]);

                //             ce_qty[i] = element.qty_in_lots;
                //             order[i] = {inst:ce_inst[i],strike:ce_strike[i],expiry:ce_expiry[i],buy_sell:ce_buy_sell[i],qty:ce_qty[i]};
                //             push_order_array(order[i]);
                //             ce_flag[i] = 0;
                //          }
                         
                //          else if(ce_buy_sell[i] === 's')
                //             {

                //           //      console.log('close:' + close);
                //           //      console.log('entry: = ' + entry_price);
                //                 if(((close >= ce_entry_price*((element.stop_loss_percentage/100)+1)) || (time == element.exit_time)) && !ce_flag[i])
                //                 {
                //                     let buy_sell = 'b';
                //                     order[i] = {inst:ce_inst[i],strike:ce_strike[i],expiry:ce_expiry[i],buy_sell:buy_sell,qty:ce_qty[i]};
                //                     push_order_array(order[i]);
                //                     ce_flag[i] = 1;    
                //                 }
                //             }
                //             else if(ce_buy_sell[i] === 'b')
                //             {
                //                 if(((close <= ce_entry_price*(1-(element.stop_loss_percentage/100))) || (time == element.exit_time)) && !ce_flag[i])
                //                 {
                //                     let buy_sell = 's';
                //                     order[i] = {inst:ce_inst[i],strike:ce_strike[i],expiry:ce_expiry[i],buy_sell:buy_sell,qty:ce_qty[i]};
                //                     push_order_array(order[i]);
                //                     ce_flag[i] = 1;    

                //                 }

                //             }
                //     });
                // }
                // else if(element.ce_pe === 'pe')
                // {
                //     readCSV('../Api/34800PE.csv', function(pe_data){
                //         //console.log(pe_data);
                //         let time = pe_data.toString().split(',')[0].split(' ')[1];
                //         let close = pe_data.toString().split(',')[4];
                //         //  console.log('pe time = ' + time);
                //         //  console.log('pe close = ' + close);
                //         // console.log(time);
                //         // console.log(element.entry_time);
                //          if(time == element.entry_time)
                //          {
                //             console.log('time match');
                //              pe_entry_price[i] = close;
                //              pe_inst[i] = element.ce_pe;
                //              pe_strike[i] = element.strike;
                //              pe_expiry[i] = element.expiry;
                //              pe_buy_sell[i] = element.buy_sell;
                //              pe_qty[i] = element.qty_in_lots;
                //              order[i] = {inst:pe_inst[i],strike:pe_strike[i],expiry:pe_expiry[i],buy_sell:pe_buy_sell[i],qty:pe_qty[i]};
                //              //console.log(order[i]);
                //             push_order_array(order[i]);
                //             pe_flag[i] = 0;
                            
                //          }
                //          if(pe_buy_sell[i] === 's')
                //             {
                //                 //console.log('exit = '+element.exit_time);
                //                 //console.log('time = '+time);
                //                 if(((close >= pe_entry_price*((element.stop_loss_percentage/100)+1))  || (time == element.exit_time)) && !pe_flag[i])
                //                 {
                //                     let buy_sell = 'b';
                //                     order[i] = {inst:pe_inst[i],strike:pe_strike[i],expiry:pe_expiry[i],buy_sell:buy_sell,qty:pe_qty[i]};
                //                     push_order_array(order[i]);
                //                     pe_flag[i] = 1;

                //                 }
                //             }
                //             else if(pe_buy_sell[i] === 'b')
                //             {
                //                 if(((close <= pe_entry_price*(1-(element.stop_loss_percentage/100)))  || (time == element.exit_time)) && !pe_flag[i])
                //                 {
                //                     let buy_sell = 's';
                //                     order[i] = {inst:pe_inst[i],strike:pe_strike[i],expiry:pe_expiry[i],buy_sell:buy_sell,qty:pe_qty[i]};
                //                     push_order_array(order[i]);
                //                     pe_flag[i] = 1;
                //                 }

                //             }
                            
                //     });
                // }    

                //callback(null, i);    
                
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