/**
 * Created by Sivaram on 12/12/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var CommentSchema = require("./comment.schema.server.js")();
    var CommentModel  = mongoose.model("CommentModel", CommentSchema);

    var api = {
        createComment: createComment,
        findCommentById: findCommentById,
        deleteComment: deleteComment,
        setModel: setModel
    };

    return api;

    function createComment(comment) {
        return CommentModel.create(comment);
    }

    function findCommentById(commentId) {
        return CommentModel.findById(commentId);
    }

    function deleteComment(commentId) {
        return CommentModel
            .findById(commentId)
            .then(function (comment) {
                model.branchModel
                    .findBranchById(comment._branch)
                    .then(function (branchObj) {
                        var comments = branchObj.comments;
                        var index = comments.indexOf(commentId);
                        comments.splice(index, 1);
                        branchObj.comments = comments;
                        branchObj.save();
                        return CommentModel
                            .remove({_id: commentId});
                    });
            });
    }

    function setModel(_model) {
        model = _model;
    }

};

