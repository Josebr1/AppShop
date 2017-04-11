angular.module('app.routes', ['ionicUIRouter'])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider


      .state('tabsController.categorias', {
        url: '/categories',
        views: {
          'tab3': {
            templateUrl: 'templates/categorias.html',
            controller: 'categoriasCtrl'
          }
        }
      })

      .state('tabsController.home', {
        url: '/home',
        views: {
          'tab1': {
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
          }
        }
      })

      .state('tabsController.eu', {
        url: '/eu-page',
        views: {
          'tab4': {
            templateUrl: 'templates/eu.html',
            controller: 'euCtrl'
          }
        }
      })

      .state('tabsController', {
        url: '/page1',
        templateUrl: 'templates/tabsController.html',
        abstract: true
      })

      .state('login', {
        url: '/sing-in',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })

      .state('registrarSe', {
        url: '/sing-up',
            templateUrl: 'templates/registrarSe.html',
            controller: 'registrarSeCtrl'
      })

      .state('configuraEs', {
        url: '/settings',
        templateUrl: 'templates/configuraEs.html',
        controller: 'configuraEsCtrl'
      })

      .state('buscarPratosERestaurantes', {
        url: '/buscar-pratos-restaurantes',
            templateUrl: 'templates/buscarPratosERestaurantes.html',
            controller: 'buscarPratosERestaurantesCtrl'
      })

      .state('meuCarrinho', {
    url: '/carrinho',

        templateUrl: 'templates/meuCarrinho.html',
        controller: 'meuCarrinhoCtrl'

  })


      .state('pagamento', {
        url: '/pagamento',
        templateUrl: 'templates/pagamento.html',
        controller: 'pagamentoCtrl'

      })

      .state('pedidoFinalizado', {
        url: '/pedido-finalizado',
        templateUrl: 'templates/pedidoFinalizado.html',
        controller: 'pedidoFinalizadoCtrl'

      })

       .state('categoria', {
        url: '/peoduto-categoria:urlId',
            templateUrl: 'templates/categoria.html',
            controller: 'categoriaCtrl'
      })

      .state('detalheDoProduto', {
        url: '/detalhe-produto',
            templateUrl: 'templates/detalheDoProduto.html',
            controller: 'detalheDoProdutoCtrl'
      })

    $urlRouterProvider.otherwise('/sing-in');


  });
