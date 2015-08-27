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
  })
  .when("/recuperarpassword", {
        templateUrl : "home/recuperarpassword.html",
        controller:'RecuperarPasswordController'
  })
  .when("/cambiarpassword/:code", {
        templateUrl : "home/cambiarpassword.html",
        controller:'CambiarPasswordController'
  })
  ;


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

MyApp.controller('LoginController', function LoginController($scope,$http,$routeParams) {
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

MyApp.controller('RecuperarPasswordController', function RecuperarPasswordController($location,$scope,$http,$routeParams) {
  //recuperar password
  $scope.Recuperar=function(){
    $scope.showAlert=false;
    $http({
  		method: 'GET',
  		url: './loginuser/recuperar-password?username='+$scope.model.username
  	}).success(function(data){
      console.log(data);
      if(data.success){
        $scope.message='Se ha enviado un correo a su dirección de email registrada para restablecer su contraseña.'
      }else{
        $scope.message=data.message;
      }
  	});
  }
});

MyApp.controller('CambiarPasswordController', function RecuperarPasswordController($routeParams,$location,$scope,$http,$routeParams) {
  //recuperar password
  $scope.CambiarPassword=function(){
    $scope.showAlert=false;
    var params={
      code:$routeParams.code,
      password:$scope.model.password
    }
    $http({
  		method: 'POST',
  		url: './loginuser/cambiar-password',
      data:params
  	}).success(function(data){
      console.log(data);
      if(data.success){
        $scope.message='Se realizó el cambio de su contraseña satisfactoriamente';
      }else{
        $scope.message=data.message;
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
