//const VALIDATOR = require('validator');
const STRATEGY = require('mongoose').model('Strategy');
//const USER = require('mongoose').model('User');
var { execution_engine } = require('../cep/execution_engine');

module.exports = {
    getStrategy: (req, res) => {
        let strategyId = req.params.id;
        //let strategyId = '62dfa9e2f7f2bc1d6f601e47';
        //console.log(strategyId);
        STRATEGY.findById(strategyId).then((strategy) => {
            if (!strategy) {
                return res.status(400).json({
                    message: 'There is no strategy with the given id in our database.'
                });
            }
            else{
                console.log('execution engine calling');
                console.log(strategy.strategy);
            
                execution_engine(strategy.strategy);
                console.log('execution engine called');
                return res.status(200).send(strategy.strategy);
            }

});
}
};