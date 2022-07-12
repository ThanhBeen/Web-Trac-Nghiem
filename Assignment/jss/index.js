var app = angular.module('myApp', ['ngRoute']);
// app.controller('myCtrl',function($scope,$location){
//     $scope.login=function(){
//         alert("Đăng nhập thành công")
//         $location.url('/trangChu');
//     }
// });
app.controller('loginCtrl', function ($scope, $location, $window, $http) {
    $scope.users = [];
    // $scope.fullname = "v";
    // $scope.passWord = "iloveyou";
    // $scope.acc="Tai khoan"
    $http.get('/db/Students.js').then(function (response) {
        $scope.users = response.data;

    });
    $scope.login = function () {
        for (var i = 0; i < $scope.users.length; i++) {
            if ($scope.fullname != $scope.users[i].username) {
                alert('Tên đăng nhập không đúng');
                // alert( 'Json: '+$scope.users[i].username);
                // alert( 'Json: '+$scope.users[i].password);
                // alert( '$scope: '+$scope.fullname);
                // alert( '$scope: '+$scope.passWord);
                return;
            } else if ($scope.passWord != $scope.users[i].password) {
                alert('Mật khẩu không đúng');
                return;
            } else {
                alert('Đăng nhập thành công')
                // $window.sessionStorage.setItem('username', $scope.username);
                // alert(username);
                $location.url('/trangChu');
                return;
            }

        }
    }
});

app.controller('dataCtrl', function ($scope, $http) {
    $scope.products = [];
    $http.get('/db/Subjects.js').then(function (response) {
        $scope.products = response.data;

        $scope.begin = 0;
        $scope.pageCount = Math.ceil($scope.products.length / 4); 
    });
    

    $scope.first = function(){
        $scope.begin = 0;

    };
    $scope.previous = function(){
        if($scope.begin > 0){
            $scope.begin -= 4;
        }
    };
    $scope.next = function(){
        if($scope.begin < ($scope.pageCount - 1) * 4){
            $scope.begin += 4;
        }
    };
    $scope.last = function(){
        $scope.begin = ($scope.pageCount - 1) * 4;
    };
});



app.config(function ($routeProvider) {
    $routeProvider
        .when('/trangChu', {
            templateUrl: '/trangChu.html',
            controller: 'dataCtrl'
        })
        .when('/monHoc', {
            templateUrl: '/monHoc.html',
            controller: 'dataCtrl'
        })
        .when('/quiz/:id/:name', {
            templateUrl: 'quiz-app.html',
            controller: 'quizsCtrl'
        })
        .when('/gioiThieu', {
            templateUrl: '/gioiThieu.html'
        })
        .when('/lienHe', {
            templateUrl: '/lienHe.html'
        })
        .when('/gopY', {
            templateUrl: '/gopY.html'
        })
        .when('/hoiDap', {
            templateUrl: '/hoiDap.html'
        })
        .when('/dangKy', {
            templateUrl: '/dangKy.html'
        })
        .when('/dangNhap', {
            templateUrl: '/dangNhap.html',
            controller: 'loginCtrl'
        })
        .when('/doiMK', {
            templateUrl: '/doiMK.html'
        })
        .when('/capNhatTK', {
            templateUrl: '/capNhatTK.html'
        })
        .otherwise({
            redirectTo: '/dangNhap'
        })

    app.run(function ($rootScope) {
        $rootScope.$on("$routeChangeStart", function () {
            $rootScope.loading = true;
        });
        $rootScope.$on("$routeChangeSuccess", function () {
            $rootScope.loading = false;
        });
        $rootScope.$on("$routeChangeError", function () {
            $rootScope.loading = false;
            alert('Lỗi, không tải được');
        });
    });
});

app.controller('quizsCtrl', function($scope, $http, $routeParams, quizFactory) {
    $http.get('../db//Quizs/' + $routeParams.id + '.js').then(function(res) {
        quizFactory.question = res.data;
    });
});


app.directive('quizfpoly', function(quizFactory, $routeParams){
    return {
         restrict : 'AE',
         scope:{},
         templateUrl: 'template-quiz.html',
         link: function (scope, elem, attrs) {
             scope.start = function () {
                quizFactory.getQuestions().then(function(){
                    scope.subjectName = $routeParams.name;
                    scope.id = 1; 
                    scope.quizOver = false; //chua hoan thanh
                    scope.inProgess = true;
                    scope.getQuestion();
                }); 
             };
             scope.reset = function () {
                scope.inProgess = false;
                scope.score = 0;
             };
             scope.getQuestion = function () {
                 var quiz = quizFactory.getQuestion(scope.id)
                 if(quiz){
                    scope.question = quiz.Text;
                    scope.options = quiz.Answers;
                    scope.answer = quiz.AnswerId;
                    scope.answerMode = true;
                 }else{
                    scope.quizOver = true ;
                 }
                
                
             }
             scope.checkAnswer = function() {
                //alert('answer');
                if (!$('input[name = answer]:checked').length) return;
                var ans = $('input[name = answer]:checked').val();
                if (ans == scope.answer) {
                    //alert('Đúng');
                    scope.score++;
                    scope.correctAns = true;
                } else {
                    //alert('Sai');
                    scope.correctAns = false;
                }
                scope.answerMode = false;
            };
             scope.nextQuestion = function(){
                 scope.id++;
                 scope.getQuestion();
             }
             scope.reset();
             
         }
    }
});
app.factory('quizFactory', function ($http, $routeParams) {

    return {
        getQuestions: function() {
            return $http.get('../db/Quizs/' + $routeParams.id + '.js').then(function(res) {
                question = res.data;
                //alert(questions.length);
            });
        },
        getQuestion: function(id) {
            var randomItem  = question[Math.floor(Math.random() * question.length)];
            var count = question.length;
            if(count > 10){
                count = 10;
            }
            if(id<10){
                return randomItem;
            }else{
                return false;
            }
            
        }
    }
});


app.controller('countDown', function($scope, $interval) {
    var decreamentCountdown = function() {
        $scope.giay -= 1;
        if($scope.giay == 0){
            $scope.phut -= 1;
            $scope.giay = 59;
            startCountdown();
        }
        
    };
    var startCountdown = function() {
        $interval(decreamentCountdown, 1000, $scope.giay)
        if ($scope.phut == -1) {
            alert('Hết thời gian');
            $scope.reset();

        }
    };
    $scope.phut = 9;
    $scope.giay = 60;
    startCountdown();
    
});
