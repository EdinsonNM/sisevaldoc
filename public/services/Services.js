app.factory('GradoService', ['$resource', function($resource) {

	return $resource( './grado/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('TituloService', ['$resource', function($resource) {

	return $resource( './titulo/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('ActividadService', ['$resource', function($resource) {

	return $resource( './actividad/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('CategoriaDocenteService', ['$resource', function($resource) {

	return $resource( './categoriadocente/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('TipoDedicacionService', ['$resource', function($resource) {

	return $resource( './tipodedicacion/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('SemestreService', ['$resource', function($resource) {

	return $resource( './semestre/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('FacultadService', ['$resource', function($resource) {

	return $resource( './facultad/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			}
			/* , method2: { ... } */
		} );

}]);

app.factory('EscuelaService', ['$resource', function($resource) {

	return $resource( './escuela/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('CursoService', ['$resource', function($resource) {

	return $resource( './curso/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('PlantillaCriteriosService', ['$resource', function($resource) {

	return $resource( './plantillacriterios/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('CriterioEvaluacionService', ['$resource', function($resource) {

	return $resource( './criterioevaluacion/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('CursoAsignadoService', ['$resource', function($resource) {

	return $resource( './cursoasignado/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('InscripcionCursoService', ['$resource', function($resource) {

	return $resource( './inscripcioncurso/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('AlumnoService', ['$resource', function($resource) {

	return $resource( './alumno/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);
app.factory('TipoValoracionService', ['$resource', function($resource) {

	return $resource( './tipovaloracion/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('AutoEvaluacionService', ['$resource', function($resource) {

	return $resource( './autoevaluacion/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('EtapaEvaluacionService', ['$resource', function($resource) {

	return $resource( './etapaevaluacion/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('ValoracionAutoevaluacionService', ['$resource', function($resource) {

	return $resource( './valoracionautoevaluacion/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('AlumnoCursoService', ['$resource', function($resource) {

	return $resource( './alumnocurso/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);


app.factory('EvaluacionService', ['$resource', function($resource) {

	return $resource( './evaluacion/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('ValoracionEvaluacionService', ['$resource', function($resource) {

	return $resource( './valoracionevaluacion/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('DocenteService', ['$resource', function($resource) {

	return $resource( './docente/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			updateJefeDpto: { 
				method: 'PUT', 
				params: { id: '@id',updateGroup:true}, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('CargaLectivaService', ['$resource', function($resource) {

	return $resource( './cargalectiva/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('EvaluacionJefeDptoService', ['$resource', function($resource) {

	return $resource( './evaluacionjefedpto/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('ValoracionEvaluacionJefeDptoService', ['$resource', function($resource) {

	return $resource( './valoracionevaluacionjefedpto/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

app.factory('CargaNoLectivaService', ['$resource', function($resource) {

	return $resource( './carganolectiva/:id', 
		{ id: '@id' }, 
		{ 
			save: { 
				method: 'POST'
			},
			update: { 
				method: 'PUT', 
				params: { id: '@id' }, 
				isArray: false 
			},
			delete: { 
				method: 'DELETE', 
				params: { id: '@id' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);