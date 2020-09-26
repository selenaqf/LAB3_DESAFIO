var express = require('express');
const { request, response } = require('../app');
var routes = express.Router();
routes.get('/', (request, response, next) => {
    response.status(200).json({
        "msn": "API REST" + new Date()
    });
});
routes.get('/sum', (request, response, next) => {
    var params = request.query;
    if (params.a == null) {
        response.status(500).json({
            "msn": "PARAMETROS INCORRECTOS"
        });
        return;
    }
    if (params.b == null) {
        response.status(500).json({
            "msn": "PARAMETROS INCORRECTOS"
        });
        return;
    }
    var r = Number(params.a) + Number(params.b)
    response.status(500).json({
        "msn": r
    });
});
routes.post('/change', (request, response, next) => {
    var params = request.body;
    if (params.source == null && params.cant == null && params.destination == null) {
        response.status(500).json({
            "msn": "PARAMETROS INCORRECTOS"
        });
        return;
    }
    var dictionary = {
        "CAD":1.3374591714,
        "HKD":7.7501289324,
        "ISK":139.0751246347,
        "PHP":48.5052432525,
        "DKK":6.4006360667,
        "HUF":312.1540312876,
        "CZK":23.2998108991,
        "GBP":0.7851383875,
        "RON":4.1905621454,
        "SEK":9.1357228812,
        "IDR":14870.0017190992,
        "INR":73.6784424961,
        "BRL":5.5492521919,
        "RUB":77.7075812274,
        "HRK":6.4887399003,
        "JPY":105.5011174145,
        "THB":31.6150936909,
        "CHF":0.9281416538,
        "EUR":0.859549596,
        "MYR":4.1675262163,
        "BGN":1.6811070999,
        "TRY":7.6249785113,
        "CNY":6.8292074953,
        "NOK":9.5792504728,
        "NZD":1.5262162627,
        "ZAR":17.1050369606,
        "USD":1.0,
        "MXN":22.3488052261,
        "SGD":1.3771703627,
        "AUD":1.4223826715,
        "ILS":3.4835826027,
        "KRW":1175.4942410177,
        "PLN":3.9158500946,
        "BO":6.96 
    }
    if (dictionary[params.source] > 1) {
        var todollar = Number(params.cant) / Number(dictionary[params.source])
    }else{
        var todollar = Number(params.cant) * Number(dictionary[params.source])
    }
    if (dictionary[params.destination] > 1) {
        var todestination = todollar * dictionary[params.destination]

    }else{
        var todestination = todollar / dictionary[params.destination]
    }
    response.status(500).json({
        "source"     : params.source,
        "destination": params.destination,
        "result"     : todestination
    });

})
module.exports = routes;