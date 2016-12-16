/**
 * Created by Sivaram on 11/25/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var CommentSchema = mongoose.Schema({
        _branch : {type: mongoose.Schema.Types.ObjectId, ref:"BranchModel"},
        _user : {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
        text : String,
        dateCreated: Date,
    }, {collection: "comment"});
    return CommentSchema;
};