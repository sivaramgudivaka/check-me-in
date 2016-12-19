/**
 * Created by Sivaram on 12/12/16.
 */
(function(){
    angular
        .module("CheckMeIn")
        .controller("CustCheckInController", CustCheckInController)
        .controller("BusCheckInController", BusCheckInController);

    function CustCheckInController(UserService, CheckInService, BranchService, $routeParams) {
        var vm = this;
        vm.checkinHere = checkinHere;
        vm.checkins = [];

        function init() {
            vm.uid = $routeParams.uid;
            vm.brid = $routeParams.brid;
            if(vm.uid != 0) {
                UserService
                    .findUserById(vm.uid)
                    .success(function (user) {
                        vm.user = user;
                    });
            }
            BranchService
                .findBranchById(vm.brid)
                .success(function (branch) {
                    vm.branch = branch;
                });
        }
        init();

        function checkinHere(user) {
            if(!user || !user.firstName || !user.lastName){
                vm.error = "all the fields are required";
                vm.chkdin = false;
            }else{
                var brid = $routeParams.brid;
                var data = {
                    uid : user._id || 0,
                    brid : brid,
                    FirstName : user.firstName,
                    LastName : user.lastName,
                    phone : user.phone,
                    checkInTime : new Date()
                };
                CheckInService
                    .createCheckIn(data)
                    .success(function (response) {
                        vm.chkdin = true;
                        vm.error = false;
                    })
                    .error(function (err) {
                        vm.error = "You've already checkd in";
                    });
            }
        }
    }

    function BusCheckInController(UserService, BranchService, CheckInService, $routeParams) {
        var vm = this;
        vm.serveCheckIn = serveCheckIn;
        vm.checkins = [];
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
                .findCheckInsForBranch(brid)
                .success(function (branch) {
                    vm.checkins = branch.checkins;
                });
        }
        init();

        function serveCheckIn(checkInId) {
            CheckInService
                .deleteCheckIn(checkInId);
            BranchService
                .findCheckInsForBranch(brid)
                .success(function (branch) {
                    vm.checkins = branch.checkins;
                });
        }

    }

})();