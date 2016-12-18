/**
 * Created by Sivaram on 11/25/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var BranchSchema = mongoose.Schema({
        _user : {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
        name : String,
        address: String,
        comments: [{type: mongoose.Schema.Types.ObjectId, ref:'CommentModel'}],
        checkins: [{type: mongoose.Schema.Types.ObjectId, ref:'CheckInModel'}],
        dateCreated: Date,
        waitTime : Number,
        queueNum : Number
    }, {collection: "branch"});
    return BranchSchema;
};