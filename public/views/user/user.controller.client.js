/**
 * Created by Sivaram on 12/12/16.
 */
(function(){
    angular
        .module("CheckMeIn")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;
        vm.logout = logout;
        vm.uid = "guest";

        function isLoggedIn() {
            UserService
                .isLoggedIn()
                .then(function (response) {
                    $rootScope.isLoggedIn = response.data;
                });
        }

        isLoggedIn();

        function logout(){
            UserService
                .logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $rootScope.isLoggedIn = false;
                    $location.url("/");
                });
        }

        function login(user, type) {
            if(!user || !user.username || !user.password){
                vm.error = "Username/password cannot be empty"
            }
            else{
                user.role = type;
                UserService
                    .login(user)
                    .success(function (user) {
                        vm.user = user;
                        vm.uid = user._id;
                        $rootScope.isLoggedIn = true;
                        $location.url("/user/"+user._id);
                    })
                    .error(function (err) {
                        vm.error = err;
                    });
            }
        }
    }

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;
        vm.register = register;

        function register(user, type) {
            if(!user || !user.username || !user.password || !user.password2 || (type == 'bus' && !user.buName)){
                vm.error = "Username/password/name cannot be empty"
            }else if(user.password != user.password2){
                vm.error = "passwords don't match";
            }
            else {
                user.role = type;
                UserService
                    .register(user)
                    .success(function (response) {
                        vm.uid = response._id;
                        $rootScope.currentUser = response;
                        $location.url("/user/"+response._id);
                    })
                    .error(function (res) {
                        vm.error = res;
                    });
            }
        }

    }

    function ProfileController($location, $routeParams, UserService, $rootScope) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.updateUser = updateUser;

        if ($location.url() == "/user"){
            vm.user = $rootScope.currentUser;
            $rootScope.isLoggedIn = true;
        }else{
            UserService.findUserById(userId)
                .success(function (user) {
                    vm.uid = user._id;
                    vm.user = user;
                });
        }

        function updateUser(user) {
            UserService.updateUser(user);
            $location.url("/user/" + user._id + "/branch");
        }
    }
})();