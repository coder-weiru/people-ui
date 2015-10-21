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
    
});

familyModule.controller('FamilyCtrl', function($scope, $log, PeopleService) {
	
    $scope.saveFamily = function ( family ) {
        
        if ($scope.familyForm.$invalid) {
		    return;
		}
		var promise = PeopleService.updateFamily( family );
		
        promise.then(function(response) { 
            var data = response.data;
            if (response.statusText == 'OK') {
                $scope.error = false;   
                $scope.message = 'Family is saved.';
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