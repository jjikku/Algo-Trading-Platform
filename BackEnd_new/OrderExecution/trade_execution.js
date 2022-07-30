const VALIDATOR = require('validator');
//const BOOK = require('mongoose').model('Book');
//const USER = require('mongoose').model('User');
var XTSInteractive = require('xts-interactive-api').Interactive;
var XTSInteractiveWS = require('xts-interactive-api').WS;
var config = require('./config.json');

let secretKey = config.secretKey;
let appKey = config.appKey;
let source = config.source;
let url = config.url;
let userID = null;

//xtsInteractive for API calls and xtsInteractiveWS for events related functionality
var xtsInteractive = null;
var xtsInteractiveWS = null;


module.exports = {

    getTradeDetails: (req, res) => {
        (async () => {
            //creating the instance of XTSRest
            xtsInteractive = new XTSInteractive(url);
            
            //calling the logIn API
            var loginRequest = {secretKey,appKey,source,};
            let logIn = await xtsInteractive.logIn(loginRequest);
                      
            // checking for valid loginRequest
            if (logIn && logIn.type == xtsInteractive.responseTypes.success) {
              //creating the instance of XTSInteractiveWS
              xtsInteractiveWS = new XTSInteractiveWS(url);
              userID = logIn.result.userID;
              //Instantiating the socket instance
               // Token Generated after successful LogIn
              var socketInitRequest = {userID: logIn.result.userID,token: logIn.result.token,};
              xtsInteractiveWS.init(socketInitRequest);
              //Registering the socket Events
              await registerEvents();
              //calling the remaining methods of the Interactive API
              getTradeAPI();
            } else {
              //In case of failure
              console.error(logIn);
            }
          })();

          async function getTradeAPI() 
          {
            reqObject = {clientID: userID,};
            await getTradeBook(reqObject);
          }
          
          var getTradeBook = async function (reqObject) {
            let response = await xtsInteractive.getTradeBook();
            console.log(response);
              // return res.status(200).json({
              //     message: 'Trade retrieved sucessfully!',
              //     data: response
              // });
          };
    },

    getorderdetails: (req, res) => {
        (async () => {
            //creating the instance of XTSRest
            xtsInteractive = new XTSInteractive(url);
            
            //calling the logIn API
            var loginRequest = {secretKey,appKey,source,};
            let logIn = await xtsInteractive.logIn(loginRequest);
                      
            // checking for valid loginRequest
            if (logIn && logIn.type == xtsInteractive.responseTypes.success) {
              //creating the instance of XTSInteractiveWS
              xtsInteractiveWS = new XTSInteractiveWS(url);
              userID = logIn.result.userID;
              //Instantiating the socket instance
               // Token Generated after successful LogIn
              var socketInitRequest = {userID: logIn.result.userID,token: logIn.result.token,};
              xtsInteractiveWS.init(socketInitRequest);
              //Registering the socket Events
              await registerEvents();
              //calling the remaining methods of the Interactive API
              getOrderAPI();
            } else {
              //In case of failure
              console.error(logIn);
            }
          })();

          async function getOrderAPI() 
          {
            reqObject = {clientID: userID,};
            await getOrderBook();
          }
          
          var getOrderBook = async function () {
            let response = await xtsInteractive.getOrderBook();
            console.log(response);
            //return response;
            // return res.status(200).json({
            //     message: 'Order retrieved sucessfully!',
            //     data: response
            // });
          };
    },

    executetrade: (req, res) => {
        (async () => {
            //creating the instance of XTSRest
            xtsInteractive = new XTSInteractive(url);
            //calling the logIn API
            var loginRequest = {secretKey,appKey,source,};
            let logIn = await xtsInteractive.logIn(loginRequest);
                      
            // checking for valid loginRequest
            if (logIn && logIn.type == xtsInteractive.responseTypes.success) {
              //creating the instance of XTSInteractiveWS
              xtsInteractiveWS = new XTSInteractiveWS(url);
              userID = logIn.result.userID;
              //Instantiating the socket instance
               // Token Generated after successful LogIn
              var socketInitRequest = {userID: logIn.result.userID,token: logIn.result.token,};
              xtsInteractiveWS.init(socketInitRequest);
              //Registering the socket Events
              await registerEvents();
              //calling the remaining methods of the Interactive API
              executeTradeAPI();
            } else {
              //In case of failure
              console.error(logIn);
            }
          })();

          async function executeTradeAPI() 
          {
            console.log(req, res);

            let placeOrderRequest = {
                exchangeSegment: 'NSECM',
                exchangeInstrumentID: req, //"SBIN-EQ", //22, BANKNIFTY 28JUL29SEP SPD
                productType: 'MIS', //THIS IS FOR INTRADAY
                orderType: 'MARKET',
                orderSide: 'BUY',
                timeInForce: 'DAY',
                disclosedQuantity: 0,
                orderQuantity: res,
                limitPrice: 2000,
                stopPrice: 0,
                orderUniqueIdentifier: '45485',
                clientID: userID
              };
            //  //place order
              await placeOrder(placeOrderRequest);
          }

          var placeOrder = async function (placeOrderRequest) {
            let response = await xtsInteractive.placeOrder(placeOrderRequest);
            console.log(response);
            // return res.status(200).json({
            //     message: 'Order placed sucessfully!',
            //     data: response
            // });
          };
    }

};

var registerEvents = async function () {
    //instantiating the listeners for all event related data
  
    //"connect" event listener
    xtsInteractiveWS.onConnect((connectData) => {
      console.log(connectData);
    });
  
    //"joined" event listener
    xtsInteractiveWS.onJoined((joinedData) => {
      console.log(joinedData);
    });
  
    //"error" event listener
    xtsInteractiveWS.onError((errorData) => {
      console.log(errorData);
    });
  
    //"disconnect" event listener
    xtsInteractiveWS.onDisconnect((disconnectData) => {
      console.log(disconnectData);
    });
  
    //"order" event listener
    xtsInteractiveWS.onOrder((orderData) => {
      console.log(orderData);
    });
  
    //"trade" event listener
    xtsInteractiveWS.onTrade((tradeData) => {
      console.log(tradeData);
    });
  
    //"position" event listener
    xtsInteractiveWS.onPosition((positionData) => {
      console.log(positionData);
    });
  
    //"logout" event listener
    xtsInteractiveWS.onLogout((logoutData) => {
      console.log(logoutData);
    });
  };