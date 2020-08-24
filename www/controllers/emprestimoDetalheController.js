regius.controller('emprestimoDetalheCtrl', function ($scope, $stateParams, apiService) {
    $scope.ano = $stateParams.ano;
    $scope.numero = $stateParams.numero;

    $scope.listaParcelas = [];

    var url = ('/plan/:id/emprestimos/prestacoes?ano=' + $scope.ano + '&numero=' + $scope.numero).replace(':id', window.localStorage.plan_id);
    var method = 'get';

    apiService.list(url, method, null, function (listaParcelas) {
        $scope.listaParcelas = listaParcelas;
    });
});