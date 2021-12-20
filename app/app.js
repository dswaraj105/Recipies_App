let app = angular.module("recepieApp", [
  "ngRoute",
  "recepieModule",
  "searchRecepieModule",
  "favourate",
  "ngCookies"
]);

app.config([
  // Routing Configration
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/", {
        // Route for main Page
        templateUrl: "views/searchRecepie.html",
        controller: "searchRecepieController",
      })
      .when("/resecipe/:id", {
        // Route for details Page
        templateUrl: "views/recepie.html",
        controller: "recepieController",
      })
      .when("/favourates", {
        // Route for details Page
        templateUrl: "views/favourates.html",
        controller: "favourateController",
      })
      .otherwise({
        redirectTo: "/",
      });
  },
]);

app.controller("favourateController", ["$scope", "$cookies", function ($scope, $cookies) {
  function InitPage() {
    var data = $cookies.getObject("foods");
    if(data){
      // console.log("fav count - ", data.length);
      $scope.favCount = data.length;
    }
  }

  InitPage();
}]);
