regius.controller('emprestimoSimulacaoCtrl', function ($scope, $state, $q, apiService, $ionicPopup) {
  $scope.dados = {};

  $scope.listaCarencias = [
    "CARÊNCIA NORMAL",
    "CARÊNCIA ESTENDIDA - 30 DIAS",
    "CARÊNCIA ESTENDIDA - 60 DIAS",
    "CARÊNCIA ESTENDIDA - 90 DIAS"
  ];

  var url = '/plan/:id/emprestimos/dadosSimulacao'.replace(':id', window.localStorage.plan_id);
  var method = 'get';

  apiService.list(url, method, null, function (listaModalidades) {
    $scope.listaModalidades = listaModalidades;
  });

  $scope.formataValor = function (campo) {
    formataValor(campo);
  }

  $scope.calcularValorLimite = function () {
    if ($scope.dados.data) {
      var valor = $scope.dados.data.concessao.valorLimite;

      for (var i = 0; i < $scope.dados.data.contratos.length; i++) {
        if ($scope.dados.data.contratos[i].checked)
          valor += $scope.dados.data.contratos[i].valorContrato;
      }

      return valor;
    } else {
      return 0;
    }
  }

  $scope.calcularMargem = function () {
    if ($scope.dados.data) {
      var valor = $scope.dados.data.concessao.valorMargemConsignavel;

      for (var i = 0; i < $scope.dados.data.contratos.length; i++) {
        if ($scope.dados.data.contratos[i].checked)
          valor += $scope.dados.data.contratos[i].valorPrestacao;
      }

      return valor;
    } else {
      return 0;
    }
  }

  $scope.continuar = function () {
    if (!$scope.dados.valorSolicitado) {

      $ionicPopup.show({
        title: 'Ops',
        subTitle: "Por favor, preencha o campo \"Valor Solicitado\"",
        buttons: [
          { text: 'Ok' }
        ]
      });
    }
    else {
      var contratos = "";

      for (var i = 0; i < $scope.dados.data.contratos.length; i++) {
        if ($scope.dados.data.contratos[i].checked) {
          contratos += $scope.dados.data.contratos[i].numeroContrato;

          if (i + 1 < $scope.dados.data.contratos.length)
            contratos += ",";
        }
      }

      var url = ('/plan/:id/emprestimos/validaSolicitacao').replace(':id', window.localStorage.plan_id);
      var method = 'post';

      var carencia = $scope.listaCarencias.indexOf($scope.dados.carencia);

      var data = {
        codigoModalidade: $scope.dados.modalidade.codigoModalidade,
        dataCredito: $scope.dados.data.data,
        valorSolicitado: $scope.dados.valorSolicitado,
        numerosDeContratosAReformar: contratos,
        carencia: carencia
      };

      apiService.list(url, method, data, function (result) {
        localStorage.setItem('emprestimo-modalidade', JSON.stringify($scope.dados.modalidade));
        localStorage.setItem('emprestimo-data', JSON.stringify($scope.dados.data));
        localStorage.setItem('emprestimo-valorSolicitado', $scope.dados.valorSolicitado);
        localStorage.setItem('emprestimo-contratos', contratos);
        localStorage.setItem('emprestimo-carencia', carencia);

        $state.go('emprestimo-prestacoes', {}, { reload: true });
      });
    }
  }

});
