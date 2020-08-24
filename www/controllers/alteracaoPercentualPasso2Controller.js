regius.controller('alteracaoPercentualPasso2Ctrl', function($ionicHistory, $scope, $location, $timeout, $ionicPopup, apiService) { 
    
    $scope.$on('$ionicView.enter', function() {
        apiService.list(url, method, null, function(dados) {
            $scope.plano = dados.Plano;
            $scope.percentualAtual = dados.PercentualContribuicaoParticipante;
            $scope.novoPercentual = localStorage.getItem("percentual-contribuicao-pessoal");
            $scope.contribuicaoPessoal = renderResultado(localStorage.getItem("contribuicao-pessoal"));
            
            $scope.data = new Date();
            $scope.mesInicio = $scope.data.getMonth() + 2;   // Mes posterior ao atual.
            $scope.anoInicio = new Date(new Date($scope.data).setMonth($scope.data.getMonth() + 1));
            $scope.anoInicio = $scope.anoInicio.getFullYear();
        });
    });
    
    var url = '/plan/:id/alteracaoPercentual'.replace(':id', window.localStorage.plan_id);
    var method = 'get';
    $scope.termoAceito = false;

    toggleTermos = function() {
        $timeout(function() {
            $scope.termoAceito = !$scope.termoAceito;

            if(!$scope.termoAceito) {
                $scope.tokenDigitado = '';
                document.getElementById("tokenDigitado").value = $scope.tokenDigitado;
                $scope.tokenGerado = false;
                $scope.botaoSolicitarHabilitado = false;
            }
        });

    }

    $scope.tokenRecebido = false;

    gerarToken = function() {
        $timeout(function() {
            var url = '/plan/:id/alteracaoPercentual/enviarToken'.replace(':id', window.localStorage.plan_id);
            var method = 'post';
            apiService.list(url, method, null, function(dados) {
                $scope.tokenRecebido = dados.Token;
                $ionicPopup.show({
                    title: 'Mensagem',
                    subTitle: dados.Mensagem,
                    buttons: [
                    { text: 'Ok' }
                    ]
                });
                $scope.tokenGerado = true;
                $scope.botaoSolicitarHabilitado = true;
            })
        })
    }

    changeTokenDigitado = function() {
        $timeout(function() {
            $scope.tokenDigitado = document.getElementById("tokenDigitado").value;
        })
    }

    finalizar = function() {
        $timeout(function() {

            var url = '/plan/:id/alteracaoPercentual/finalizar'.replace(':id', window.localStorage.plan_id);
            var method = 'post';
            var dadosFinalizacao = {
                percentual: $scope.novoPercentual,
                tokenRecebido: $scope.tokenRecebido,
                tokenDigitado: $scope.tokenDigitado
            }
            dadosFinalizacao.tokenDigitado = document.getElementById("tokenDigitado").value;

            apiService.list(url, method, dadosFinalizacao, function(dados) {

                $ionicHistory.nextViewOptions({
                    disableBack: true
                });

                if(dados.Protocolo) {
                    $scope.protocolo = dados.Protocolo;
                    $scope.dataSolicitacao = dados.DataSolicitacao;
                    $location.path("alteracaoPercentualResultado");
                }
                else {
                    $scope.mensagemFinalizacao = dados.message;
                    $ionicPopup.show({
                        title: 'Ooops!',
                        subTitle: $scope.mensagemFinalizacao,
                        buttons: [
                        { text: 'Ok' }
                        ]
                    });
                }
            })
            
        })
    }

    renderResultado = function(valor) {
        if(isNaN(valor))
            return valor = '0,00';
        
        if(valor % 1 != 0) {
            valor = valor.toString();
            valor = valor.split('.');
            valor[0] = valor[0].split(/(?=(?:...)*$)/).join('.');   // Regex utilizada para colocar um (.) a cada 3 casas decimais antes da vírgula, para separar os milhares.
            valor = valor.join(',');
        } else {
            valor = valor.toString();
            valor = valor.split(/(?=(?:...)*$)/).join('.');
            valor = valor + ',00';
        }    
        
        return valor;
    }

})