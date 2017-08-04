(function(angular){
    // 1.创建服务模块
    var app = angular.module('service', []);

    // 2.创建服务
    /*
    * 1.参数一：服务的名字
    * 2.参数二：angular会把这个function当作构造函数并new一个对象
    * */
    app.service('MyService', ['$window', function($window){
        // $window相当于js里面的全局window
        var str = $window.localStorage.getItem('mytodos') || '[]';
        var todos = JSON.parse(str);

        // 1.返回任务数据
        this.get = function(){
            return todos;
        };

        // 2.添加任务
        this.add = function(newTodo){
            todos.push({
                id: Math.random(),
                name: newTodo,
                completed: false
            });
            this.save();
        };

        // 3.删除任务
        this.remove = function(id){
            for (var i = 0; i < todos.length; i++) {
                var item = todos[i];
                if(item.id == id){
                    todos.splice(i,1);
                    this.save();
                    return;
                }
            }
        };

        // 6.批量切换任务状态
        this.toggleAll = function(selectAll){
            for(var i = 0; i < todos.length; i++){
                todos[i].completed = selectAll;
            }
            this.save();
        };

        // 7.显示未完成任务数
        this.getActive = function(){
            var count = 0;
            for(var i = 0; i < todos.length; i++){
                if(!todos[i].completed){
                    count++;
                }
            }
            return count;
        };

        // 8.清除所有已完成任务
        this.clearAll = function(){
            // 从后往前遍历，元素在数组中的索引不会发生变化
            for(var i = todos.length - 1; i >= 0; i--){
                if(todos[i].completed){
                    todos.splice(i,1);
                }
            }
            this.save();
        };

        // 保存数据，保存到localStorage中
        this.save = function(){
            var str = JSON.stringify(todos);
            $window.localStorage.setItem('mytodos', str);
        };
    }]);
})(angular);