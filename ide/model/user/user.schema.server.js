/**
 * Created by Sivaram on 11/25/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: String,
        buName: String,
        password : String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        branches: [{type: mongoose.Schema.Types.ObjectId, ref:'BranchModel'}],
        dateCreated: Date,
        facebook: {
            id:    String,
            token: String
        },
        role: {type: String, enum: ['BUSINESS', 'CUSTOMER']}
    }, {collection: "user"});
    return UserSchema;
};