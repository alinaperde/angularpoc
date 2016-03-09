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
