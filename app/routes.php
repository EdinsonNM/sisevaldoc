<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/
//llamamos con controlador restfull

Route::controller('login/{type}','LoginController');
Route::controller('admin','AdminController');
Route::controller('home','HomeController');
Route::controller('import','ImportController');
Route::controller('print','PrintController');
Route::controller('loginuser','LoginUserController');

Route::resource('facultad','FacultadController');
Route::resource('categoriadocente','CategoriaDocenteController');
Route::resource('escuela','EscuelaController');
Route::resource('grupo','GrupoController');
Route::resource('docente','DocenteController');
Route::resource('curso','CursoController');
Route::resource('semestre','SemestreController');
Route::resource('alumno','AlumnoController');
Route::resource('criterioevaluacion','CriterioEvaluacionController');
Route::resource('etapaevaluacion','EtapaEvaluacionController');
Route::resource('cursoasignado','CursoAsignadoController');

Route::resource('grado','GradoController');
Route::resource('titulo','TituloController');
Route::resource('tipodedicacion','TipoDedicacionController');

Route::resource('plantillacriterios','PlantillaCriteriosController');
Route::resource('inscripcioncurso','InscripcionCursoController');
Route::resource('tipovaloracion','TipoValoracionController');

Route::resource('autoevaluacion','AutoEvaluacionController');
Route::resource('valoracionautoevaluacion','ValoracionAutoevaluacionController');

Route::resource('alumnocurso','AlumnoCursoController');
Route::resource('evaluacion','EvaluacionController');
Route::resource('valoracionevaluacion','ValoracionEvaluacionController');

Route::resource('actividad','ActividadController');
Route::resource('cargalectiva','CargaLectivaController');
Route::resource('carganolectiva','CargaNoLectivaController');

Route::controller('reports','ReportsController');

Route::resource('evaluacionjefedpto','EvaluacionJefeDptoController');
Route::resource('valoracionevaluacionjefedpto','ValoracionEvaluacionJefeDptoController');

Route::get('docente/methods/jefes-dpto','DocenteController@DocentesJefesDpto');
