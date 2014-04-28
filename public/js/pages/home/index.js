var MyApp = angular.module('myapp', []);
 
MyApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('//');
  $interpolateProvider.endSymbol('//');
});
 
 
MyApp.controller('LoadGroupsController', function LoadGroupsController($scope,$http) {
    $http({
		method: 'GET', 
		url: './grupo'
	}).success(function(data)
	{
		$scope.groups = data.data; // response data 

	});


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

