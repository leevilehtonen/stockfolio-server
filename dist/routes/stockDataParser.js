'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDayHistoryData = getDayHistoryData;
exports.getWeekHistoryData = getWeekHistoryData;
exports.getMonthHistoryData = getMonthHistoryData;
exports.getYearHistoryData = getYearHistoryData;
exports.getThreeMonthHistoryData = getThreeMonthHistoryData;
exports.getThreeYearHistoryData = getThreeYearHistoryData;
exports.getAllHistoryData = getAllHistoryData;

var _yahooFinance = require('yahoo-finance');

var _yahooFinance2 = _interopRequireDefault(_yahooFinance);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDayHistoryData(symbol, res) {
    var options = {
        uri: 'https://chartapi.finance.yahoo.com/instrument/1.0/' + symbol + '/chartdata;type=quote;range=1d/json',
        callback: 'finance_charts_json_callback',
        json: true,
        timeout: 2000
    };
    (0, _requestPromise2.default)(options).then(function (snapshot) {
        var js = JSON.parse(snapshot.replace(/^finance_charts_json_callback\(|\)$/g, ''));
        var response = { success: true };

        js.series.map(function (item) {
            var i = item.Timestamp * 1000;
            delete item.Timestamp;
            return item.date = new Date(i).toISOString().slice(11, 16);
        });

        Object.assign(response, js);
        // let i = response.series[0].Timestamp * 1000;
        //let date = new Date(i);
        res.json(response);
    }).catch(function (err) {
        res.json({ success: false });
    });
}

function getWeekHistoryData(symbol, res) {
    getStockHistory(7, 'd', symbol, res);
}

function getMonthHistoryData(symbol, res) {
    getStockHistory(30, 'd', symbol, res);
}

function getYearHistoryData(symbol, res) {
    getStockHistory(365, 'w', symbol, res);
}

function getThreeMonthHistoryData(symbol, res) {
    getStockHistory(90, 'w', symbol, res);
}

function getThreeYearHistoryData(symbol, res) {
    getStockHistory(1095, 'm', symbol, res);
}

function getAllHistoryData(symbol, res) {
    getStockHistory(50 * 365, 'm', symbol, res);
}

var getStockHistory = function getStockHistory(days, type, symbol, res) {
    var dateTo = new Date();
    var dateFrom = new Date();

    dateTo.setDate(dateTo.getDate() + 1);
    dateFrom.setDate(dateFrom.getDate() - days);

    dateTo = dateTo.toISOString().slice(0, 10);
    dateFrom = dateFrom.toISOString().slice(0, 10);

    _yahooFinance2.default.historical({
        symbol: symbol,
        from: dateFrom,
        to: dateTo,
        period: type

    }).then(function (snapshot) {
        var response = { success: true };
        snapshot.map(function (item) {
            var date = item.date.toISOString().slice(0, 10);
            item.date = date;
            return item;
        });
        Object.assign(response, { series: snapshot });
        res.json(response);
    }).catch(function (err) {
        res.json({ success: false });
    });
};