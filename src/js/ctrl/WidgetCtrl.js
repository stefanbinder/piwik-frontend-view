'use strict';

piwikapp.controller('WidgetCtrl', ['$scope', function($scope) {
	var details = {};

	details.hash = window.location.hash;
	details.url = window.location.location;

	$scope.loadModule = function(name) {
		return name;
	}

}]);