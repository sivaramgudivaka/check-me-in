/**
 * Created by Sivaram on 11/25/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var CheckInSchema = mongoose.Schema({
        _user : {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
        _branch : {type: mongoose.Schema.Types.ObjectId, ref:"BranchModel"},
        FirstName: String,
        LastName: String,
        phone : String,
        checkInTime: Date,
        waitTime: Number,
        status : String
    }, {collection: "checkin"});
    return CheckInSchema;
};