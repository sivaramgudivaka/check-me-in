/**
 * Created by Sivaram on 11/25/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var BranchSchema = mongoose.Schema({
        _user : {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
        address: String,
        phone: String,
        comments: [{type: mongoose.Schema.Types.ObjectId, ref:'CommentModel'}],
        dateCreated: Date,
        waitTime : Number,
        queueNum : Number
    }, {collection: "branch"});
    return BranchSchema;
};