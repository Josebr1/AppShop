angular.module('app.controllers', [])

.controller('categoriasCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {

    var urlLanches = "http://etprogramador.ga/lanche.json";
    $scope.urlLanchesLink = urlLanches;

}])

.controller('homeCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {


}])

.controller('euCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {


}])

.controller('menuCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {


}])

.controller('loginCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {


}])

.controller('registrarSeCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {


}])

.controller('configuraEsCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {
$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
});

}])

.controller('buscarPratosERestaurantesCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {

$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
});

}])

.controller('meuCarrinhoCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {
$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
});

}])

.controller('pagamentoCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', '$ionicHistory',
function ($scope, $stateParams, $ionicPopup, $state, $ionicHistory) {

    $scope.finalizarPedido = function(){
        $ionicPopup.alert({
                title: 'Pedido confirmado!',
                template: 'Daqui a pouco chega :)'
            }).then(function(){
                
                //$state.go('tabsController.home', {}, {reload: true});
                
                $ionicHistory.clearCache().then(function(){
                $state.go('tabsController.home', {}, {reload: true});
                });
            });
    };


}])

.controller('pedidoFinalizadoCtrl', ['$scope', '$stateParams',  
function ($scope, $stateParams) {



}])

.controller('categoriaCtrl', ['factoryService','$scope', '$stateParams', '$ionicLoading', 
function (factoryService ,$scope, $stateParams, $ionicLoading) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    });

    var url = $stateParams.urlId;

    $ionicLoading.show();
    console.log("HTTP");
    console.log(url);
    factoryService.lista(url).then(function (response){
        $scope.produtos = response;
    }, function(error){
        console.log(error);
    }).finally(function(){
        $ionicLoading.hide();
    })

}])

.controller('detalheDoProdutoCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {
$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
});

}])
