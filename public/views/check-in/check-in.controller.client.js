/**
 * Created by Sivaram on 12/12/16.
 */
(function(){
    angular
        .module("CheckMeIn")
        .controller("CustCheckInController", CustCheckInController)
        .controller("BusCheckInController", BusCheckInController);

    function CustCheckInController(UserService, CheckInService, $location, $routeParams) {
        var vm = this;
        vm.checkin = checkin;
        vm.checkins = [];

        function init() {
            vm.uid = $routeParams.uid;
            if(uid != 0){
                UserService
                    .findUserById(uid)
                    .success(function (user) {
                        vm.user = user;
                    });
            }
        }
        init();

        function checkin(uid) {
            var brid = $routeParams.brid;
            var data = {
                uid : uid,
                brid : brid
            };
            CheckInService
                .createCheckIn(checkinId)
                .success(function (branch) {
                    vm.checkins = branch.checkins;
                })
                .error(function (err) {
                    console.log(err);
                });
        }
    }

    function BusCheckInController(UserService, CheckInService, $routeParams) {
        var vm = this;
        vm.serveCheckIn = serveCheckIn;
        vm.rejectCheckIn = rejectCheckIn;
        vm.checkins = [];

        function init() {
            vm.uid = $routeParams.uid;
            var brid = $routeParams.brid;
            UserService
                .findUserById(uid)
                .success(function (user) {
                    vm.user = user;
                });
            CheckInService
                .findCheckinsForBranch(brid)
                .success(function (branch) {
                    vm.checkins = branch.checkins;
                });
        }
        init();

        function serveCheckIn(checkInId) {
            CheckInService
                .serveCheckIn(checkInId)
                .success(function (branch) {
                    vm.checkins = branch.checkins;
                });
        }

        function rejectCheckIn(checkInId) {
            CheckInService
                .rejectCheckIn(checkInId)
                .success(function (branch) {
                    vm.checkins = branch.checkins;
                });
        }

    }

})();