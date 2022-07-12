'use strict';
var app = angular.module('myApp', []);

app.controller('myCtrl',function($scope,$location,$window,$http){
    $scope.users=[];
    $scope.acc="Tai khoan"
    $http.get('db/Students.js').then(function(response){
        $scope.users=response.data;
       
    })
    $scope.login=function(){
        console.log($scope.passWord);
        console.log($scope.fullname);
        console.log($scope.users);
        for(var i=0 ; i<$scope.users.length;i++){
            if($scope.fullname==$scope.users[i].username && $scope.passWord==$scope.users[i].password){
                alert('dang nhap thanh cong')
                $window.sessionStorage.setItem('username', $scope.username);
                $scope.acc="ABXC";
              //  window.location='http://127.0.0.1:5500/Assignment/index.html';
            }
        }
    }
});