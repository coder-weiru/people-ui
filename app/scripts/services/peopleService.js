'use strict';
/**
 * PeopleService
 */
angular.module('service.people', [])

.constant('SERVICE_CONFIG', {
    URL : 'http://localhost:8080/people-restful'
})

.factory('PeopleService', function($http, SERVICE_CONFIG) {

	var service = {};
	
	/**
	 * API Methods
	 */
	service.getFamily = function(fid) {
		var serviceUrl = SERVICE_CONFIG.URL + "/family/" + fid;
		var getConfig = {
		};
		return $http.get(serviceUrl, getConfig).then(function(response) {
			return response.data;
		});
	}; 

	service.addFamily = function(family) {
		var serviceUrl = SERVICE_CONFIG.URL + "/family";
		var postConfig = {};
		return $http.post(serviceUrl, family, postConfig).then(function(response) {
			return response;
		});
	};

	service.updateFamily = function(family) {
		var serviceUrl = SERVICE_CONFIG.URL + "/family/update";
		var postConfig = {};
		return $http.post(serviceUrl, family, postConfig).then(function(response) {
			return response;
		});
	};

	service.findFamily = function(matchText) {
		var serviceUrl = SERVICE_CONFIG.URL + "/family/find/" + matchText;
		var getConfig = {
		};
		return $http.get(serviceUrl, getConfig).then(function(response) {
			return response.data;
		});
	};

    service.getPerson = function(pid) {
		var serviceUrl = SERVICE_CONFIG.URL + "/person/" + promptid;
		var getConfig = {
		};
		return $http.get(serviceUrl, getConfig).then(function(response) {
			return response.data;
		});
	}; 

	service.addPerson = function(person) {
		var serviceUrl = SERVICE_CONFIG.URL + "/person";
		var postConfig = {};
		return $http.post(serviceUrl, person, postConfig).then(function(response) {
			return response;
		});
	};

	service.updatePerson = function(person) {
		var serviceUrl = SERVICE_CONFIG.URL + "/person/update";
		var postConfig = {};
		return $http.post(serviceUrl, person, postConfig).then(function(response) {
			return response;
		});
	};

	service.findPerson = function(matchText) {
		var serviceUrl = SERVICE_CONFIG.URL + "/person/find/" + matchText;
		var getConfig = {
		};
		return $http.get(serviceUrl, getConfig).then(function(response) {
			return response.data;
		});
	};
    
    service.addPersonToFamily = function(pid, fid) {
		var serviceUrl = SERVICE_CONFIG.URL + "/add/person/" + pid + "/family/" + fid;
		var getConfig = {
		};
		return $http.get(serviceUrl, getConfig).then(function(response) {
			return response.data;
		});
	};
    
    service.removePersonFromFamily = function(pid, fid) {
		var serviceUrl = SERVICE_CONFIG.URL + "/del/person/" + pid + "/family/" + fid;
		var getConfig = {
		};
		return $http.get(serviceUrl, getConfig).then(function(response) {
			return response.data;
		});
	};
    
    service.getFamilyPeople = function(fid) {
		var serviceUrl = SERVICE_CONFIG.URL + "/familyPeople/" + fid;
		var getConfig = {
		};
		return $http.get(serviceUrl, getConfig).then(function(response) {
			return response.data;
		});
	};
    
	return service;		
});