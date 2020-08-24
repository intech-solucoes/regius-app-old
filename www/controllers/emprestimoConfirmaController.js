regius.controller("emprestimoConfirmaCtrl", function (
  $scope,
  $state,
  $stateParams,
  $ionicHistory,
  apiService
) {
  var modalidade = JSON.parse(localStorage.getItem("emprestimo-modalidade"));
  var data = JSON.parse(localStorage.getItem("emprestimo-data"));
  var valorSolicitado = localStorage.getItem("emprestimo-valorSolicitado");
  var contratos = localStorage.getItem("emprestimo-contratos");
  var prestacao = JSON.parse(localStorage.getItem("emprestimo-prestacao"));
  var carencia = JSON.parse(localStorage.getItem("emprestimo-carencia"));

  $scope.listaParcelas = [];
  var urlParams = `/plan/:id/emprestimos/solicitacao/detalhe?codigoModalidade=${modalidade.codigoModalidade}&dataCredito=${data.data}&valorSolicitado=${valorSolicitado}&numerosDeContratosAReformar=${contratos}&codigoNatureza=${prestacao.codigoNatureza}&prazo=${prestacao.quantidadeParcelas}&carencia=${carencia}`;
  var url = urlParams.replace(":id", window.localStorage.plan_id);
  var method = "get";

  apiService.list(url, method, null, function (dados) {
    $scope.dados = dados;
  });

  $scope.contratar = function () {
    $state.go(
      "emprestimo-token",
      { token: $scope.dados.token },
      { reload: true }
    );
  };

  $scope.finalizar = function () {
    $ionicHistory.nextViewOptions({
      disableBack: true,
    });

    $state.go("home");
  };
});
