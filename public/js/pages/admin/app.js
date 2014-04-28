var app = angular.module("app",['ngRoute','ngResource','ngTable','angularTree','angularFileUpload',"highcharts-ng"]).run(function($http,$rootScope,$location) {
  $rootScope.showIndexAlumno=false;
  $rootScope.showIndexDocente=false;
  $rootScope.user={};
  $http({url: './admin/usuario',method: "GET"}).success(function (data) {
            $rootScope.user=data.data;
            
   });
  $http({url: './admin/type',method: "GET"}).success(function (data) {
      switch(data.type){
              case "alumno": $rootScope.showIndexAlumno=true;
                      break;
              case "docente": $rootScope.showIndexDocente=true;
                      break;
              case 3:
                      break;
      }
            
   });

  var baseLen = $location.absUrl().length - $location.url().length-6;
  $rootScope.pathBase=$location.absUrl().substring(0,baseLen);
  console.log($rootScope.pathBase)
});


app.config(function($interpolateProvider, $routeProvider){
	$interpolateProvider.startSymbol('//');
  	$interpolateProvider.endSymbol('//');

	$routeProvider.when("/", {
        templateUrl : "templates/index.html"
    }) 
    .when('/#', { })  
    .when('/facultad', {
      title:"Listado de Facultades",
      templateUrl : "templates/facultad/list.html",
      controller : "FacultadController"
    })  
    .when('/semestre', {
      templateUrl : "templates/semestre/list.html",
     controller : "SemestreController"
    })
    .when('/docente', {
      templateUrl : "templates/docente/list.html",
     controller : "DocenteController"
    })
    .when('/alumno', {
      templateUrl : "templates/alumno/list.html",
     controller : "AlumnoController"
    })
    .when('/categoriadocente', {
      templateUrl : "templates/categoriadocente/list.html",
     controller : "CategoriaDocenteController"
    })
    .when('/grado', {
      templateUrl : "templates/grado/list.html",
     controller : "GradoController"
    })
    .when('/titulo', {
      templateUrl : "templates/titulo/list.html",
     controller : "TituloController"
    })
    .when('/actividad', {
      templateUrl : "templates/actividad/list.html",
     controller : "ActividadController"
    })
    .when('/matrizevaluacion', {
      templateUrl : "templates/plantillacriterios/list.html",
     controller : "PlantillaCriteriosController"
    })
    .when('/matrizevaluacion/:id/criterioevaluacion', {
      templateUrl : "templates/criterioevaluacion/list.html",
     controller : "CriterioEvaluacionController"
    })
    .when('/asignacioncursos', {
      templateUrl : "templates/asignacioncursos/list.html",
     controller : "AsignacionCursosController"
    })
    .when('/evaluaciondocentes', {
      templateUrl : "templates/evaluaciondocentes/list.html",
     controller : "EvaluacionDocentesController"
    })
    .when('/cursoasignado/:id/evaluacionjefedpto', {
      templateUrl : "templates/evaluacionjefedpto/list.html",
     controller : "EvaluacionJefeDptoController"
    })
    .when('/cursoasignado', {
      templateUrl : "templates/cursoasignado/list.html",
     controller : "CursoAsignadoController"
    }) 
    .when('/cursoasignado/:id/autoevaluacion', {
      templateUrl : "templates/autoevaluacion/list.html",
     controller : "AutoEvaluacionController"
    })
    .when('/carganolectiva/:idsemestre/docente/:iddocente', {
      templateUrl : "templates/carganolectiva/list.html",
     controller : "CargaNoLectivaController"
    })
    .when('/alumnocurso', {
      templateUrl : "templates/alumnocurso/list.html",
     controller : "AlumnoCursoController"
    })
    .when('/alumnocurso/:id/evaluacion', {
      templateUrl : "templates/evaluacion/list.html",
     controller : "EvaluacionController"
    })
    .when('/cursoasignado/:id/alumnos', {
      templateUrl : "templates/inscripcioncurso/list.html",
     controller : "InscripcionCursoController"
    })
    .when('/cursoasignado/:id/avancecurricular', {
      templateUrl : "templates/cargalectiva/list.html",
     controller : "CargaLectivaController"
    })
    .when('/facultad/:id/escuela', {
      templateUrl : "templates/escuela/list.html",
     controller : "EscuelaController"
    })
    .when('/facultad/:id/etapaevaluacion', {
      templateUrl : "templates/etapaevaluacion/list.html",
     controller : "EtapaEvaluacionController"
    })
    .when('/facultad/:idfacultad/escuela/:idescuela/cursos', {
      templateUrl : "templates/curso/list.html",
     controller : "CursoController"
    })
    .when('/reports/evaluaciondocente', {
      templateUrl : "templates/reports/evaluaciondocente.html",
     controller : "EvaluacionDocenteController"
    })
    .when('/reports/graphicevaluacion', {
      templateUrl : "templates/reports/graphicevaluacion.html",
     controller : "GraphicEvaluacionController"
    })
    .when('/reports/cargahorariaasignada', {
      templateUrl : "templates/reports/cargahorariaasignada.html",
     controller : "CargaHorariaAsignadaController"
    })
    .when('/reports/avancecurricular', {
      templateUrl : "templates/reports/avancecurricular.html",
     controller : "AvanceCurricularController"
    })
     .otherwise({ redirectTo : "/"});
});

