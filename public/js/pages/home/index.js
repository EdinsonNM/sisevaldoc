var MyApp = angular.module('myapp', ['ngRoute']);

MyApp.config(function($interpolateProvider,$routeProvider,$locationProvider) {
  $interpolateProvider.startSymbol('//');
  $interpolateProvider.endSymbol('//');
  $routeProvider.when("/", {
        templateUrl : "home/home.html",
        controller:'HomeController'
  })
  .when("/login/:type", {
        templateUrl : "home/login.html",
        controller:'LoginController'
  });


});


MyApp.controller('HomeController', function LoadGroupsController($scope,$http) {
  $http({
		method: 'GET',
		url: './grupo'
	}).success(function(data)
	{
		$scope.groups = data.data; // response data

	});



});

MyApp.controller('LoginController', function LoadGroupsController($scope,$http,$routeParams) {
  $http({
		method: 'GET',
		url: './grupo'
	}).success(function(data)
	{
		$scope.groups = data.data; // response data

	});
  $scope.model={};

  $scope.Login=function(){
    $scope.showAlert=false;
    $http({
  		method: 'POST',
  		url: './login/'+$routeParams.type,
      data:$scope.model
  	}).success(function(data)
  	{
      if(data.success){
        document.location.href="./admin";
      }else{
        $scope.showAlert=true;
        $scope.message=data.message;
        console.log(data);
        setTimeout(function(){
          $scope.showAlert=false;
        },5000)
      }

  	});
  }

});
MyApp.directive(
            "bnLogDomCreation",
            function() {


                // I link the DOM element to the view model.
                function link( $scope, element, attributes ) {
 					$(element).find("a").n33_scrolly();
                }

                // Return directive configuration.
                return({
                    link: link,
                    restrict: "A"
                });


            }
);
