const Promise = require('bluebird');                        
//const csv = require('fast-csv');
const fs = require('fs');
const CONFIG = require('../../config/config');
const axios = require('axios')
var os = require('os')

const byline = require('byline');                           
var XtsMarketDataAPI = require('xts-marketdata-api').XtsMarketDataAPI;
var XtsMarketDataWS = require('xts-marketdata-api').WS;

let secretKey = CONFIG.development.MD_secretKey;
let appKey = CONFIG.development.MD_appKey;
let source = CONFIG.development.MD_source;
let url = CONFIG.development.MD_url;
let userID = CONFIG.development.userID;
let isTradeSymbol = false;
var xtsMarketDataWS = new XtsMarketDataWS(url);

function readCSV(file, callback) {
    let stream = fs.createReadStream(file);
    stream = byline.createStream(stream);
    stream.on('data', (line) => {
      stream.pause();
      Promise.resolve(line.toString())
        .then(callback)
        .then(() => setTimeout(() => stream.resume(), 10));
    });
  }
  
 xtsMarketDataAPI = new XtsMarketDataAPI(url);

function login(){
  var config = {
    secretKey: secretKey,
    appKey: appKey,
    source: source
  };
  axios.post(
    `${url}`+'/auth/login',config)
          .then(response => {
             console.log('response = ' + response);
          })
      
}

//login();
var xtsMarketDataAPI = null;

(async () => {
    //creating the instance of XTSRest
     xtsMarketDataAPI = new XtsMarketDataAPI(url);
  
    //calling the logIn API
    var loginRequest = {
      secretKey,
      appKey,
    };
  
    let logIn = await xtsMarketDataAPI.logIn(loginRequest);
  
    // checking for valid loginRequest
    if (logIn && logIn.type == xtsMarketDataAPI.responseTypes.success) {
      //creating the instance of xtsMarketDataWS
      userID = logIn.result.userID;
      console.log('user ID = ' + userID);
      console.log('token = ' + logIn.result.token);
      xtsMarketDataWS = new XtsMarketDataWS(url);
      

      //Instantiating the socket instance
      // var socketInitRequest = {
      //   userID: logIn.result.userID,
      //   publishFormat: 'JSON',
      //   broadcastMode: 'Full',
      //   token: logIn.result.token, // Token Generated after successful LogIn
      // };
      // xtsMarketDataWS.init(socketInitRequest);
  
      //Registering the socket Events
      //await registerEvents();
  
      //calling the remaining methods of the Interactive API
      testAPI();
    } else {
      //In case of failure
      console.error(logIn);
    }
  })();
  
  async function testAPI() {
    // get enums of application
    //await clientConfig();
    let inst_id = "";
    
    var instrumentMaster = async function (instrumentMasterRequest) {
      let response = await xtsMarketDataAPI.instrumentMaster(
        instrumentMasterRequest
      );
      //console.log(response);
      //var inst_data = JSON.stringify(response).split('\\n');
      fs.writeFileSync("./inst_master",JSON.stringify(response));

      return response;
    };

    fs.readFile('./inst_master', function(err, data) {
      if(err) throw err;
      const arr = data.toString().split('\\n');
      for(let i of arr) {
        let re = /(NSEFO).+(BANKNIFTY).+(36500PE).+(OPTIDX).+(2022-08-04)/;
        if(i.match(re))
        {
          inst_id = i.split('|')[1];
          console.log(inst_id);
        }
          

      }
  });

    let instrumentMasterRequest = {
      exchangeSegmentList: ['NSEFO'],
    };
  
    await instrumentMaster(instrumentMasterRequest);
  
  let getQuotesRequest = {
    isTradeSymbol: isTradeSymbol,
    instruments: [
      {
        exchangeSegment: 2,
        exchangeInstrumentID: inst_id,
      }
     
    ],
    xtsMessageCode: 1512,
    publishFormat: 'JSON',
  };

  var getQuotes = async function (getQuotesRequest) {
    let response = await xtsMarketDataAPI.getQuotes(getQuotesRequest);
    console.log(response);
    return response;
  };

  await getQuotes(getQuotesRequest);
  
  let OptionSymbol = {
    instruments: [
      {
        exchangeSegment: 2,
        series: 'OPTIDX',
        symbol:'FTSE100',
        expiryDate:'04Aug2022',
        optionType:'CE',
        strikePrice:37000
      },
      
    ]
    
  };

  
  setInterval(() => {
  
    console.log('Wait for 1 second...')
   
    // Make GET Request every 1 second
    //console.log('url = ' + `${url}/instruments/quotes`);
    //getQuotes(getQuotesRequest);
    // axios.get(`${url}/instruments/quotes`,ltp_config,options)
    //    // Print data
    //    .then(response => {
    //       console.log('Quotes response = ' + response);
    //    })
   
       // Print error message if occur
//        .catch(error => console.log("error = " + error));
  }, 1000)
}



module.exports = readCSV;