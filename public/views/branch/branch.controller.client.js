/**
 * Created by Sivaram on 12/15/16.
 */
(function(){
    'use strict';
    angular
        .module("CheckMeIn")
        .controller("BusBranchController", BusBranchController)
        .controller("CustBranchController", CustBranchController);

    function BusBranchController($routeParams, UserService) {
        var vm = this;
        vm.bbranches = [];

        function init() {
            vm.uid = $routeParams.uid;
            UserService
                .findAllBranchesForUser(vm.uid)
                .success(function (branches) {
                   vm.bbranches = branches;
                })
                .error(function(msg){
                    console.log(msg);
                });
        }
        init();
    }

    function CustBranchController($routeParams, UserService) {
        var vm = this;
        vm.findBusiness = findBusiness;

        function init() {
            vm.uid = $routeParams.uid;
            UserService
                .findUserById(vm.uid)
                .success(function (user) {
                    vm.user = user;
                })
                .error(function (msg) {
                    console.log(msg);
                });
        }
        init();

        function findBusiness(searchText) {
            UserService
                .findBusinessByName(searchText)
                .success(function (business) {
                    if(business)
                        findBranches(business._id);
                    else
                        vm.branches = [];
                })
                .error(function (msg) {
                    console.log(msg);
                });
        }

        function findBranches(buid) {
            UserService
                .findAllBranchesForUser(buid)
                .success(function (branches) {
                    vm.branches = branches;
                });
        }


      /*  var links = [{name: "abc", link: "http://www.example1.com"},
            {name: "nbc", link: "http://www.example2.com"}];

        var source = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('buName'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: vm.results
        });

        source.initialize();

        $('#the-basics .typeahead').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        }, {
            name: 'matched-links',
            displayKey: 'name',
            source: source.ttAdapter(),
            templates: {
                empty: [
                    '<div class="empty-message">',
                    'unable to find matches',
                    '</div>'
                ].join('\n'),
                // suggestion: Handlebars.compile('<p><a href="{{link}}">{{name}}</a></p>')
                suggestion: Handlebars.compile('<p><a ng-click="{{name}}">{{name}}</a></p>')
            }
        });


        function setBusiness() {
            var text = $('#searchText').val();
            if(!text)
                vm.results= [];
            else{
                var item ={
                    "name" : text,
                    "addr" : "75 peterborough st, Boston, MA, 02215",
                    "dist": 2,
                    "branch" : 1
                };
            }
        }*/

    }

})();