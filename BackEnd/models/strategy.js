const MONGOOSE = require('mongoose');

const STRING = MONGOOSE.Schema.Types.String;
const DATE = MONGOOSE.Schema.Types.Date;
const NUMBER = MONGOOSE.Schema.Types.Number;
const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;

const STRATEGY_SCHEMA = MONGOOSE.Schema({
    title: { type: STRING, required: true },
    strategy: { type: STRING, required: true }
    //creationDate: { type: DATE, default: Date.now }

});

// STRATEGY_SCHEMA.index({
//     title: 'text',
//     strategy: 'text',
    
// });

const STRATEGY = MONGOOSE.model('Strategy', STRATEGY_SCHEMA);

module.exports = STRATEGY;