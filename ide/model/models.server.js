/**
 * Created by Sivaram on 12/12/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/check-me-in');

    var userModel = require("./user/user.model.server")();
    var branchModel = require("./branch/branch.model.server")();
    var commentModel = require("./comment/comment.model.server")();
    var checkInModel = require("./checkin/checkin.model.server")();

    var model = {
        userModel: userModel,
        branchModel: branchModel,
        commentModel: commentModel,
        checkInModel: checkInModel
    };

    userModel.setModel(model);
    branchModel.setModel(model);
    commentModel.setModel(model);
    checkInModel.setModel(model);

    return model;
};
