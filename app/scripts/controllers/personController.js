'use strict';
/**
 * PersonController
 */
var personModule = angular.module('controller.person', [ 'service.people' ]);

personModule.controller('PersonListCtrl', function($scope, PeopleService) {
	
    $scope.people = [];
    $scope.selected = null;
    $scope.families = [];
    
	$scope.listFamilies = function() {
		PeopleService.findFamily("").then(function(data) {
			$scope.families = data;
		});
	};
    
    $scope.listPeople = function() {
		PeopleService.findPerson("").then(function(data) {
			$scope.people = data;
		});
	};
	
	$scope.listPeople();
	  
    $scope.selectPerson = function(person) {
		$scope.selected = person;
        $scope.listFamilies();
	};

	$scope.unselectPerson = function() {
		$scope.selected = null;
	};
	
	$scope.isSelected = function(person) {
		return (person && $scope.selected && $scope.selected.pid === person.pid);
	};
    
    $scope.addNewPerson = function() {       
        var person = {};
		person.name = '';
		$scope.people.unshift( person );
        $scope.selectPerson(person);
	};
    
    $scope.isNewPerson = function( person ) {
		return person!=null && person.pid==null;
	};
    
});

personModule.controller('PersonCtrl', function($scope, $log, PeopleService) {
	
    $scope.savePerson = function ( person ) {
        
        if ($scope.personForm.$invalid) {
		    return;
		}
		var promise;
		if ($scope.isNewPerson($scope.selected)) {
			promise = PeopleService.addPerson( person );
		} else {
			promise = PeopleService.updatePerson( person );
		}
        promise.then(function(response) { 
            var data = response.data;
            if (response.statusText == 'OK') {
                $scope.error = false;   
                $scope.message = 'Person ' + person.name + ' is saved.';
		    } else {
                $scope.error = true;   
		    	$scope.message = 'Error encountered.';
                $log.error(response.data);
		    }
            $scope.selected.pid = data.pid;
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
     
    $scope.canSave = function() {
	    return $scope.personForm.$valid && $scope.personForm.$dirty;
	};
    
    $scope.canDelete = function() {
	    return $scope.selected!=null && $scope.selected.pid!=null;
	};
    
    $scope.deletePerson = function( person ) {
        PeopleService.deletePerson(person.pid).then(function( response ) {
           var data = response.data;
            if (response.statusText == 'OK') {
                $scope.error = false;   
                $scope.message = 'Person ' + person.name + ' is removed.';
		    } else {
                $scope.error = true;   
		    	$scope.message = 'Error encountered.';
                $log.error(response.data);
		    }
            $scope.listPeople();
        }); 
	};
    
});