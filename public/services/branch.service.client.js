/* Created by Sivaram on 12/12/16. */
(function(){
    angular
        .module("CheckMeIn")
        .factory("BranchService", BranchService);

    function BranchService($http) {
        var api = {
            geolocate : geolocate,
            nearsearch : nearsearch,
            populatebranches : populateBranches,
            createBranch: createBranch,
            findBranchById: findBranchById
            //findAllCommentsForBranch : findAllCommentsForBranch
        };
        return api;

        function geolocate() {
            return $http.get('/api/geolocate');
        }

        function nearsearch(data) {
            return $http.post('/api/nearsearch', data);
        }

        function populateBranches(data) {
            return $http.post('/api/populateBranches', data);
        }

        function createBranch(data) {
            return $http.post('/api/createbranch', data);
        }

        function findBranchById(brid) {
            return $http.get('/api/branch/'+brid);
        }
    }
})();