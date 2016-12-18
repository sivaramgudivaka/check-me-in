/* Created by Sivaram on 12/12/16. */
(function(){
    angular
        .module("CheckMeIn")
        .factory("CheckInService", CheckInService);

    function CheckInService($http) {

        var api = {
            createCheckIn : createCheckIn,
            findCheckInById : findCheckInById,
            deleteCheckIn : deleteCheckIn
        };
        return api;

        function createCheckIn(user) {
            return $http.post('/api/checkin', user);
        }

        function findCheckInById(checkinId) {
            var url = '/api/checkin/'+checkinId;
            return $http.get(url);
        }

        function deleteCheckIn(checkInId) {
            var url = '/api/checkin/delete/' + checkInId;
            return $http.delete(url);
        }

    }
})();