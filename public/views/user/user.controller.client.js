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
        vm.uid = 0;

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
                        $location.url((type=='BUSINESS'?'/b':'/')+"user/"+user._id);
                    })
                    .error(function (err) {
                        vm.error = err;
                    });
            }
        }
    }

    function RegisterController($location, UserService, BranchService,  $rootScope) {
        var vm = this;
        vm.register = register;

        function register(user, type) {
            if(!user || !user.username || !user.password || !user.password2 || (type == 'BUSINESS' && !user.buName)){
                vm.error = "Username/password/name cannot be empty"
            }else if(user.password != user.password2){
                vm.error = "passwords don't match";
            }else{
                user.role = type;
                UserService
                    .register(user)
                    .success(function (response) {
                        vm.uid = response._id;
                        $rootScope.currentUser = response;
                        if(type=='BUSINESS'){   //add branches
                            UserService
                                .findUserById(vm.uid)
                                .then(function (nuser) {
                                    BranchService
                                        .geolocate()
                                        .then(function (response) {
                                            var data = {
                                                uid: vm.uid,
                                                buName: nuser.data.buName,
                                                lat: response.data.location.lat,
                                                lng: response.data.location.lng
                                            };
                                            BranchService
                                                .populatebranches(data)
                                                .then(function (response) {
                                                    if(response.status == "OK")
                                                        $location.url((type=='BUSINESS'?'/b':'/')+"user/" + response._id + "/branch");
                                                });
                                        });
                                });
                        }
                        else
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
        vm.logout = logout;

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

        function updateUser(user, type) {
            if(user.role == type){ //user cannot change roles!
                var data = {};
                UserService
                    .updateUser(user)
                    .then(function () {
                        $location.url((type=='BUSINESS'?'/b':'/')+"user/"+user._id);
                    });
            }
        }

        function logout(){
            UserService
                .logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $rootScope.isLoggedIn = false;
                    $location.url("/");
                });
        }
    }
})();