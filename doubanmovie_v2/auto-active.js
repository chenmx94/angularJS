(function(angular){
	var app = angular.module('auto-active', []);

	// 创建自定义指令
	app.directive('autoActive', ['$location', function($location){
		return {
			link: function(scope, element, attributes){
				// ！！！只改变url值，li标签的样式不会改变！！！
				element.on('click', function(){
					element.parent().children().removeClass('active');
					element.addClass('active');
				});

				scope.loca = $location;
				// 监视锚点值的变化
				scope.$watch('loca.url()', function(now, old){
					// 去掉那个'#'号
					var hash = element.find('a').attr('href').substr(1);
					// 可以能now为/in_theaters/2
					if(now.startsWith(hash)){
						element.parent().children().removeClass('active');
						element.addClass('active');
					}
				});
			}
		}
	}]);
})(angular);