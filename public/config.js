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
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/search", {
                templateUrl: "views/search/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/:uid/check-in/:buName/:brName", {
                templateUrl: "views/check-in/check-in.view.client.html",
                controller: "CheckInController",
                controllerAs: "model"
            })
            .when("/:uid/check-in/:buName/:brName/reviews", {
                templateUrl: "views/review/review.view.client.html",
                controller: "ReviewController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })///website
            .when("/user/:uid/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })//////page
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })/////widget
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new/:type", {
                templateUrl: "views/widget/widget-new.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model"
            })
            .when ("/user", {
                templateUrl: "views/user/profile.view.client.html",
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