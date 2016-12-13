/**
 * Created by Sivaram on 11/25/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
        dateCreated: Date,
        facebook: {
            id:    String,
            token: String
        },
        role: {type: String, enum: ['ADMIN', 'STUDENT', 'FACULTY']}
    }, {collection: "user"});
    return UserSchema;
};