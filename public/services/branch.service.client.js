/* Created by Sivaram on 12/12/16. */
(function(){
    angular
        .module("CheckMeIn")
        .factory("BranchService", BranchService);

    function BranchService($http) {
        var api = {
            geolocate : geolocate,
            populatebranches : populateBranches,
            createBranch: createBranch,
            findBranchById: findBranchById,
            findAllCommentsForBranch : findAllCommentsForBranch,
            findCheckInsForBranch : findCheckInsForBranch
        };
        return api;

        function geolocate() {
            return $http.get('/api/geolocate');
        }

        function populateBranches(data) {
            return $http.post('/api/populateBranches', data);
        }

        function createBranch(data) {
            return $http.post('/api/branch/create', data);
        }

        function findBranchById(brid) {
            var url = '/api/branch/'+brid;
            return $http.get(url);
        }

        function findAllCommentsForBranch(brid){
            var url = '/api/branch/'+brid+'/comments';
            return $http.get(url);
        }

        function findCheckInsForBranch(brid){
            var url = '/api/branch/'+ brid + '/checkins';
            return $http.get(url);
        }
    }
})();