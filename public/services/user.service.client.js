/* Created by Sivaram on 12/12/16. */
(function(){
    angular
        .module("CheckMeIn")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            login : login,
            logout : logout,
            register: register,
            createUser : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findAllBranchesForUser : findAllBranchesForUser,
            findAllBusinessNames : findAllBusinessNames,
            findBusinessByName : findBusinessByName,
            updateUser : updateUser,
            deleteUser : deleteUser,
            isLoggedIn : isLoggedIn
        };
        return api;

        function isLoggedIn() {
            return $http.post("/api/isloggedin");
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = '/api/user?username='+username;
            return $http.get(url);
        }

        function findAllBranchesForUser(uid) {
            var url = '/api/user/'+uid+'/branches';
            return $http.get(url);
        }

        function updateUser(user){
            var url = "/api/user/" + user._id;
            $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + uid;
            return $http.delete(url);
        }

        function findAllBusinessNames() {
            return $http.get('/api/user/bnames');
        }

        function findBusinessByName(bname) {
            return $http.get('/api/user/bname/'+bname);
        }
    }
})();