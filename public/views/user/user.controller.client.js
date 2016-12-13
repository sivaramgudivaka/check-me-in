/**
 * Created by Sivaram on 12/12/16.
 */
(function(){
    angular
        .module("CheckMeIn")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        vm.logout = logout;

        function logout(){
            UserService
                .logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/");
                });
        }

        function login(user, type) {
            user.type = type;
            UserService
                .login(user)
                .success(function (user) {
                    vm.user = user;
                    $location.url("/user/" + user._id);
                })
                .error(function (err) {
                    vm.error = err;
                });
        }
    }

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;
        function register(user, type) {
            user.type = type;
            UserService
                .register(user)
                .then(function(response) {
                    var user = response.data;
                    $rootScope.currentUser = user;
                    $location.url("/user/"+user._id);
                });
        }
        vm.register = register;
    }

    function ProfileController($location, $routeParams, UserService, $rootScope) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.updateUser = updateUser;

        if ($location.url() == "/user"){
            vm.user = $rootScope.currentUser;
        }else{
            UserService.findUserById(userId)
                .success(function (user) {
                    vm.user = user;
                });
        }

        function updateUser(user) {
            UserService.updateUser(user);
            $location.url("/user/" + user._id + "/website");
        }
    }
})();