app.directive('loadingContainer', function () {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            var loadingLayer = angular.element('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
            element.append(loadingLayer);
            element.addClass('loading-container');
            scope.$watch(attrs.loadingContainer, function(value) {
                loadingLayer.toggleClass('ng-hide', !value);
            });
        }
    };
});

app.directive('windowDir', function ()
{
    return {
        restrict: 'E',//<dir-template></dir-template> hace referencia a un elemento/etiqueta html
        templateUrl: 'templates/window.html',
        scope: {
          title: "@", //variables de alcance($scope) o por valor
          width: "@",
          window:"@",
          content:"@",
          entidad:"=",
          others:"=",
          save: "&",  //útiles para llamar a funciones
          close:"&",
          showfooter:"@",
          stylewidth:"@"
        },
        controller: function($scope){
          // check if it was defined.  If not - set a default
          $scope.title = $scope.title || 'untitled';
          $scope.close=function(){
              console.log("close..")
              $scope.entidad={};
              
              if($scope.myForm.usuario)
                $scope.myForm.usuario.$setValidity('user',true);
          }
        }
    };
});

app.directive('user', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(username) {
        $http({
                url: './admin/useravailable',
                method: "GET",
                params:{
                    username:username
                }
            }).success(function (data) {
                console.log(data.success)
                if(data.success){
                    ctrl.$setValidity('user', true);
                }else{
                    ctrl.$setValidity('user', false);
                }
                
        });
        return username;
      });
    }
  };
});

app.directive('validatePassword', function($http) {
  return {
    scope: {
          username: "@"
    },
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
       ctrl.$parsers.unshift(function(password) {
        var password=password||'';
        if(password.length>=4){
          $http({
                  url: './admin/validatelogin',
                  method: "GET",
                  params:{
                      username:scope.username,
                      password:password
                  }
              }).success(function (data) {
                  console.log(data.success)
                  if(data.success){
                      ctrl.$setValidity('validatePassword', true);
                  }else{
                      ctrl.$setValidity('validatePassword', false);
                  }
                  
          });
        }else{
          ctrl.$setValidity('validatePassword', false);
        }
        return password;
      });
    }
  };
});


app.directive('repeatPassword', function() {
  return {
    scope: {
          newpassword: "@"
    },
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
       ctrl.$parsers.unshift(function(repeatpassword) {
        console.log(scope.newpassword)
        console.log(repeatpassword)
        if(repeatpassword==scope.newpassword){
          ctrl.$setValidity('repeatPassword', true);
        }else{
          ctrl.$setValidity('repeatPassword', false);
        }
        
        return repeatpassword;
      });
    }
  };
});

 app.directive( 'dateInput', [function () {
        if ( Modernizr.inputtypes.date) return {};
        return {
            require: 'ngModel',
            link : function ( scope, elm, attrs ) {
              console.log("date not support")
              console.log($(elm))
                  $(elm).datepicker({
                    dateFormat: 'yy/mm/dd'
                  }); 
            }
        };
} ] )