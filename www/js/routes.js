angular.module('app.routes', ['ionicUIRouter'])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider


      .state('tabsController.allCategories', {
        url: '/all-categories',
        views: {
          'categories': {
            templateUrl: 'templates/all-categories.html',
            controller: 'allCategoriesController'
          }
        }
      })

      .state('tabsController.home', {
        url: '/home',
        views: {
          'home': {
            templateUrl: 'templates/home.html',
            controller: 'homeController'
          }
        }
      })

      .state('tabsController.profile', {
        url: '/profile',
        views: {
          'profile': {
            templateUrl: 'templates/profile.html',
            controller: 'profileController'
          }
        }
      })

      .state('tabsController', {
        url: '/page',
        templateUrl: 'templates/tabs-controller.html',
        abstract: true
      })

      .state('signIn', {
        url: '/sign-in',
        templateUrl: 'templates/sign-in.html',
        controller: 'signInController'
      })

      .state('signUp', {
        url: '/sing-up',
        templateUrl: 'templates/sign-up.html',
        controller: 'signUpController'
      })

      .state('settings', {
        url: '/settings',
        templateUrl: 'templates/settings.html',
        controller: 'settingsController'
      })

      .state('searchByProduct', {
        url: '/search-by-product',
        templateUrl: 'templates/search-by-product.html',
        controller: 'searchByProductController'
      })

      .state('shoppingCart', {
        url: '/shopping-cart',
        templateUrl: 'templates/shopping-cart.html',
        controller: 'shoppingCartController'
      })

      .state('detailIsPayment', {
        url: '/detail-is-payment',
        templateUrl: 'templates/detail-is-payment.html',
        controller: 'detailIsPaymentController'

      })

      .state('deliveryAddress', {
        url: '/delivery-address',
        templateUrl: 'templates/delivery-address.html',
        controller: 'deliveryAddressController'

      })

      .state('productCategory', {
        url: '/product-category:urlId',
        templateUrl: 'templates/product-category.html',
        controller: 'productCategoryController'
      })

      .state('productDetail', {
        url: '/product-detail:idProduto',
        templateUrl: 'templates/product-detail.html',
        controller: 'productDetailController'
      })

    $urlRouterProvider.otherwise('/sign-in');


  });
