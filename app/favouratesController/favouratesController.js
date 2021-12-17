var favourate = angular.module('favourate', ['ngCookies']);

favourate.controller('favourateController', ['$scope', '$cookies', '$location', function($scope, $cookies, $location){
  function InitializePage() {
    var data = $cookies.getObject('foods');
    console.log(data);

    $scope.foodItems = data;
  }

  InitializePage();

  $scope.loadDetailsPage = function(id){

    // console.log(url);

    // var parts = url.split("/");
    // var id = parts[parts.length - 1].split('_')[1];

    // console.log("Loading details page - ", id);

    // Changing the location of the page
    $location.path(`/resecipe/${id}`);
  }
}]);