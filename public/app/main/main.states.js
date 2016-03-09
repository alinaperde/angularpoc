(function(undefined) {
    'use strict';

    angular
        .module('poc')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.
            state('main.firstChild', {
                url: '/first',
                templateUrl: 'app/main/first/firstChild.tmpl.html',
                controller: 'FirstController',
                controllerAs: 'vm'
            })
            .state('main.secondChild', {
                url: '/second',
                templateUrl: 'app/main/second/secondChild.tmpl.html',
                controller: 'SecondController',
                controllerAs: 'vm'
            })
    }

})();
