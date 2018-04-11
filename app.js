// Module
var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);

// Router
weatherApp.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.when('/', {
        templateUrl:"pages/home.htm",
        controller:"homeControl",
    });

    $routeProvider.when('/forecast', {
        templateUrl:"pages/forecast.htm",
        controller:"forecastControl",
    });
    
    $routeProvider.when('/forecast/:city', {
        templateUrl:"pages/forecast.htm",
        controller:"forecastControl",
    });
});

// Services
weatherApp.service('cityService', function($resource){
    this.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/weather");
    this.appId = "282827bd3533ce138a7a5616cc102dd2";
    this.cities = {
        Ottawa:"Ottawa",
        Toronto:"Toronto",
        Montreal:"Montreal",
        Waterloo:"Waterloo",
    }
});

// home contoller
weatherApp.controller("homeControl",['$scope','cityService',function($scope,cityService){
    $scope.cities = cityService.cities;
    $scope.city = $scope.cities.Ottawa;
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });
}]);

// forecast contoller
weatherApp.controller("forecastControl",['$scope','$routeParams','$filter','cityService', function($scope, $routeParams,$filter,cityService){
    $scope.city = $routeParams.city || "Ottawa";
    $scope.country = "ca";
    $scope.cities = cityService.cities;
    $scope.result = cityService.weatherAPI.get({q:$scope.city+","+$scope.country, APPID: cityService.appId, units:"metric"});
    $scope.toDateStr = function (dateTime) {
        console.log(dateTime);
        return $filter('date')(dateTime,"yyyy-MM-dd");
    }
    console.log($scope.result);
}]);