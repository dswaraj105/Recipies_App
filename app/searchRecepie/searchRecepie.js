let searchRecepie = angular.module("searchRecepieModule", []);


searchRecepie.service("fetchData", [
  "$http",
  function ($http) {
    // fetching the list of food names for search keyword
    this.fetchNames = function (searchkey, successResponse) {
      $http
        .get(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${searchkey}&from=20&to=40&app_id=a6561902&app_key=499f593c405f9c6151b2a0abd9da5360`
        )
        .then(successResponse, function (err) {
          console.log(err);
        });
    };

    // fetching a single food
    // ......
  },
]);

// Controller for main page
searchRecepie.controller("searchRecepieController", [
  "$scope",
  "fetchData",
  "$http",
  "$location",
  function ($scope, fetchData, $http, $location) {
    // To store all the food items for search
    $scope.foodItems = [];

    // To show and hide fetch more Button
    $scope.showFetchMore = false;

    // To track page number and key of last search to fetch more items
    var page = 1;
    var lastSearchKey = "";

    // function to handle the form submission to fetch food names
    $scope.getFoods = function (searchKey) {
      // Checking if the search field is empty and if so do nothing
      if (searchKey === "") {
        return;
      }

      // calling the service to fetch data from the server
      var resData = fetchData.fetchNames(searchKey, handleSuccessResponse);

      console.log("in controller", resData);

      // Function to handle the success response from server
      function handleSuccessResponse(res) {
        console.log(res);

        $scope.foodItems = res.data;
        // console.log(foodItems.hits);

        return res;
      }

      // Clearing the input after successful response
      $scope.searchKey = "";
      console.log("Search foods for - ", searchKey);
    };

    $scope.getFoodsByKey = function (searchKey) {
      // Checking if the search field is empty and if so do nothing
      if (searchKey === "") {
        return;
      }

      $http
        .get(
          // `https://api.edamam.com/api/recipes/v2?type=public&q=${searchKey}&from=20&to=40&app_id=a6561902&app_key=499f593c405f9c6151b2a0abd9da5360`
          `https://api.edamam.com/search?q=${searchKey}&app_id=4d537151&app_key=d9d78d79041c87d45d61f24146cf7da5&from=0&to=12`
        )
        .then(
          function (res) {
            console.log("Got Response", res);

            var foodItems = res.data.hits;
            // console.log("2 - ", foodItems);

            // Setting data to the model for displaying items
            $scope.foodItems = foodItems;
          },
          function (err) {
            console.log(err);
          }
        );

      // Clearing the input after successful response
      $scope.searchKey = "";

      // resetting page number and search key
      page = 1;
      lastSearchKey = searchKey;

      // Used to see if there are miore items available
      if($scope.foodItems.length < 12){
        $scope.showFetchMore = true;
      } else {
        $scope.showFetchMore = false;
      }
    };

    // Getting next Page if exists
    $scope.getNextPage = function(){

      // Fixing the start and end values for getting further pages
      var low = page * 12;
      var max = page * 12 + 12;

      $http
        .get(
          // `https://api.edamam.com/api/recipes/v2?type=public&q=${searchKey}&from=20&to=40&app_id=a6561902&app_key=499f593c405f9c6151b2a0abd9da5360`
          `https://api.edamam.com/search?q=${lastSearchKey}&app_id=4d537151&app_key=d9d78d79041c87d45d61f24146cf7da5&from=${low}&to=${max}`
        )
        .then(
          function (res) {
            // console.log("Got Response for sequal", res);

            // new food details
            var newfoodItems = res.data.hits;

            // existing details
            var availableItems = $scope.foodItems;

            // Concatinating all the available data too display
            var all = availableItems.concat(newfoodItems);

            $scope.foodItems = all;
            console.log("final", all);
          },
          function (err) {

            // Catching the errors
            console.log(err);
          }
        );

    }

    // Function to take to the details page 
    $scope.loadDetailsPage = function(url){

      console.log(url);

      var parts = url.split("/");
      var id = parts[parts.length - 1].split('_')[1];

      console.log("Loading details page - ", id);

      // Changing the location of the page
      $location.path(`/resecipe/${id}`);
    }
  },
]);
