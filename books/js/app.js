var app = angular.module("grApp", ["ngRoute"]);

app.service("shelvesService", function($http) {
	this.getShelves = function() {
		return $http.get("http://lex.toewsweb.net:3002/shelves");
	}
});

app.controller("shelvesController", function($scope, $http, shelvesService) {
	init();

	function init() {
		shelvesService.getShelves().then(function(response) { $scope.shelves = response.data } );
	}

	$scope.get = function(name) {
		$http.get("/shelf/" + name)
			.success(function(response) {
				$scope.books = response;
				console.log("Success: ", response);
			});
	}
});

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when("/books/:shelf", {
			templateUrl: "templates/books.html",
			controller: "booksController"
		})

		.otherwise({
			redirectTo: "/"
		});

	$locationProvider.html5Mode(true);
});

app.controller("booksController", function($scope, $routeParams, $http) {
console.log("Add books controller");
	var name = $routeParams.shelf;
console.log("Shelf name", name);
	$http.get("/shelf/" + name)
		.success(function(response) {
			$scope.books = response;
			console.log("Success from booksController: ", response);
		});
});
