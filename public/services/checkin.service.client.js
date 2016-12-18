/* Created by Sivaram on 12/12/16. */
(function(){
    angular
        .module("CheckMeIn")
        .factory("CheckInService", CheckInService);

    function CheckInService($http) {

        var api = {
            createCheckIn : createCheckIn,
            findCheckInById : findCheckInById,
            findCheckInsForBranch : findCheckInsForBranch,
            deleteCheckIn : deleteCheckIn,
            serveCheckIn : serveCheckIn
        };
        return api;

        function createCheckIn(user) {
            return $http.post("/api/checkin", user);
        }

        function findCheckInById(checkinId) {
            var url = "/api/checkin/"+checkinId;
            return $http.get(url);
        }

        function deleteCheckIn(checkInId) {
            var url = "/api/checkin/" + checkInId;
            return $http.delete(url);
        }

        function findCheckInsForBranch(branchId) {
            return $http.get('/api/checkins/'+ branchId);
        }

        function serveCheckIn(checkinId) {
            return $http.post('/api/checkin/serve', checkinId);
        }

        function rejectCheckIn(checkinId) {
            return $http.post('/api/checkin/reject', checkinId);
        }
    }
})();