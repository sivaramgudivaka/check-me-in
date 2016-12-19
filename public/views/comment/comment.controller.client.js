/**
 * Created by Sivaram on 12/12/16.
 */
(function(){
    angular
        .module("CheckMeIn")
        .controller("CommentController", CommentController);

    function CommentController(UserService, BranchService, CommentService, $routeParams) {
        var vm = this;
        vm.postComment = postComment;
        vm.formatDate = formatDate;
        vm.comments = [];
        var brid;

        function init() {
            vm.uid = $routeParams.uid;
            brid = $routeParams.brid;
            UserService
                .findUserById(vm.uid)
                .success(function (user) {
                    vm.user = user;
                });
            BranchService
                .findAllCommentsForBranch(brid)
                .success(function (branch) {
                    vm.branch = branch;
                    populateComments(branch.comments);
                });
        }
        init();

        function postComment(commentText) {
            if(!commentText){
                vm.error = "Comment required";
            }else{
                var data = {
                    user : vm.user._id,
                    text: commentText,
                    branch : brid,
                    dateCreated : new Date()
                };
                CommentService
                    .createComment(data)
                    .then(function (response) {
                        BranchService
                            .findAllCommentsForBranch(brid)
                            .then(function (response) {
                                populateComments(response.data.comments);
                            });
                    });
            }
        }

        function populateComments(cmnts) {
            vm.comments = [];
            for(var i in cmnts){
                CommentService
                    .findCommentById(cmnts[i])
                    .success(function (comment) {
                        vm.comments.push(comment);
                    });
            }
        }

        function formatDate(date) {
            var jsDate = new Date(date);
            return jsDate.toLocaleDateString();
        }
    }

})();