regius.controller('alteracaoPercentualResultadoCtrl', function($ionicHistory, $state, $scope, $timeout, $ionicPopup, apiService) { 
    
    $scope.$on('$ionicView.enter', function() {
        apiService.list(url, method, null, function(dados) {
            $scope.protocolo = dados.Solicitacao.CodigoIdentificador;
            $scope.dataSolicitacao = dados.Solicitacao.DataSolicitacaoString;
        });
    })

    var url = '/plan/:id/alteracaoPercentual'.replace(':id', window.localStorage.plan_id);
    var method = 'get';

    voltarInicio = function() {
        $timeout(function() { 
            localStorage.removeItem("contribuicao-pessoal");
            localStorage.removeItem("percentual-contribuicao-pessoal");
        })

        $ionicHistory.nextViewOptions({
            disableBack: true
        });

        $state.transitionTo('home', null, {reload: true, notify:true});
		//$window.location.reload();
    }

    solicitarNovaAlteracao = function() {
        $timeout(function() {
            $ionicPopup.show({
                title: 'Alerta',
                template: 'Para realizar uma nova alteração, o pedido atual será apagado. Deseja continuar?',
                buttons: [
                    {
                        text: 'Cancelar',
                        onTap: function(e) { return true; }
                    },
                    {
                        text: 'Continuar',
                        type: 'button-positive',
                        onTap: function(e) {
                            localStorage.removeItem("contribuicao-pessoal");
                            localStorage.removeItem("data-solicitacao");
                            localStorage.removeItem("percentual-contribuicao-pessoal");
                            localStorage.removeItem("protocolo");

                            var url = '/plan/:id/alteracaoPercentual/apagar'.replace(':id', window.localStorage.plan_id);
                            var method = 'post';

                            apiService.listData($scope, url, method, null, function () {
                                $ionicHistory.nextViewOptions({
                                    disableBack: true
                                });
                                
                                $state.go('alteracaoPercentual', {}, { reload: true });
                            });
                        }
                    }
                ]
            });
            
        })
    }

})