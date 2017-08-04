(function(angular){
	// 1.创建正在热映模块
	var app = angular.module('coming_soon', ['ngRoute', 'myJsonpService']);

	// 2.配置路由规则
	app.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/coming_soon/:page?', {
			templateUrl: 'coming_soon/coming_soon.html',
			controller: 'coming_soonController'
		});
	}]);

	// 3.创建正在热映控制器
	app.controller('coming_soonController', [
		'$scope', 
		'$http',
		'$routeParams',
		'$route',
		'$window',
		'myService',
		function($scope, $http, $routeParams, $route, $window, myService){
			// console.log($routeParams);
			// 每页几条数据
			$scope.pageSize = 5;
			// 第几页，如果url中没有page则默认是第一页
			$scope.page = ($routeParams.page || '1') - 0;
			var start = ($scope.page - 1) * 5;
			// 自己封装的方法
			myService.myJsonp('http://api.douban.com/v2/movie/coming_soon', 
				{start: start, count: $scope.pageSize}, function(data){
					$scope.totalPage = $window.Math.ceil(data.total / $scope.pageSize);
					// 异步给数据模型赋值，angular不会知道
					$scope.data = data;
					// 使用$apply()将数据模型的值重新渲染到页面上
					$scope.$apply();
				});

			$scope.getPage = function(nowPage){
				if(nowPage <= 0 || nowPage > $scope.totalPage){
					return;
				}
				// 这个方法可以改变url中锚点的参数部分
				$route.updateParams({page: nowPage});
			};
	}]);
})(angular);