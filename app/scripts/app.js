'use strict';

var appModule = angular.module('MainApp', ['controller.person', 'controller.family', 'snap', 'ngRoute']);

appModule.run(function($rootScope, $http, $window, $q, $location) {

    document.addEventListener("deviceready", function () {
        FastClick.attach(document.body);
        StatusBar.overlaysWebView(false);
    }, false);

});

appModule.controller('MainCtrl', function($scope, $routeParams) {
    
    $scope.showMenu = true;

    $scope.toggleMenu = function () {
        $scope.showMenu = !$scope.showMenu;
    }

    $scope.snapOptions = {
        disable: 'right'
    };
});

appModule.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/dashboard/1', {
        templateUrl: 'views/partials/person.html',
        controller: 'MainCtrl'
      }).
      when('/dashboard/2', {
        templateUrl: 'views/partials/family.html',
        controller: 'MainCtrl'
      }).
      otherwise({
        redirectTo: '/dashboard/1'
      });
}]);