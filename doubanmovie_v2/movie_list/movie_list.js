(function(angular){
	// 1.创建正在热映模块
	var app = angular.module('movie_list', ['ngRoute', 'myJsonpService']);

	// 2.配置路由规则
	app.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/:movieType/:page?', {
			templateUrl: 'movie_list/movie_list.html',
			controller: 'movie_listController'
		});
	}]);

	// 3.创建正在热映控制器
	app.controller('movie_listController', [
		'$scope', 
		'$http',
		'$routeParams',
		'$route',
		'$window',
		'myService',
		function($scope, $http, $routeParams, $route, $window, myService){
			console.log($routeParams);
			$scope.loading = true;
			// console.log($routeParams);
			// 每页几条数据
			$scope.pageSize = 5;
			// 第几页，如果url中没有page则默认是第一页
			$scope.page = ($routeParams.page || '1') - 0;
			var start = ($scope.page - 1) * 5;
			// 自己封装的方法
			myService.myJsonp('http://api.douban.com/v2/movie/' + $routeParams.movieType, 
				{start: start, count: $scope.pageSize, q: $routeParams.q}, function(data){
					$scope.totalPage = $window.Math.ceil(data.total / $scope.pageSize);
					// 异步给数据模型赋值，angular不会知道
					$scope.data = data;
					$scope.loading = false;
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

			// 通过跨域获取数据
			/*$http.jsonp('http://api.douban.com/v2/movie/in_theaters', {
				jsonpCallbackParam: 'callback'
			}).then(function(res){
				console.log(res);
			});*/


			// 发请求拿(本地)数据
			/*$http.get('in_theaters/data.json')
			.then(function(res){
				$scope.data = res.data;
			});*/
	}]);
})(angular);