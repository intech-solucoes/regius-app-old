regius.controller('detalhesComprovanteCtrl', function($scope, $state, $stateParams, $timeout, apiService, $ionicPopup) { 
    
    var url = `/protocolo/${$stateParams.protocolo}`;
    var method = 'get';

    $scope.$on('$ionicView.enter', function() {
        apiService.list(url, method, null, function(dados) {
            $scope.dadosComprovante = dados;
        });

        $scope.temRecusa = false;
    })

    $scope.funcao = function() {
        $timeout(function() {
            
        })
    }

    // $scope.dadosComprovante = {
    //     nomeParticipante: "PAULO CEYLAO",
    //     plano: "CD-METRO",
    //     nomeTransacao: "Alteração de Percentual de Contribuição",
    //     protocolo: '61974865104395',
    //     dataSolicitacao: "25/07/2018 às 17:54:12",
    //     dataEfetivacao: "26/07/2018 às 17:54:12",
    //     solicitadoPor: "PAULO CEYLAO",
    //     efetivadoPor: "SERGIO SOARES",
    //     motivoRecusa: "",
    //     percentualAnterior: 3,
    //     novoPercentual: 5
    // }

})