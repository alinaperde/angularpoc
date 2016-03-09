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
