var app=angular.module("exampleApp",[])
app.controller("topLevelCtrl",function($scope){
    $scope.data={
        dataValue:"Hello,Adam"
    }
    $scope.reverseText=function(){
        $scope.data.dataValue=$scope.data.dataValue.split("").reverse().join("");
    }
    $scope.changeCase=function(){
        var result=[];
        angular.forEach($scope.data.dataValue.split(""),function(char,index) {
            result.push(index%2==1?char.toString().toUpperCase():char.toString().toLowerCase());

        });
        $scope.data.dataValue=result.join("");
    }
});
app.controller("firstChildCtrl",function($scope){
    $scope.changeCase=function(){
        $scope.data.dataValue= $scope.data.dataValue.toUpperCase();
    }

});
app.controller("secondChildCtrl",function($scope){
    $scope.changeCase=function(){
        $scope.data.dataValue= $scope.data.dataValue.toLowerCase();
    };
    $scope.shiftFour=function(){
        var result=[];
        angular.forEach($scope.data.dataValue.split(""),function(char,index){
            result.push(index<4?char.toUpperCase():char);
        })
        $scope.data.dataValue=result.join("");
    }
})
//  当读取一个直接在作用域上定义的属性的值的时候，angular会检查在这个控制器的作用域上是否有一个局部属性，如果没有
// ，就会沿着作用域层次解构向上查找是否有有一个被继承的属性。然而，当使用ng-model指令来修改这样一个属性时，angular会
// 检查当前作用域是否有这样一个名称的属性，如果没有，就会假设你想隐式定义一个这样的属性。结果便是覆盖了该属性值。
// 就像在13-9的页面示例一样。而至于编辑了子控制器中的输入框之后，就会影响“Reverse”按钮的工作的原因是因为现在会有
// 两个“datavalue”属性——一个是被顶层控制器所定义的，另一个是被编辑的子控制器所定义的。reverseText行为是在顶层控制器中
// 定义的，只对顶层作用域中的定义的dataValue属性起作用，而不会改变子作用域的dataValue熟悉 