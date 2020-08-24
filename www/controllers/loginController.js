regius.controller('loginCtrl', function($scope, $rootScope, apiServiceLogin, apiService, $timeout) {
    console.log('controller', 'loginCtrl');

    // form data models will come here
    $scope.loginData = {};

    apiService.listData($scope, 'auth/companies', 'get', null, function(data){
        $scope.companies = data;

        $timeout(function(){
            var option = document.getElementById('company');
            option.value = 'number:' + window.localStorage.company;
            option.selected = "true";
        });
    });

    // Logging the user in
    $scope.login = function() {

        var company = document.getElementById('company').value.replace('number:','');

        apiServiceLogin.signin($scope, 'auth/login', {
            company:    company,
            username:   $scope.loginData.username,
            password:   $scope.loginData.password,
            grant_type: 'password',
        });
    };

    $scope.$on('$ionicView.enter', function() {
        $scope.loginData.username = window.localStorage.username;
        $scope.loginData.password = '';
    });
});