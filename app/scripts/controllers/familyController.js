'use strict';
/**
 * FamilyController
 */
var familyModule = angular.module('controller.family', [ 'service.people' ]);

familyModule.controller('FamilyListCtrl', function($scope, PeopleService) {
	
    $scope.families = [];
    $scope.selected = null;
    
	$scope.listFamilies = function() {
		PeopleService.findFamily("").then(function(data) {
			$scope.families = data;
		});
	};
	
	$scope.listFamilies();
	   
    $scope.selectFamily = function(family) {
		$scope.selected = family;
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
	
    var family = $scope.family;
    
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
    
});