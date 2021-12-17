let app = angular.module("recepieApp", [
  "ngRoute",
  "recepieModule",
  "searchRecepieModule"
]);


app.config([
  // Routing Configration
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/", {                                      // Route for main Page
        templateUrl: "views/searchRecepie.html",
        controller: "searchRecepieController",
      })
      .when("/resecipe/:id", {                          // Route for details Page
        templateUrl: "views/recepie.html",
        controller: "recepieController",
      })
      .otherwise({
        redirectTo: "/",
      });
  },
]);



// app.service("fetchData", [
//   "$http",
//   function ($http) {
//     // fetching the list of food names for search keyword
//     this.fetchNames = function (searchkey, successResponse) {
//       $http
//         .get(
//           `https://api.edamam.com/api/recipes/v2?type=public&q=${searchkey}&from=20&to=40&app_id=a6561902&app_key=499f593c405f9c6151b2a0abd9da5360`
//         )
//         .then(successResponse, function (err) {
//           console.log(err);
//         });
//     };

//     // fetching a single food
//     // ......
//   },
// ]);


// Controller for search Page
// app.controller("c1", [
//   "$scope",
//   "fetchData",
//   "$http",
//   function ($scope, fetchData, $http) {
//     $scope.foodItems = [];

//     // function to handle the form submission to fetch food names
//     $scope.getFoods = function (searchKey) {
//       // Checking if the search field is empty and if so do nothing
//       if (searchKey === "") {
//         return;
//       }

//       // calling the service to fetch data from the server
//       var resData = fetchData.fetchNames(searchKey, handleSuccessResponse);

//       console.log("in controller", resData);

//       // Function to handle the success response from server
//       function handleSuccessResponse(res) {
//         console.log(res);

//         $scope.foodItems = res.data;
//         // console.log(foodItems.hits);

//         return res;
//       }

//       // Clearing the input after successful response
//       $scope.searchKey = "";
//       console.log("Search foods for - ", searchKey);
//     };

//     $scope.getFoodsByKey = function (searchKey) {
//       // Checking if the search field is empty and if so do nothing
//       if (searchKey === "") {
//         return;
//       }

//       $http
//         .get(
//           `https://api.edamam.com/api/recipes/v2?type=public&q=${searchKey}&from=20&to=40&app_id=a6561902&app_key=499f593c405f9c6151b2a0abd9da5360`
//         )
//         .then(function(res) {
//           console.log("Got Response");

//           var foodItems = res.data.hits;
//           console.log("2 - ", foodItems);

//           $scope.foodItems = foodItems;

//         }, function (err) {
//           console.log(err);
//         });
//     };
//   },
// ]);

// Controller for the details page
// app.controller("c2", function ($scope) {
//   $scope.msg = "C2";
// });
