regius.controller(
  "emprestimoCtrl",
  function ($scope, $state, $ionicPopup, apiService) {
    $scope.listaEmprestimos = [];
    $scope.possuiInforme = false;

    var url = "plan/:id/emprestimos/".replace(
      ":id",
      window.localStorage.plan_id
    );
    var method = "get";

    apiService.list(url, method, null, function (listaEmprestimos) {
      $scope.listaEmprestimos = listaEmprestimos;
    });
    $scope.possuiInforme = false;

    url = "plan/:id/emprestimos/informe/anos".replace(
      ":id",
      window.localStorage.plan_id
    );
    method = "get";

    apiService.list(url, method, null, function (listaAnos) {
      $scope.possuiInforme = listaAnos.length > 0;
    });

    $scope.detalhar = function (emprestimo) {
      $state.go("emprestimo-detalhe", {
        ano: emprestimo.ano,
        numero: emprestimo.numero,
      });
    };

    $scope.exibirInforme = function () {
      $state.go("emprestimo-informe");
    };

    $scope.simular = function () {
      var temContratoEmDeferimento = false;

      // Varre a lista de contratos para verificar se existe algum contrato em deferimento.
      for (var i = 0; i < $scope.listaEmprestimos.contratos.length; i++) {
        if ($scope.listaEmprestimos.contratos[i].emDeferimento) {
          temContratoEmDeferimento = true;
          break;
        }
      }

      // Só vai pra próxima view se não possuir nenhum contrato em deferimento.
      if (!temContratoEmDeferimento) $state.go("emprestimo-simulacao");
      else
        $ionicPopup.show({
          title: "Ops",
          subTitle:
            "Já existe um contrato na situação 'Em deferimento' e o sistema não permite novos empréstimos.",
          buttons: [{ text: "Ok" }],
        });
    };
  }
);
