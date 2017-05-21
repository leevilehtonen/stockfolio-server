import yahooFinance from 'yahoo-finance';
import rp from 'request-promise';


export function getDayHistoryData(symbol, res) {
    const options = {
        uri: 'https://chartapi.finance.yahoo.com/instrument/1.0/' + symbol + '/chartdata;type=quote;range=1d/json',
        callback: 'finance_charts_json_callback',
        json: true,
        timeout:2000
    };
    rp(options)
        .then((snapshot) => {
            var js = JSON.parse(snapshot.replace(/^finance_charts_json_callback\(|\)$/g, ''));
            let response = { success: true };

            js.series.map((item) => {
                let i = item.Timestamp * 1000;
                delete item.Timestamp;
                return item.date = new Date(i).toISOString().slice(11, 16);
            })

            Object.assign(response, js);
            // let i = response.series[0].Timestamp * 1000;
            //let date = new Date(i);
            res.json(response);
        })
        .catch((err) => {
            res.json({ success: false });
        });
}

export function getWeekHistoryData(symbol, res) {
    getStockHistory(7, 'd', symbol, res);
}

export function getMonthHistoryData(symbol, res) {
    getStockHistory(30, 'd', symbol, res);
}

export function getYearHistoryData(symbol, res) {
    getStockHistory(365, 'w', symbol, res);
}

export function getThreeMonthHistoryData(symbol, res) {
    getStockHistory(90, 'w', symbol, res);
}

export function getThreeYearHistoryData(symbol, res) {
    getStockHistory(1095, 'm', symbol, res);
}

export function getAllHistoryData(symbol, res) {
    getStockHistory(50 * 365, 'm', symbol, res);
}

const getStockHistory = (days, type, symbol, res) => {
    let dateTo = new Date();
    let dateFrom = new Date();

    dateTo.setDate(dateTo.getDate() + 1);
    dateFrom.setDate(dateFrom.getDate() - days);

    dateTo = dateTo.toISOString().slice(0, 10);
    dateFrom = dateFrom.toISOString().slice(0, 10);

    yahooFinance.historical({
        symbol: symbol,
        from: dateFrom,
        to: dateTo,
        period: type

    }).then((snapshot) => {
        let response = { success: true };
        snapshot.map((item) => {
            let date = item.date.toISOString().slice(0,10);
            item.date = date;
            return item;
        })
        Object.assign(response, { series: snapshot });
        res.json(response);
    }).catch((err) => {
        res.json({ success: false });
    })


}