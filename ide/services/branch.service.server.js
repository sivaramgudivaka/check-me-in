module.exports = function(app, model) {

    var unirest = require('unirest');
    var authKeys = require('../api.key');

    app.get('/api/geolocate', getcoords);
    app.post('/api/populateBranches', populateBranches);
    app.get('/api/branch/:brid', findBranchById);
    app.post('/api/branch/create', createBranch);
    app.post('/api/branch/:brid/updateWait', updateWaitTime);
    app.get('/api/branch/:brid/comments', findAllCommentsForBranch);
    app.get('/api/branch/:brid/checkins', findCheckInsForBranch);

    function findAllCommentsForBranch(req, res) {
        model.branchModel
            .findBranchById(req.params.brid)
            .then(function (branch) {
                res.json(branch);
            });
    }

    function updateWaitTime(req, res) {
        model.branchModel
            .findBranchById(req.params.brid)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }

    function findCheckInsForBranch(req, res) {
        model
            .branchModel
            .findCheckInsForBranch(req.params.brid)
            .then(function (branch) {
                res.json(branch);
            });
    }

    function getcoords(req, res) {
        // unirest.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDcdqRB3SIJXrUiQh-oTfw28aKVMiGVdH0')
        unirest.post('https://www.googleapis.com/geolocation/v1/geolocate?key='+authKeys.google.geoKey)
            .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
            .end(function (response) {
                res.json(response.body);
            });
    }

    function createBranch(req, res) {
        var data = req.body;
        model
            .branchModel
            .createBranch(data)
            .then(
                function(branch) {
                    res.send(branch);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findBranchById(req, res) {
        model
            .branchModel
            .findBranchById(req.params.brid)
            .then(function (response) {
                res.json(response);
            });
    }

    function addBranches(req, res){
        var branches = req.results;
        for(var i in branches){
            var branch = branches[i];
            if(branch.permanently_closed != 'true'){
                var Branch = {
                    name : branch.name,
                    address : branch.vicinity,
                    waitTime : 0
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
        // str += 'AIzaSyAYgmu4Ye1O24ipull8rjuyYvXHZ6hELXo';
        str += authKeys.google.placesKey;
       console.log(str);
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