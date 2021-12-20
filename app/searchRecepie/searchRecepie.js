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
    // function InitPage() {
    //   var data = $cookies.getObject("foods");
    //   if(data){
    //     console.log("fav count - ", data.length);
    //     $scope.favCount = data.length;
    //   }
    // }

    // InitPage();

    // To store all the food items for search
    $scope.foodItems = [];

    // To show and hide fetch more Button
    $scope.showFetchMore = false;

    // To track page number and key of last search to fetch more items
    var page = 1;
    var lastSearchKey = "";

    // To control the visibility of the loading spinner
    $scope.showSpinner = false;

    // To store the message if we dont get any data for the search
    $scope.badSearchMsg = false;

    // function to handle the form submission to fetch food names
    $scope.getFoods = function (searchKey) {
      // Checking if the search field is empty and if so do nothing
      if (searchKey === "") {
        return;
      }

      // displaying the loading spinner
      // $scope.showSpinner = true;

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

            if (res.data.count === 0) {
              console.log("count - ", res.data.count);
              $scope.badSearchMsg = `Theres no result for ${searchKey}`;
              $scope.showFetchMore = false;
              $scope.showSpinner = false;
              return;
            }

            var foodItems = res.data.hits;
            // console.log("2 - ", foodItems);

            // Since we have the response we hide the loading spinner
            $scope.showSpinner = false;

            // Setting data to the model for displaying items
            $scope.foodItems = foodItems;
          },
          function (err) {
            // Even in error, response we hide the loading spinner
            $scope.showSpinner = false;

            console.log(err);
          }
        );

      // Clearing the input after successful response
      $scope.searchKey = "";

      // Display the loading spinner
      $scope.showSpinner = true;

      // resetting page number and search key
      page = 1;
      lastSearchKey = searchKey;

      // Used to see if there are miore items available
      if ($scope.foodItems.length < 12) {
        $scope.showFetchMore = true;
      } else {
        $scope.showFetchMore = false;
      }
    };

    // Getting next Page if exists
    $scope.getNextPage = function () {
      // Displaying the loading spinner
      $scope.showSpinner = true;

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

            if (newfoodItems.length < 12) {
              console.log("End of search");
              $scope.badSearchMsg = `Sorry, We are at the end of the page`;
              $scope.showFetchMore = false;
              $scope.showSpinner = false;
              return;
            }

            // existing details
            var availableItems = $scope.foodItems;

            // Concatinating all the available data too display
            var all = availableItems.concat(newfoodItems);

            // Since we have the response we hide the loading spinner
            $scope.showSpinner = false;

            $scope.foodItems = all;
            console.log("final", res);
          },
          function (err) {
            // Even in error response we hide the loading spinner
            $scope.showSpinner = false;

            // Catching the errors
            console.log(err);
          }
        );
    };

    // Function to take to the details page
    $scope.loadDetailsPage = function (url) {
      console.log(url);

      var parts = url.split("/");
      var id = parts[parts.length - 1].split("_")[1];

      console.log("Loading details page - ", id);

      // Changing the location of the page
      $location.path(`/resecipe/${id}`);
    };
  },
]);
