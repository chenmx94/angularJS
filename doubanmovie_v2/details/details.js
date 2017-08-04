(function(angular){
	var app = angular.module('details', ['ngRoute', 'myJsonpService']);

	app.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/details/:id', {
			templateUrl: 'details/details.html',
			controller: 'detailsController'
		});
	}]);

	app.controller('detailsController', [
		'$scope',
		'$routeParams',
		'myService', 
		function($scope, $routeParams, myService){
			myService.myJsonp('http://api.douban.com/v2/movie/subject/' + $routeParams.id, {}, function(data){
				$scope.data = data;
				$scope.$apply();
			});
	}])
})(angular);