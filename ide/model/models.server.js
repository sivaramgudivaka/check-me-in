/**
 * Created by Sivaram on 12/12/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/check-me-in');

    var userModel = require("./user/user.model.server")();

    var model = {
        userModel: userModel,
    };

    userModel.setModel(model);

    return model;
};
