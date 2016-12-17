/* Created by Sivaram on 12/12/16. */
(function(){
    angular
        .module("CheckMeIn")
        .factory("BranchService", BranchService);

    function BranchService($http) {
        var api = {
            geolocate : geolocate,
            nearsearch : nearsearch,
            populatebranches : populateBranches
            /*createBranch: createBranch,
            findBranchById: findBranchById,
            updateBranch: updateBranch,
            deleteBranch: deleteBranch,
            findAllCommentsForBranch : findAllCommentsForBranch,
            findCheckinsForBranch : findCheckinsForBranch*/
        };
        return api;

        function geolocate() {
            return $http.get('/api/geolocate');
        }


        function nearsearch(data) {
            return $http.post('/api/nearsearch', data);
        }

        function populateBranches(data) {
            console.log(data);
            return $http.post('/api/populateBranches', data);
        }
    }
})();