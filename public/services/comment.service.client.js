/* Created by Sivaram on 12/12/16. */
(function(){
    angular
        .module("CheckMeIn")
        .factory("CommentService", CommentService);

    function CommentService($http) {
        var api = {
            createComment : createComment,
            findCommentById: findCommentById,
        };
        return api;

        function createComment(comment) {
            return $http.post("/api/comment", comment);
        }

        function findCommentById(commentId) {
            var url = "/api/comment/"+commentId;
            return $http.get(url);
        }
    }
})();