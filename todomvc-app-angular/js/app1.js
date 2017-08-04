(function (angular) {
    'use strict';

    // 创建服务之后的写法
    // 需要使用service模块
    var app = angular.module('todosApp',['service']);
    app.controller('todosController',[
        '$scope',
        '$location',
        // service里面的MyService服务，是new出来的一个对象
        'MyService',
        function($scope,$location,MyService){
            // 1.任务展示
            $scope.todos = MyService.get();

            // 2.添加任务
            $scope.newTodo = '';
            $scope.add = function(){
                // 判断newTodo是否为空，为空就不添加
                if(!$scope.newTodo){
                    return;
                }
                MyService.add($scope.newTodo);
                $scope.newTodo = '';
            };

            // 3.删除任务
            $scope.delete = function(id){
                MyService.remove(id);
            };

            // 4.双击修改
            $scope.isEditingId = -1;
            $scope.edit = function(id){
                $scope.isEditingId = id;
            };
            // 改变文本框的编辑状态并保存到localStorage中
            $scope.save = function(){
                $scope.isEditingId = -1;
                MyService.save();
            };

            // 5.切换任务状态还得保存到localStorage中
            $scope.statusChange = function(){
                MyService.save();
            };
            // 6.批量切换任务状态
            $scope.selectAll = false;
            $scope.toggleAll = function(){
                // 让$scope.todos中所有数据的completed值等于$scope.selectAll
                MyService.toggleAll($scope.selectAll);
            };

            // 7.显示未完成任务数
            $scope.getActive = function(){
                return MyService.getActive();
            };

            // 8.清除所有已完成任务
            $scope.clearAll = function(){
                MyService.clearAll();
            };

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
