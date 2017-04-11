angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);

angular.module('app.services', [])
.service('factoryService', function ($http, $q) {

  return {
    lista: function (url) {
      return $http({
        method: 'GET',
        url: url,
        headers: {'Access-Control-Allow-Origin': '*'}
      }).then(function (response) {
        return response.data;
      });
    }
  };

});


