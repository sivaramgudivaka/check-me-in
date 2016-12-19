/**
 * Created by Sivaram on 12/18/16.
 */
module.exports = function(app, model) {

    app.post('/api/checkin', createCheckIn);
    app.get('/api/checkin/:cid', findCheckInById);
    app.delete('/api/checkin/delete/:cid', deleteCheckIn);

    function createCheckIn(req, res) {
        var data = req.body;
        // model
        //     .checkInModel
        //     .createCheckIn(data)
        //     .then(function(checkin) {
        //             res.send(checkin);
        //         },
        //         function (error) {
        //             res.sendStatus(400).send(error);
        //         });
        model
            .checkInModel
            .findCheckInByPhone(data.phone)
            .then(function (checkin) {
                if(checkin != null)
                    res.sendStatus(400).send("you've already checked-in");
                else {
                    model.checkInModel
                        .createCheckIn(data)
                        .then(function (checkin) {
                                res.send(checkin);
                            },
                            function (error) {
                                res.sendStatus(400).send(error);
                            });
                }
            });
            // ,
            //     function (error) {
            //         res.send(error);
            //     });
    }

    function findCheckInById(req, res) {
        model
            .checkInModel
            .findCheckInById(req.params.cid)
            .then(
                function (checkin) {
                    if(checkin) {
                        res.send(checkin);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function deleteCheckIn(req, res) {
        model
            .checkInModel
            .deleteCheckIn(req.params.cid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }
};