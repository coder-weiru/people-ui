'use strict';
/**
 * FamilyController
 */
var familyModule = angular.module('controller.family', [ 'service.people' ]);

familyModule.controller('FamilyListCtrl', function($scope, PeopleService) {
	
    $scope.families = [];
    $scope.familyPeople = [];
    $scope.selected = null;
    
	$scope.listFamilies = function() {
		PeopleService.findFamily("").then(function(data) {
			$scope.families = data;
		});
	};
    
    $scope.listFamilyPeople = function(fid) {
		PeopleService.getFamilyPeople(fid).then(function(data) {
			$scope.familyPeople = data;
		});
	};
	
	$scope.listFamilies();
	   
    $scope.selectFamily = function(family) {
		$scope.selected = family;
        $scope.listFamilyPeople(family.fid);
	};

	$scope.unselectFamily = function() {
		$scope.selected = null;
	};
	
	$scope.isSelected = function(family) {
		return (family && $scope.selected && $scope.selected.fid === family.fid);
	};
    
    $scope.addNewFamily = function() {       
        var family = {};
		family.name = '';
		$scope.families.unshift( family );
        $scope.selectFamily(family);
	};
    
    $scope.isNewFamily = function( family ) {
		return family!=null && family.fid==null;
	};
});

familyModule.controller('FamilyCtrl', function($scope, $log, PeopleService) {
	
    $scope.saveFamily = function ( family ) {
        
        if ($scope.familyForm.$invalid) {
		    return;
		}
        var promise;
		if ($scope.isNewFamily($scope.selected)) {
			promise = PeopleService.addFamily( family );
		} else {
			promise = PeopleService.updateFamily( family );
		}
        promise.then(function(response) { 
            var data = response.data;
            if (response.statusText == 'OK') {
                $scope.error = false;   
                $scope.message = 'Family ' + family.name + ' is saved.';
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
     
    $scope.canSave = function() {
	    return $scope.familyForm.$valid && $scope.familyForm.$dirty;
	};
    
    $scope.removePersonFromFamily = function(person) {
        PeopleService.removePersonFromFamily( person.pid, $scope.selected.fid );
        $scope.listFamilyPeople($scope.selected.fid);
    };
    
    $scope.canDelete = function() {
	    return $scope.selected!=null && $scope.selected.fid!=null;
	};
    
    $scope.deleteFamily = function( family ) {
        PeopleService.deleteFamily(family.fid).then(function( response ) {
            var data = response.data;
            if (response.statusText == 'OK') {
                $scope.error = false;   
                $scope.message = 'Family ' + family.name + ' is removed.';
		    } else {
                $scope.error = true;   
		    	$scope.message = 'Error encountered.';
                $log.error(response.data);
		    }
            
            $scope.listFamilies();
        }); 
	};
});