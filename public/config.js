/**
 * Created by Sivaram on 12/12/16.
 */
(function() {
    angular
        .module("CheckMeIn")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/cuLogin", {
                templateUrl: "views/user/cust.login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/buLogin", {
            templateUrl: "views/user/bus.login.view.client.html",
            controller: "LoginController",
            controllerAs: "model"
            })
            .when("/cuRegister", {
                templateUrl: "views/user/cust.register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/buRegister", {
                templateUrl: "views/user/bus.register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/cust.profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/buser/:uid", {
                templateUrl: "views/user/bus.profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/buser/:uid/branch", {
                templateUrl: "views/branch/bus.select.view.client.html",
                controller: "BusBranchController",
                controllerAs: "model"
            })
            .when("/user/:uid/branch", {
                templateUrl: "views/branch/cust.select.view.client.html",
                controller: "CustBranchController",
                controllerAs: "model"
            })
            .when("/buser/:uid/branch/:brid", {
                templateUrl: "views/check-in/bus.checkin.view.client.html",
                controller: "BusCheckInController",
                controllerAs: "model"
            })
            .when("/user/:uid/branch/:brid", {
                templateUrl: "views/check-in/cust.checkin.view.client.html",
                controller: "CustCheckInController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/cust.profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/user/:uid/branch/:brid/comments", {
                templateUrl: "views/comment/cust.comment.view.client.html",
                controller: "CommentController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/cust.profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .otherwise({
                redirectTo: "/"
            });
    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url('/');
            }
        });
        return deferred.promise;
    };
})();