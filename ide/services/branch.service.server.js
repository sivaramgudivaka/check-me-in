module.exports = function(app, model) {

    var unirest = require('unirest');

    app.get('/api/geolocate', getcoords);
    app.post('/api/populateBranches', populateBranches);

    function getcoords(req, res) {
        unirest.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDcdqRB3SIJXrUiQh-oTfw28aKVMiGVdH0')
            .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
            .end(function (response) {
                res.json(response.body);
            });
    }

    function addBranches(req, res){
        var branches = req.results;
        for(var i in branches){
            var branch = branches[i];
            if(branch.permanently_closed != 'true'){
                var Branch = {
                    name : branch.name,
                    address : branch.vicinity
                };

                model
                    .branchModel
                    .createBranch(req.uid, Branch)
                    .then(function (error) {
                            res.sendStatus(400).send(error);
                        });
            }
        }
        res.send({"status": "OK"});
    }

   function populateBranches(req, res) {
       var data = req.body;
        var str = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
        str += data.lat+','+data.lng+'&rankby=distance&keyword='+data.buName+'&key=';
        str += 'AIzaSyAYgmu4Ye1O24ipull8rjuyYvXHZ6hELXo';
        unirest.post(str)
            .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
            .end(function (response) {
                if(response.body.status == 'OK'){
                    var reqObj = response.body;
                    reqObj.uid = data.uid;
                    addBranches(reqObj, res);
                }
                else
                    res.json({"status" : "NOT OK"});
            });
    }

}