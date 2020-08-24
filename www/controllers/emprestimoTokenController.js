regius.controller("emprestimoTokenCtrl", function (
  $scope,
  $state,
  $stateParams,
  apiService,
  $ionicPopup
) {
  $scope.dados = {};

  var tokenRecebido = $stateParams.token;

  var modalidade = JSON.parse(localStorage.getItem("emprestimo-modalidade"));
  var data = JSON.parse(localStorage.getItem("emprestimo-data"));
  var valorSolicitado = localStorage.getItem("emprestimo-valorSolicitado");
  var contratos = localStorage.getItem("emprestimo-contratos");
  var prestacao = JSON.parse(localStorage.getItem("emprestimo-prestacao"));
  var carencia = JSON.parse(localStorage.getItem("emprestimo-carencia"));

  $scope.aceita = false;

  $scope.toggleAceita = function () {
    $scope.aceita = !$scope.aceita;
  };

  $scope.gerarToken = function () {
    if ($scope.aceita) {
      var url = "plan/:id/emprestimos/solicitacao/enviarToken".replace(
        ":id",
        window.localStorage.plan_id
      );
      var method = "post";

      apiService.list(url, method, { token: tokenRecebido }, function (dados) {
        console.debug(dados);

        $ionicPopup.show({
          title: "Ops",
          subTitle: dados,
          buttons: [{ text: "Ok" }],
        });
      });
    } else {
      $ionicPopup.show({
        title: "Ops",
        subTitle: "É necessário aceitar os termos!",
        buttons: [{ text: "Ok" }],
      });
    }
  };

  $scope.contratar = function () {
    if ($scope.aceita) {
      var tokenDigitado = $scope.dados.tokenEnviado;

      var params = {
        codigoModalidade: modalidade.codigoModalidade,
        dataCredito: data.data,
        valorSolicitado: valorSolicitado,
        contratos: contratos,
        codigoNatureza: prestacao.codigoNatureza,
        prazo: prestacao.quantidadeParcelas,
        carencia: carencia,
        tokenRecebido: tokenRecebido,
        tokenDigitado: tokenDigitado,
        valorLiquido: prestacao.valorLiquido,
        valorAtualizacao: prestacao.valorAtualizacao,
        valorIOF: prestacao.valorIOF,
        valorTaxaSeguro: prestacao.valorTaxaSeguro,
        valorTaxaAdministracao: prestacao.valorTaxaAdministracao,
        valorReformados: prestacao.valorReformados,
        dataVencimentoInicial: prestacao.dataVencimentoInicial,
        dataVencimentoFinal: prestacao.dataVencimentoFinal
      };

      console.debug(params);

      var url = "plan/:id/emprestimos/solicitacao/contratar".replace(
        ":id",
        window.localStorage.plan_id
      );
      var method = "post";

      apiService.list(url, method, params, function (dados) {
        console.debug(dados);
        $state.go("emprestimo-fim", { numeroContrato: dados });
      });
    } else {
      $ionicPopup.show({
        title: "Ops",
        subTitle: "É necessário aceitar os termos!",
        buttons: [{ text: "Ok" }],
      });
    }
  };
});
