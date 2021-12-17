let recepie = angular.module("recepieModule", ["ngCookies"]);

recepie.controller("recepieController", [
  "$scope",
  "$location",
  "$routeParams",
  "$http",
  "$cookies",
  function ($scope, $location, $routeParams, $http, $cookies) {
    // Getting the id from param for identifying the food item
    $scope.msg = $routeParams.id;

    // Getting the details of item
    var getIngredients = function (id) {
      $http
        .get(
          `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=a6561902&app_key=499f593c405f9c6151b2a0abd9da5360`
        )
        .then(
          function (res) {
            console.log("Fetched Ingredients");
            console.log(res);

            // Setting data to scope variables for displaying
            $scope.foodName = res.data.recipe.label;
            $scope.ingredients = res.data.recipe.ingredientLines;

            // console.log($scope.ingredients);
            // console.log($scope.foodName);
          },
          function (err) {
            console.log("err");
            console.log(err);
          }
        );
    };

    getIngredients($routeParams.id);

    // Taking the users back to the search page
    $scope.goBack = function () {
      $location.path("/");
    };

    $scope.addToFavourates = function (foodName) {
      
      // Constructing the food item to be stored in a cookie
      var item = {
        name: foodName,
        id: $routeParams.id,
      };
      console.log("Adding to Favourated - ", item);

      // Getting the cookies data
      var data = $cookies.getObject('foods');
      let items = [];
      
      if(data){
        items = data;
      }
      
      // Checking if the item a=exists allready in the cookie
      var index = items.findIndex(i => i.id === item.id);
      console.log(index);

      // If item exists we return
      if(index != -1){
        console.log("Item Exists");
        return;
      }

      items.push(item);

      // Setting the cookie
      $cookies.putObject('foods', items);

    };
  },
]);
