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