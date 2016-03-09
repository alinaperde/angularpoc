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
