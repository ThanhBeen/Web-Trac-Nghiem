var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
    $scope.Email="";
    console.log($scope.Email)
    var len = $scope.Email.length;
    console.log(len);
    
    if(($scope.Email).length==0){
        $scope.msg="Email khong duoc de trong";
        return;
    }
    
    if(frmDangKy.txtEmail.$invalid){
        $scope.msg="meo sai";
    }

    if(frmDangKy.txtEmail.$valid){
        $scope.msg="meo sai";
    }
})