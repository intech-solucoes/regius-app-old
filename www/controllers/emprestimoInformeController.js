regius.controller('emprestimoInformeController', function ($scope, $state, $ionicPopup, apiService) {

    $scope.listaAnos = [];
    $scope.anoSelecionado = 0;
    $scope.informe = {};

    url = '/plan/:id/emprestimos/informe/anos'.replace(':id', window.localStorage.plan_id);
    method = 'get';

    apiService.list(url, method, null, function (listaAnos) {
        $scope.listaAnos = listaAnos;

        $scope.anoSelecionado = listaAnos[0];
        $scope.selecionarAno($scope.anoSelecionado);
    });

    $scope.selecionarAno = function(ano) {
        url = ('/plan/:id/emprestimos/informe/' + ano).replace(':id', window.localStorage.plan_id);
        method = 'get';

        apiService.list(url, method, null, function (informe) {
            console.log(informe);
            $scope.informe = informe;
        });
    }
});