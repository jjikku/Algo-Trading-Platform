function set_n(entry_time,exit_time,stop_loss_percentage,buy_sell,ce_pe,strike,expiry,qty_in_lots) {
    var set_params = {
        entry_time:entry_time,
        exit_time:exit_time,
        stop_loss_percentage:stop_loss_percentage,
        buy_sell:buy_sell,
        ce_pe:ce_pe,
        strike:strike,
        expiry:expiry,
        qty_in_lots:qty_in_lots
    };
    return set_params;
}

module.exports = set_n;
