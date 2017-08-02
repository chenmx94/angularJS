(function (angular) {
	'use strict';

	// 创建模块
	var app = angular.module('todosApp',[]);
	app.controller('todosController',['$scope','$location',function($scope,$location){
		// 1.任务展示
		$scope.todos = [
			{id:1,name:'吃饭',completed:true},
			{id:2,name:'睡觉',completed:true},
			{id:3,name:'学习',completed:false},
			{id:4,name:'跑步',completed:true},
			{id:5,name:'上网',completed:false},
		];

		// 2.添加任务
		$scope.newTodo = '';
		$scope.add = function(){
			// 判断newTodo是否为空，为空就不添加
			if(!$scope.newTodo){
				return;
			}
			$scope.todos.push({
				id:Math.random(),
				name:$scope.newTodo,
				completed:false
			});
			$scope.newTodo = '';
		};

		// 3.删除任务
		$scope.delete = function(id){
			for (var i = 0; i < $scope.todos.length; i++) {
				var item = $scope.todos[i];
				if(item.id == id){
					$scope.todos.splice(i,1);
				}
			}
		};

		// 4.双击修改
		$scope.isEditingId = -1;
		$scope.edit = function(id){
			$scope.isEditingId = id;
		};
		// 只是将文本框的编辑状态改变了
		$scope.save = function(){
			$scope.isEditingId = -1;
		};

		// 5.切换任务状态
		// 6.批量切换任务状态
		$scope.selectAll = false;
		$scope.toggleAll = function(){
			// 让$scope.todos中所有数据的completed值等于$scope.selectAll
			for(var i = 0; i < $scope.todos.length; i++){
				$scope.todos[i].completed = $scope.selectAll;
			}
		}

		// 7.显示未完成任务数
		$scope.getActive = function(){
			var count = 0;
			for(var i = 0; i < $scope.todos.length; i++){
				if(!$scope.todos[i].completed){
					count++;
				}
			}
			return count;
		}

		// 8.清除所有已完成任务
		$scope.clearAll = function(){
			// 从后往前遍历，元素在数组中的索引不会发生变化
			for(var i = $scope.todos.length - 1; i >= 0; i--){
				if($scope.todos[i].completed){
					$scope.todos.splice(i,1);
				}
			}
		}

		// 9.切换不同状态任务的显示
		$scope.isCompleted = {}; // 是filter过滤器的过滤条件
		// 显示全部任务
		/*$scope.all = function(){
			$scope.isCompleted = {};
		};*/
		// 显示未完成任务
		/*$scope.active = function(){
			$scope.isCompleted = {completed : false};
		};*/
		// 显示已完成任务
		/*$scope.completed = function(){
			$scope.isCompleted = {completed : true};
		};*/

		// 通过url地址切换不同状态任务的显示
		$scope.loca = $location;
		$scope.$watch('loca.url()', function(now, old){
			switch(now){
				case '/':
				$scope.isCompleted = {};
				break;
				case '/active':
				$scope.isCompleted = {completed : false};
				break;
				default:
				$scope.isCompleted = {completed : true};
			}
		});
	}]);
})(angular);
