/**
 * Created by Sivaram on 12/12/16.
 */
(function(){
    angular
        .module("CheckMeIn")
        .controller("CheckInController", CheckInController);

    function CheckInController($location, $routeParams) {
        var vm = this;
        vm.checkIn = checkIn;

        function init() {
            vm.uid = $routeParams.uid;
            vm.buName = $routeParams.buName;
            vm.brName = $routeParams.brName;
            vm.uid = $routeParams.uid;
            vm.time = new Date();
        }

        init();

        function checkIn() {
            console.log(vm.buName);
            console.log(vm.brName);
            console.log(vm.uid);
        }

        vm.isLoggedIn = isLoggedIn;

        function isLoggedIn() {
            return false;
        }


    }
})();