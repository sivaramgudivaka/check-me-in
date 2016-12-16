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
        updateBranch: updateBranch,
        deleteBranch: deleteBranch,
        comments: [{type: mongoose.Schema.Types.ObjectId, ref:'CommentModel'}],
        checkins: [{type: mongoose.Schema.Types.ObjectId, ref:'CheckInModel'}],
        findAllCommentsForBranch : findAllCommentsForBranch,
        findCheckinsForBranch : findCheckinsForBranch,
        setModel: setModel
    };
    return api;

    function createBranch(branch) {
        return BranchModel.create(branch);
    }

    function findBranchById(branchId) {
        return BranchModel.findById(branchId);
    }

    function updateBranch(branchId, branch) {
        return BranchModel
            .update( {_id: branchId}, branch);
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

    function findCheckinsForBranch(branchId) {
        return BranchModel
            .findBranchById(branchId)
            .populate("checkins")
            .exec();
    }

    function setModel(_model) {
        model = _model;
    }

};

