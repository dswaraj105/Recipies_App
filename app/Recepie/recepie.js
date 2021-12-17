let recepie = angular.module('recepieModule', []);

recepie.controller('recepieController', ['$scope', function($scope){
  $scope.msg = "Hello from recepie COntroller";
  
}])