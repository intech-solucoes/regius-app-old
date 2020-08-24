angular.module('app.routes', [])

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
        })

        .state('logout', {
            url: '/logout',
            controller: 'logoutCtrl'
        })

        .state('contato', {
            url: '/contact',
            templateUrl: 'templates/contato.html',
            controller: 'contatoCtrl'
        })

        .state('index', {
            url: '/index',
            templateUrl: 'templates/hello.html',
            controller: 'helloCtrl'
        })

        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
        })

        .state('seuPlano', {
            url: '/seuPlano',
            templateUrl: 'templates/suaContribuicao.html',
            controller: 'seuPlanoCtrl'
        })

        .state('user-profile', {
            url: '/plan/:id/user/profile',
            templateUrl: 'templates/seusDados.html',
            controller: 'seusDadosCtrl'
        })

        .state('plan-contribution', {
            url: '/plan/:id/contribution',
            templateUrl: 'templates/suaContribuicao.html',
            controller: 'suaContribuicaoCtrl'
        })

        .state('contribution-details', {
            url: '/plan/:id/contribuition/details',
            templateUrl: 'templates/entendaSuaContribuicao.html',
            controller: 'entendaSuaContribuicaoCtrl'
        })

        .state('plan-balance', {
            url: '/plan/:id/balance',
            templateUrl: 'templates/seuSaldo.html',
            controller: 'seuSaldoCtrl'
        })

        .state('extratoDetalhado', {
            url: '/extratoDetalhado',
            templateUrl: 'templates/extratoDetalhado.html',
            controller: 'extratoDetalhadoCtrl'
        })

        .state('your-future', {
            url: '/plan/:id/your_future',
            templateUrl: 'templates/seuFuturo.html',
            controller: 'seuFuturoCtrl'
        })

        .state('your-future-post', {
            url: '/plan/:id/your_future.post',
            // parent: 'your-future',
            templateUrl: 'templates/seuFuturoPost.html',
            controller: 'seuFuturoPostCtrl',
            params: {}
        })

        .state('contracheque', {
            url: '/plan/:id/contracheque',
            templateUrl: 'templates/contracheque.html',
            controller: 'contrachequeCtrl'
        })

        .state('contracheque-detalhe', {
            url: '/plan/:id/contracheque/',
            params: { contracheque: null },
            templateUrl: 'templates/contracheque-detalhe.html',
            controller: 'contrachequeDetalheCtrl'
        })

        .state('contatoInterno', {
            url: '/contatoInterno',
            templateUrl: 'templates/contatoInterno.html',
            controller: 'contatoInternoCtrl'
        })

        .state('about', {
            url: '/about',
            templateUrl: 'templates/about.html',
            controller: 'aboutCtrl'
        })

        .state('emprestimo', {
            url: '/plan/:id/emprestimo',
            templateUrl: 'templates/emprestimo.html',
            controller: 'emprestimoCtrl'
        })

        .state('emprestimo-detalhe', {
            url: '/plan/:id/emprestimo/detalhe',
            params: { ano: '', numero: '' },
            templateUrl: 'templates/emprestimo-detalhe.html',
            controller: 'emprestimoDetalheCtrl'
        })

        .state('emprestimo-simulacao', {
            url: '/plan/:id/emprestimo/simulacao',
            templateUrl: 'templates/emprestimo-simulacao.html',
            controller: 'emprestimoSimulacaoCtrl'
        })

        .state('emprestimo-prestacoes', {
            url: '/plan/:id/emprestimo/prestacoes',
            templateUrl: 'templates/emprestimo-prestacoes.html',
            controller: 'emprestimoPrestacoesCtrl'
        })

        .state('emprestimo-confirma', {
            url: '/plan/:id/emprestimo/confirma',
            templateUrl: 'templates/emprestimo-confirma.html',
            controller: 'emprestimoConfirmaCtrl'
        })

        .state('emprestimo-informe', {
            url: '/plan/:id/emprestimo/informe',
            params: { token: {} },
            templateUrl: 'templates/emprestimo-informe.html',
            controller: 'emprestimoInformeController'
        })

        .state('emprestimo-token', {
            url: '/plan/:id/emprestimo/token',
            params: { token: {} },
            templateUrl: 'templates/emprestimo-token.html',
            controller: 'emprestimoTokenCtrl'
        })

        .state('emprestimo-fim', {
            url: '/plan/:id/emprestimo/fim',
            params: { numeroContrato: null },
            templateUrl: 'templates/emprestimo-fim.html',
            controller: 'emprestimoFimCtrl'
        })
    
        .state('recadastramento', {
            url: '/recadastramento',
            templateUrl: 'templates/recadastramento.html',
            controller: 'recadastramentoCtrl'
        })
        
        .state('recadastramentoFinalizado', {
            url: '/recadastramentoFinalizado',
            templateUrl: 'templates/recadastramentoFinalizado.html',
            controller: 'recadastramentoFinalizadoCtrl'
        })
        
        .state('alteracaoPercentual', {
            url: '/alteracaoPercentual',
            templateUrl: 'templates/alteracaoPercentual.html',
            controller: 'alteracaoPercentualCtrl'
        })

        .state('alteracaoPercentualPasso2', {
            url: '/alteracaoPercentualPasso2',
            templateUrl: 'templates/alteracaoPercentualPasso2.html',
            controller: 'alteracaoPercentualPasso2Ctrl'
        })

        .state('alteracaoPercentualResultado', {
            url: '/alteracaoPercentualResultado',
            templateUrl: 'templates/alteracaoPercentualResultado.html',
            controller: 'alteracaoPercentualResultadoCtrl'
        })

        .state('meusComprovantes', {
            url: '/meusComprovantes',
            templateUrl: 'templates/meusComprovantes.html',
            controller: 'meusComprovantesCtrl'
        })

        .state('detalhesComprovante', {
            url: '/detalhesComprovante/:protocolo',
            templateUrl: 'templates/detalhesComprovante.html',
            controller: 'detalhesComprovanteCtrl'
        })

    $urlRouterProvider.otherwise('/login');
});
