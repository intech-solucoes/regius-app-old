regius.controller('alteracaoPercentualCtrl', function($scope, $state, $timeout, apiService) { 

    $scope.$on('$ionicView.enter', function() {
        apiService.list(url, method, null, function(dados) {
            $scope.plano = dados.Plano;
            $scope.percentualAtual = dados.PercentualContribuicaoParticipante;
            $scope.salarioParticipacao = dados.SalarioContribuicao;
            $scope.salarioParticipacaoString = renderResultado(dados.SalarioContribuicao);
    
            // Armazenando os valores limites dentro dos scopes.
            $scope.percentualMinimoParticipante = dados.LimiteContribuicao.VAL_PERC_MINIMO_PART;
            $scope.percentualMaximoParticipante = dados.LimiteContribuicao.VAL_PERC_MAXIMO_PART;
            $scope.percentualMinimoPatrocinadora = dados.LimiteContribuicao.VAL_PERC_MINIMO_PATROC;
            $scope.percentualMaximoPatrocinadora = dados.LimiteContribuicao.VAL_PERC_MAXIMO_PATROC;
            $scope.dataReferencia = dados.DataReferencia;
            // Calcula as contribuições a partir do valor padrão.
            calcularPercentuais($scope.percentualAtual);
        });
        
	});

    var url = '/plan/:id/alteracaoPercentual'.replace(':id', window.localStorage.plan_id);
    var method = 'get';

    calcularPercentuais = function(novoPercentual) {
        $timeout(function() {
            $scope.percentualContribuicaoPessoal = novoPercentual;
            $scope.calcularContribuicaoPessoal();
            $scope.calcularContribuicaoPatronal(novoPercentual);
        });
    }

    $scope.calcularContribuicaoPessoal = function() {
        $timeout(function() {
            $scope.contribuicaoPessoal = $scope.salarioParticipacao * (parseFloat($scope.percentualContribuicaoPessoal) / 100.0);   // multiplicando pelo percentual atual, o valor fica fixo... tente colocar o percentualContribuicaoInicial com o valor inicial inicialmente... 
            $scope.contribuicaoPessoal = $scope.contribuicaoPessoal.toFixed(2);
            $scope.contribuicaoPessoal = $scope.contribuicaoPessoal.toString(10);
            $scope.contribuicaoPessoalString = renderResultado($scope.contribuicaoPessoal);
        })
    }

    $scope.calcularContribuicaoPatronal = function(novoPercentual) {
        if(novoPercentual <= $scope.percentualMaximoPatrocinadora)
            $scope.percentualContribuicaoPatronal = novoPercentual
        else
            $scope.percentualContribuicaoPatronal = $scope.percentualMaximoPatrocinadora;

        $scope.contribuicaoPatronal = $scope.salarioParticipacao * (parseFloat($scope.percentualContribuicaoPatronal) / 100.0);

        $scope.contribuicaoPatronal = $scope.contribuicaoPatronal.toFixed(2);
        $scope.contribuicaoPatronal = $scope.contribuicaoPatronal.toString(10);
        $scope.contribuicaoPatronalString = renderResultado($scope.contribuicaoPatronal)
    }

    $scope.proximoPasso = function() {
        localStorage.setItem("percentual-contribuicao-pessoal", $scope.percentualContribuicaoPessoal);
        localStorage.setItem("contribuicao-pessoal", $scope.contribuicaoPessoal);

        $state.go('alteracaoPercentualPasso2');
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