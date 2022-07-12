var app = angular.module('myApp', ['ngRoute']);
app.controller('dataCtrl', function ($scope, $http) {
    $scope.products = [];
    // $scope.fullname = "v";
    // $scope.passWord = "iloveyou";
    // $scope.acc="Tai khoan"
    
    $scope.begin = 0;
    $scope.pageSize = 1;

    $http.get('/db/Quizs/ADAV.js').then(function (response) {
        $scope.products = response.data;

        $scope.pageCount = Math.ceil($scope.products.length / $scope.pageSize); 
    });
    

    $scope.pageCount = Math.ceil($scope.products.length / $scope.pageSize); 

    $scope.first = function(){
        $scope.begin = 0;

    };
    $scope.previous = function(){
        if($scope.begin > 0){
            $scope.begin -= $scope.pageSize;
        }
    };
    $scope.next = function(){
        if($scope.begin < ($scope.pageCount - 1) * $scope.pageSize){
            $scope.begin += $scope.pageSize;
        }
    };
    $scope.last = function(){
        $scope.begin = ($scope.pageCount - 1) * $scope.pageSize;
    };
});
