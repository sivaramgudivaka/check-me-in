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
        setModel: setModel
    };

    return api;

    function createComment(comment) {
        return CommentModel
            .create(comment)
            .then(function(commentObj){
                model.branchModel
                    .findBranchById(comment.branch)
                    .then(function(branchObj){
                        model.userModel
                            .findUserById(comment.user)
                            .then(function (userObj) {
                                commentObj._user = userObj._id;
                                commentObj._branch = branchObj._id;
                                commentObj.save();
                                branchObj.comments.push(commentObj);
                                return branchObj.save();
                            });

                    }, function(error){
                        console.log(error);
                    });
            });
    }

    function findCommentById(commentId) {
        return CommentModel.findById(commentId);
    }

    function setModel(_model) {
        model = _model;
    }

};

