//Post contact form
regius.controller('contatoCtrl', function($scope, apiService) {

    var url = 'contact';

    $scope.$on('$ionicView.enter', function() {
        console.log('controller', 'contatoCtrl');
    
        $scope.data = {};    
        apiService.listData($scope, 'auth/companies', 'get', null, function (data) {
            $scope.companies = data;        
        });
    })

    // Preparing data for post
    $scope.sendMail = function () {
        var params = {};        
        for (var key in event.target.elements) {
            if (isFinite(Number(key))) {
                var element = event.target.elements[key];
                if (element.name)
                    params[element.name] = element.value;
            }
        }

        apiService.listData($scope, url, 'post', params, function (data) {
            console.log('data', data);
            $scope.results = data;
        });
    };
});