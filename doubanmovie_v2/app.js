(function (angular) {
    // "use strict";

    // start your ride
    var app = angular.module('main', [
    	/*
    		如果将details放在movie_list的后面，查看电影详情时
    		就会先匹配movie_list里面的路由规则，会返回404，所以
    		应该将details放在movie_list前面
    	 */
    	'home',
    	'details',
    	'movie_list',
    	'auto-active'
    	]);
})(angular);