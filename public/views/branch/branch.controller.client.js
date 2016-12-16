/**
 * Created by Sivaram on 12/15/16.
 */
(function(){
    'use strict';
    angular
        .module("CheckMeIn")
        .controller("BranchController", BranchController);

    function BranchController($routeParams) {
        var vm = this;
        vm.results = [];
        vm.setBusiness = setBusiness;

        function init() {
            vm.uid = $routeParams.uid;
        }

        init();

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
                vm.bName = text;
                vm.results.push(item);
            }
        }

        var links = [{name: "abc", link: "http://www.example1.com"},
            {name: "nbc", link: "http://www.example2.com"}];

        var source = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: links
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
    }

})();