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
