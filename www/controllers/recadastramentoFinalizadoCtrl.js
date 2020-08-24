regius
    .controller('recadastramentoFinalizadoCtrl', function ($scope, $state, $ionicHistory, $rootScope, $ionicPopup, Upload, $cordovaCamera, $cordovaActionSheet, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaImagePicker, apiService) {

        $scope.solicitacao = {};
        
        $scope.$on('$ionicView.enter', function(scope, states) {
            if(states.stateName == "recadastramentoFinalizado")
                $scope.init();
        });

        $scope.init = function() {
            var url = 'recadastramento/finalizado/' + window.localStorage.plan_id;
            var method = 'get';

            apiService.listData($scope, url, method, null, function (data) {
                $scope.solicitacao = data;
            });
        }
        
        $scope.inicio = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });

            $state.go('home', {}, { reload: true });
        }

        $scope.novo = function() {
            $ionicPopup.show({
                title: 'Alerta',
                template: 'Para iniciar um novo recadastramento, o processo atual será apagado. Deseja continuar?',
                buttons: [
                    {
                        text: 'Cancelar',
                        onTap: function(e) { return true; }
                    },
                    {
                        text: 'Continuar',
                        type: 'button-positive',
                        onTap: function(e) {
                            localStorage.removeItem('recadastramentoSolicitacao');
                            localStorage.removeItem('recadastramentoPasso');
                            
                            var url = 'recadastramento/'+ $scope.solicitacao.numeroProtocolo + '/apagar';
                            var method = 'post';

                            apiService.listData($scope, url, method, null, function (data) {
                                $ionicHistory.nextViewOptions({
                                    disableBack: true
                                });
                    
                                $state.go('recadastramento', {}, { reload: true });
                            });
                        }
                    }
                ]
            });
        }
    });