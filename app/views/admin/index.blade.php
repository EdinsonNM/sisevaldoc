<!DOCTYPE html>
<html lang="es">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
  	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  		{{ HTML::script('js/jquery.min.js') }}
      {{ HTML::script('js/bootstrap.min.js') }}
      {{ HTML::script('js/libs/noty/jquery.noty.js') }}
      {{ HTML::script('js/libs/noty/layouts/center.js') }}
      {{ HTML::script('js/libs/noty/layouts/bottomRight.js') }}
      {{ HTML::script('js/libs/noty/themes/default.js') }}
      {{ HTML::script('js/libs/underscore-min.js') }}
      {{ HTML::script('js/libs/modernizr.custom.57796.js') }}
      {{ HTML::script('js/libs/jquery-ui-1.10.4.custom.min.js') }}

      {{ HTML::script('js/libs/moment.min.js') }}
      {{ HTML::script('js/libs/moment-timezone.min.js') }}
      {{ HTML::script('js/libs/moment-timezone-data.js') }}

        {{ HTML::style('css/normalize.css') }}
        {{ HTML::style('css/bootstrap.min.css') }}
        {{ HTML::style('css/home.css') }}
        {{ HTML::style('css/ng-table.min.css') }}
        {{ HTML::style('css/ng-quick-date.css') }}
        {{ HTML::style('css/jquery-ui-1.10.4.custom.css') }}
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  </head>
  <body ng-app='app'>
  	<nav class="navbar navbar-default  hidden-print" role="navigation">
  <div class="container-fluid" ng-controller="appController">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Sisevaldoc</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">

        <li ng-repeat="item in menu" ng-class="{ 'dropdown': item.children.length>0 }">
          <a href="//item.url//"  ng-click="itemclick($index)"  class="dropdown-toggle" data-toggle="dropdown">
            <span class='//item.icon//'></span> //item.title//
            <b ng-if="item.children.length>0" class="caret"></b>
          </a>
          <ul ng-if="item.children.length>0" class="dropdown-menu">
            <li ng-repeat="subitem in item.children" >
              <a href="//subitem.url//">
                <span class='//item.icon//'></span> //subitem.title//
              </a>
            </li>
          </ul>

        </li>

      </ul>

      <ul class="nav navbar-nav navbar-right">

        <li class="dropdown">
          <a style="cursor:pointer;" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span> Bienvenido, {{ Sentry::getUser()->first_name }} <b class="caret"></b></a>
          <ul class="dropdown-menu">
            <li><a style="cursor:pointer;" data-toggle="modal" data-target="#winUpdPassword" ng-click="updatePassword()">Cambiar mi Contraseña</a></li>

            <li class="divider"></li>
            <li>{{ HTML::link('admin/logout', 'Cerrar Sesión') }}</li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
    <window-dir title="Cambiar Contraseña" window="winUpdPassword" content="templates/usuario/form-updatepassword.html" entidad="entidad" others="others" save="saveUpdatePassword()"></window-dir>
  </div><!-- /.container-fluid -->
</nav>

<div id="header" class="hidden-print">

<h4>UNIVERSIDAD NACIONAL DE UCAYALI</h4>
Sistema Informático para la Evaluación del Desempeño del Docente
</div>
 <div  id="container" class="container-fluid" >
    <div ng-view>
    </div>
 </div>



  </body>
</html>


{{ HTML::script('js/libs/angular/angular.min.js') }}
{{ HTML::script('js/libs/angular/angular-file-upload.min.js') }}
{{ HTML::script('js/libs/angular/angular-route.min.js') }}
{{ HTML::script('js/libs/angular/angular-resource.min.js') }}
{{ HTML::script('js/libs/angular/ng-table.min.js') }}
{{ HTML::script('js/libs/angular/angular.tree.js') }}
<script src="http://code.highcharts.com/stock/highstock.src.js"></script>
{{ HTML::script('js/libs/angular/highcharts-ng.js') }}


{{ HTML::script('js/pages/admin/app.js') }}
{{ HTML::script('js/pages/admin/controller.js') }}
{{ HTML::script('controllers/FacultadController.js') }}
{{ HTML::script('controllers/EscuelaController.js') }}
{{ HTML::script('controllers/DocenteController.js') }}
{{ HTML::script('controllers/CategoriaDocenteController.js') }}
{{ HTML::script('controllers/CursoController.js') }}
{{ HTML::script('controllers/SemestreController.js') }}
{{ HTML::script('controllers/AlumnoController.js') }}
{{ HTML::script('controllers/CriterioEvaluacionController.js') }}
{{ HTML::script('controllers/EtapaEvaluacionController.js') }}
{{ HTML::script('controllers/CursoAsignadoController.js') }}
{{ HTML::script('controllers/GradoController.js') }}
{{ HTML::script('controllers/TituloController.js') }}
{{ HTML::script('controllers/PlantillaCriteriosController.js') }}
{{ HTML::script('controllers/InscripcionCursoController.js') }}
{{ HTML::script('controllers/AutoEvaluacionController.js') }}
{{ HTML::script('controllers/AlumnoCursoController.js') }}
{{ HTML::script('controllers/EvaluacionController.js') }}
{{ HTML::script('controllers/ActividadController.js') }}
{{ HTML::script('controllers/AsignacionCursosController.js') }}
{{ HTML::script('controllers/CargaLectivaController.js') }}
{{ HTML::script('controllers/CargaNoLectivaController.js') }}
{{ HTML::script('controllers/ReportsController.js') }}
{{ HTML::script('controllers/EvaluacionDocentesController.js') }}
{{ HTML::script('controllers/EvaluacionJefeDptoController.js') }}
{{ HTML::script('services/Services.js') }}
