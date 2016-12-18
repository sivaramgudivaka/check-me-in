module.exports = function(app, model) {

    var unirest = require('unirest');


    app.get('/api/geolocate', getcoords);
    app.post('/api/populateBranches', populateBranches);

    function getcoords(req, res) {
        // unirest.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyApxkYjKx1DqTMSXcLzbLcTuziSlbvs0bk')
        unirest.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDcdqRB3SIJXrUiQh-oTfw28aKVMiGVdH0')
            .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
            .end(function (response) {
                res.json(response.body);
            });
    }

   function populateBranches(req, res) {
       var data = req.body;
       console.log(data);
        var str = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
        str += data.lat+','+data.lng+'&rankby=distance&keyword='+data.buName+'&key=';
        str += 'AIzaSyAYgmu4Ye1O24ipull8rjuyYvXHZ6hELXo';
        console.log(str);
        unirest.post(str)
            .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
            .end(function (response) {
                res.json(response.body);
            });
    }

}