/**
 * Created by Sivaram on 12/12/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel  = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findAllBranchesForUser: findAllBranchesForUser,
        findUserByFacebookId: findUserByFacebookId,
        findAllBusinessNames : findAllBusinessNames,
        findBusinessByName : findBusinessByName,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function findAllBranchesForUser(userId) {
        return UserModel
            .findById(userId)
            .populate('branches')
            .exec();
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function deleteUser(userId) {
        return UserModel
            .remove({_id: userId});
    }

    function findUserByUsername(username) {
        return UserModel.findOne({
            username: username
        });
    }

    function findAllBusinessNames() {
        return UserModel.find({role : 'BUSINESS'});
    }

    function findBusinessByName(bname) {
        return UserModel.findOne({buName : bname});
    }

    function updateUser(userId, user) {
        return UserModel
            .update( {_id: userId}, user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function createUser(user) {
        return UserModel.create(user);
    }
};
