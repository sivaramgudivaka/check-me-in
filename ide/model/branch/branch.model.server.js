/**
 * Created by Sivaram on 12/12/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var BranchSchema = require("./branch.schema.server.js")();
    var BranchModel  = mongoose.model("BranchModel", BranchSchema);

    var api = {
        createBranch: createBranch,
        findBranchById: findBranchById,
        updateWaitTime: updateWaitTime,
        deleteBranch: deleteBranch,
        findAllCommentsForBranch : findAllCommentsForBranch,
        findCheckInsForBranch : findCheckInsForBranch,
        setModel: setModel
    };
    return api;

    function createBranch(uid, branch) {
        return BranchModel
            .create(branch)
            .then(function (branchObj) {
                model.userModel
                    .findUserById(uid)
                    .then(function (userObj) {
                        branchObj._user = userObj._id;
                        branchObj.save();
                        userObj.branches.push(branchObj);
                        return userObj.save();
                    }, function(error){
                            console.log(error);
                        });
            });
    }

    function findBranchById(branchId) {
        return BranchModel.findById(branchId);
    }

    function updateWaitTime(branchId) {
        return BranchModel
            .findById(branchId)
            .then(function (branchObj) {
                branchObj.waitTime = branchObj.waitTime + 15;
                return branchObj.save();
            });
    }

    function deleteBranch(branchId) {
        return BranchModel
            .remove({_id: branchId});
    }

    function findAllCommentsForBranch(branchId) {
        return BranchModel
            .findBranchById(branchId)
            .populate("comments")
            .exec();
    }

    function findCheckInsForBranch(branchId) {
        return BranchModel
            .findById(branchId)
            .populate('checkins')
            .exec();
    }

    function setModel(_model) {
        model = _model;
    }

};

