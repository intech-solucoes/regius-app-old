regius.controller('contrachequeCtrl', function ($scope, $rootScope, $state, apiService) {
    $scope.dataDetalhe = {};
    // Retrieving user 
    var url = '/plan/:id/ContraCheque/ListaDatasReferencias'.replace(':id', window.localStorage.plan_id);
    var method = 'get';

    apiService.list(url, method, null, function (list) {
        var url = ('/plan/:id/ContraCheque?dataReferencia=' + list[0].Referencia).replace(':id', window.localStorage.plan_id);
        var method = 'get';
        $scope.list = list;

        apiService.list(url, method, null, function (detalhe) {
            $scope.dataDetalhe = list[0];
            $scope.detalhe = detalhe;
        });
    });

    $scope.ativar = function (data) {
        var url = ('/plan/:id/ContraCheque?dataReferencia=' + data).replace(':id', window.localStorage.plan_id);
        var method = 'get';

        apiService.list(url, method, null, function (detalhe) {
            $scope.dataDetalhe = data;
            $scope.detalhe = detalhe;
        });
    }

    $scope.detalhar = function () {
        $rootScope.contracheque = $scope.detalhe;
        $state.go('contracheque-detalhe', { contracheque: $scope.detalhe });
    }
});