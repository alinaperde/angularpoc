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

(function(undefined) {
    'use strict';

    angular
        .module('poc')
        .controller('MainController', MainController);


    MainController.$inject = [];

    function MainController() {

        var vm = this;

    }


})();

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

(function(undefined) {
    'use strict';

    angular
        .module('poc')
        .controller('FirstController', FirstController);

    FirstController.$inject = [];

    function FirstController() {

        var vm = this;

        vm.myCol = 'green';
        vm.name = 'George';
        vm.showContent = true;

    }


})();

(function(undefined) {
    'use strict';

    angular
        .module('poc')
        .controller('SecondController', SecondController);


    SecondController.$inject = ['$http','$scope'];

    function SecondController($http, $scope) {

        var vm = this;

        vm.users = [];
        vm.orderObj = 'City';

        vm.addUser = addUser;
        vm.init = init;

        $scope.$watch('vm.users', function() {
            if (vm.user) {
            	alert("New user added");
            }
        }, true);

        function addUser() {
        	var newUser = vm.user;
        	vm.users.push(newUser);
        	vm.user = {};
        }

        function init() {
            $http.get("../../../assets/data/users.json")
                .success(function (response) {
                    vm.users = response;
                }); 

            // userService.getUsers().then(successGetUsers, errorGetUsers); // commented because no restAPI is available
        }

        function errorGetUsers() {
        	alert("error");
        }

        function successGetUsers() {
        	alert("success");
        }
        
    }


})();

(function() {
    'use strict';


    angular
        .module('poc')
        .factory('nconnector', nconnector);

    nconnector.$inject = ['$location', '$http', 'StorageService'];

    function nconnector($location, $http, StorageService) {

        var service = {
            'request': request,
            'get': get,
            'post': post,
            'del': del,
            'put': put
        };
        return service;

        /**
         * Request method
         * method: rest method to call
         * data: request data
         * callType: POST/GET/DELETE/PUT
         * callback: callback function to call on success
         * errorCallback: callback function to call when errors occur
         */
        function request(method, data, callType, callback, errorCallback) {
            var config = {
                    url: method,
                    method: callType,
                    responseType: 'application/json',
                    headers: {
                        token: StorageService.getValue('user') ? StorageService.getValue('user').token : '',
                        username: StorageService.getValue('user') ? StorageService.getValue('user').username : ''
                    }
                };

            switch(callType){
                case 'GET' :
                    config.params = data;
                    break;
                default:
                    config.data = angular.toJson(data);
            }


            return $http(config)
                        .success(function (data, textStatus, request) {
                            if (callback) {
                                callback(data);
                            }
                        })
                        .error(function (data, ajaxOptions, thrownError) {
                            console.log("Failed...");
                            if (errorCallback) {
                                errorCallback(data, ajaxOptions, thrownError);
                            }
                        });
        }

        /**
         *  Perform a GET request
         */
        function get(method, data, callback, errorCallback) {
            return request(method, data, 'GET', callback, errorCallback);
        }

        /**
         *  Perform a POST request
         */
        function post(method, data, callback, errorCallback) {
            return request(method, data, 'POST', callback, errorCallback);
        }

        /**
        *  Perform a DELETE request
        */
        function del(method, data, callback, errorCallback) {
            return request(method, data, 'DELETE', callback, errorCallback);
        }

        /**
        *  Perform a PUT request
        */
        function put(method, data, callback, errorCallback) {
            return request(method, data, 'PUT', callback, errorCallback);
        }

    }
})();

(function (undefined) {
    'use strict';

    angular
        .module('poc')
        .service('userService', userService);

    userService.$inject = ['$q', 'nconnector'];

    function userService($q, nconnector) {
        var service = {
            'getUsers': getUsers
        };
        return service;

       
        function getUsers() {
            var deferred = $q.defer();

            nconnector.get('/api/users',
                {},
                function(users) {
                    deferred.resolve(users);
                }, function(data, errorCode) {
                    var response = {
                        data: data,
                        errorCode: errorCode
                    };
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }
    }
})();

(function(undefined) {
  'use strict';

   angular
    .module('poc')
    .directive('sampleParagraph', sampleParagraph);

    sampleParagraph.$inject = [];

    function sampleParagraph() {

        var directive = {
            template: '<p>I was made inside a directive</p>',
            link: link
        };
        return directive;

        function link(scope, element, attr) {
            element.on('click', function() {
                element.css('color', '#FF0000');
            });
            element.on('dblclick', function() {
                element.css('color', '#000000');
            });
        }
    }
})();