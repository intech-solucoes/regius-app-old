regius.controller('meusComprovantesCtrl', function($scope, $timeout, apiService, $location) { 
    
    // var url = '/index';
    // var method = 'get';

    $scope.$on('$ionicView.enter', function() {
        apiService.listData($scope, 'protocolo', 'get', null, function (data) {
            $scope.comprovantes = data;        
        });
    })

    $scope.abrirComprovante = function(protocolo) {
        $timeout(function() {
            $location.path(`detalhesComprovante/${protocolo}`);
        })
    }
});