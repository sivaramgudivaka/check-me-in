/**
 * Created by Sivaram on 12/12/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var CheckInSchema = require("./checkin.schema.server.js")();
    var CheckInModel  = mongoose.model("CheckInModel", CheckInSchema);

    var api = {
        createCheckIn: createCheckIn,
        findCheckInById: findCheckInById,
        deleteCheckIn: deleteCheckIn,
        findCheckInByPhone : findCheckInByPhone,
        setModel: setModel
    };
    return api;

    function createCheckIn(data) {

        return CheckInModel
            .create(data)
            .then(function (checkInObj) {
                model.branchModel
                    .findBranchById(data.brid)
                    .then(function (branchObj) {
                        checkInObj._branch = branchObj._id;
                        checkInObj.save();
                        branchObj.checkins.push(checkInObj);
                        branchObj.waitTime = branchObj.waitTime + 15;
                        return branchObj.save();
                    },
                        function (error) {
                            console.log(error);
                        });
            });
    }

    function findCheckInById(checkInId) {
        return CheckInModel.findById(checkInId);
    }

    function findCheckInByPhone(phone) {
        return CheckInModel.findOne({phone:phone});
    }

    function deleteCheckIn(checkInId) {
        return CheckInModel
            .findById(checkInId)
            .then(function (checkInObj) {
                model.branchModel
                    .findBranchById(checkInObj._branch)
                    .then(function (branchObj) {
                            var checkins = branchObj.checkins;
                            var index = checkins.indexOf(checkInId);
                            checkins.splice(index, 1);
                            branchObj.checkins = checkins;
                            branchObj.waitTime = branchObj.waitTime - 15;
                            branchObj.save();
                            return checkInObj.remove({_id:checkInId});
                        });
            });
    }

    function setModel(_model) {
        model = _model;
    }

};

