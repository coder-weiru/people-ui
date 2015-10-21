'use strict';
/**
 * PersonController
 */
var personModule = angular.module('controller.person', [ 'service.people' ]);

personModule.controller('PersonListCtrl', function($scope, PeopleService) {
	
    $scope.people = [];
    $scope.selected = null;
    
	$scope.listPeople = function() {
		PeopleService.findPerson("").then(function(data) {
			$scope.people = data;
		});
	};
	
	$scope.listPeople();
	
    
    $scope.selectPerson = function(person) {
		$scope.selected = person;
	};

	$scope.unselectPerson = function() {
		$scope.selected = null;
	};
	
	$scope.isSelected = function(person) {
		return (person && $scope.selected && $scope.selected.pid === person.pid);
	};
    
});

personModule.controller('PersonCtrl', function($scope, $log, PeopleService) {
	
    $scope.savePerson = function ( person ) {
        
        if ($scope.personForm.$invalid) {
		    return;
		}
		var promise = PeopleService.updatePerson( person );
		
        promise.then(function(response) { 
            var data = response.data;
            if (response.statusText == 'OK') {
                $scope.error = false;   
                $scope.message = 'Person is saved.';
		    } else {
                $scope.error = true;   
		    	$scope.message = 'Error encountered.';
                $log.error(response.data);
		    }
		}, function(response) { 
            var data = response.data;
            $scope.error = true;                 
			if (data.httpStatus == 'BAD_REQUEST' || data.httpStatus == 'INTERNAL_SERVER_ERROR') {
                $scope.message = response.data.message;   
		    } else {
                $scope.message = 'Error encountered.';
		    }
            $log.error(response.data);
		});
	};
     
});