angular
    .module('poc', ['ui.router'])
    .config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
    $stateProvider.
        state('main', {
            abstract: true,
            url: '/main',
            templateUrl: 'app/main/main.tmpl.html',
            controller: 'MainController',
            controllerAs: 'vm'
        })
    $urlRouterProvider.otherwise('/main/first');
}
