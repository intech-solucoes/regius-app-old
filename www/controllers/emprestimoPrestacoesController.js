regius.controller('emprestimoPrestacoesCtrl', function ($scope, $state, $ionicModal, apiService) {
  $scope.dados = {};
  $scope.dados.prestacao = {};
  $scope.dados.prestacao.quantidadeParcelas = 0;
  $scope.dados.prestacaoSelecionada = false;

  var modalidade = JSON.parse(localStorage.getItem('emprestimo-modalidade'));
  var data = JSON.parse(localStorage.getItem('emprestimo-data'));
  var valorSolicitado = localStorage.getItem('emprestimo-valorSolicitado');
  var contratos = localStorage.getItem('emprestimo-contratos');
  var carencia = localStorage.getItem('emprestimo-carencia');

  var url = ('/plan/:id/emprestimos/solicitacao').replace(':id', window.localStorage.plan_id);
  var method = 'post';

  var data = {
    codigoModalidade: modalidade.codigoModalidade,
    dataCredito: data.data,
    valorSolicitado: valorSolicitado,
    numerosDeContratosAReformar: contratos,
    carencia: carencia
  };

  apiService.list(url, method, data, function (solicitacao) {
    $scope.solicitacao = solicitacao;

    $ionicModal.fromTemplateUrl('modalTaxas.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  });

  $scope.selecionar = function (prestacao) {
    $scope.dados.prestacao = prestacao;
    $scope.dados.prestacaoSelecionada = true;
  }

  $scope.verificarCheck = function (prestacao) {
    return $scope.dados.prestacao.quantidadeParcelas == prestacao.quantidadeParcelas;
  }

  $scope.continuar = function () {
    if ($scope.dados.prestacao) {
      localStorage.setItem('emprestimo-prestacao', JSON.stringify($scope.dados.prestacao));

      $state.go('emprestimo-confirma', {}, { reload: true });
    }
  }
});
