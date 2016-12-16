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
        setModel: setModel
    };
    return api;

    function createCheckIn(checkin) {
        return CheckInModel.create(checkin);
    }

    function findCheckInById(checkInId) {
        return CheckInModel.findById(checkInId);
    }


    function deleteCheckIn(checkInId) {
        return CheckInModel
            .remove({_id: CheckInId});
    }

    function setModel(_model) {
        model = _model;
    }

};

