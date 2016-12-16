/**
 * Created by Sivaram on 11/25/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var CheckInSchema = mongoose.Schema({
        _user : {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
        _branch : {type: mongoose.Schema.Types.ObjectId, ref:"BranchModel"},
        userFullName: String,
        phone: String,
        checkInTime: Date,
    }, {collection: "checkin"});
    return CheckInSchema;
};