app.controller("EvaluacionDocenteController",function($log,$rootScope,EtapaEvaluacionService,CursoAsignadoService,SemestreService,FacultadService,EscuelaService,DocenteService,$scope,$timeout,$routeParams,$http,$resource,ngTableParams){
	$scope.facultadSelected=-1;
    $scope.escuelaSelected=-1;
    //$scope.docenteSelected=-1;
    //$scope.cursoSelected=-1;
    $scope.semestreSelected=-1;
    $scope.showmessage=false;
    $scope.showLoading=false;
    $scope.entidad={};
    /**/


    FacultadService.get({},function(data){
               $scope.facultades=data.data;
               if(data.total>0)
                $scope.facultadSelected=data.data[0].id;
               $scope.loadEscuelas();
    });

    SemestreService.get({},function(data){
        $scope.semestres=data.data;
        if(data.total>0)
            $scope.semestreSelected=data.data[0].id;
    });
    $scope.loadEscuelas=function(){
        //$scope.escuelaSelected=-1;
        var filter={
            'filter[facultad_id]':$scope.facultadSelected,
            'count':10000
        }
        EscuelaService.get(filter,function(data){
               $scope.escuelas=data.data;
               if(data.total>0)
                $scope.escuelaSelected=data.data[0].id;

               $scope.loadDocentes();
        });
    }
    $scope.loadEtapaEvaluacion=function(facultad_id){
        $scope.plantillaSelected=-1;
        EtapaEvaluacionService.get({
            'filter[semestre_id]':$scope.semestreSelected,
            'filter[facultad_id]':facultad_id,
            'filter[fromquestion]':'Alumno'
        },function(data){
            if(data.total>0){
                $scope.plantillaSelected=data.data[0].plantilla_id;
                 $log.info($scope.plantillaSelected);
            }

        })
    }
    $scope.loadDocentes=function(){
        $scope.docenteSelected=-1;
        DocenteService.get({'filter[escuela_id]':$scope.escuelaSelected},function(data){
            $scope.docentes=data.data;
            if(data.total>0){
                //$scope.docenteSelected=data.data[0].id;
                $scope.loadCursos();
            }
        });
    };
    $scope.loadCursos=function(){
        $scope.cursoSelected=-1;
        var params={
            'filter[docente_id]':$scope.docenteSelected,
            'filter[semestre_id]':$scope.semestreSelected
        };
        CursoAsignadoService.get(params,function(data){
            $scope.cursos=data.data;
            if(data.total>0){
                //$scope.cursoSelected=data.data[0].id;
                $scope.loadEtapaEvaluacion(data.data[0].curso.escuela.facultad_id);
            }
            $scope.changeCurso();
        });
    };
    $scope.changeCurso=function(){
        $.each($scope.cursos,function(){
            if(this.id==$scope.cursoSelected)
                $scope.cursoasignado=this;
        })
    }
	$scope.list=function(){
        $scope.showLoading=true;
        $scope.showmessage=false;
        if($scope.plantillaSelected!=-1){
            if($scope.cursoSelected!=-1){
        		var params={
        			"filter[plantilla_id]":$scope.plantillaSelected,
                    "filter[cursoasignado_id]":$scope.cursoSelected,
                    "criterio_id":1

        		};
        		var Api = $resource('./reports/evaluaciondocente');
        		Api.get(params, function(data) {
        			$scope.data=data.data;
                     $scope.showLoading=false;
        		});
            }else{
                $scope.message="No se ha seleccionado el curso o docente evaluado.";
                $scope.showmessage=true;
                $scope.showLoading=false;
            }
        }else{
            $scope.message="No se encontro el listado de criterios o no  existe una etapa de evaluación para la facultad y el semestre seleccionado";
            $scope.showmessage=true;
             $scope.showLoading=false;
        }

    };
    $scope.show=function(item){
        if(item.visible){
            item.visible=false;
            item.icon="glyphicon glyphicon-plus";
        }
        else{
            item.visible=true;
            item.icon="glyphicon glyphicon-minus";
        }
        return false;
    }
    $scope.ExportToExcel=function(){
        $("#data_download").val($("#reportTable").html());
        $("#myform").submit();
    }


    $scope.logo=$rootScope.pathBase+'/images/logo.png';

    $scope.promedio=function(list){
        var total=0;
        var promedio=0;
        var count=0;
        $.each(list,function(){
            total+=parseInt(this.tipovaloracion.value);
            count++;
        })
        return Math.round(total/count * 10) / 10

    };
});

app.controller("EvaluacionDocenteJdController",function($log,$rootScope,EtapaEvaluacionService,CursoAsignadoService,SemestreService,FacultadService,EscuelaService,DocenteService,$scope,$timeout,$routeParams,$http,$resource,ngTableParams){
    $scope.facultadSelected=-1;
    $scope.escuelaSelected=-1;
    //$scope.docenteSelected=-1;
    //$scope.cursoSelected=-1;
    $scope.semestreSelected=-1;
    $scope.showmessage=false;
    $scope.showLoading=false;
    $scope.entidad={};
    /**/

    $scope.loadingData=true;
    $http({url: './admin/type',method: "GET"}).success(function (data) {
            $scope.faculta_id=data.entity.escuela.facultad_id;
            $scope.escuela=data.entity.escuela.name;
            FacultadService.get({facultad_id:$scope.faculta_id},function(data){
                $scope.facultades=data.data;
                //$scope.others.facultades=data.data;
                if(data.total>0)
                    $scope.facultadSelected=data.data[0].id;
                $scope.loadingData=false;
                $scope.loadEscuelas();
            });
    });


    SemestreService.get({},function(data){
        $scope.semestres=data.data;
        if(data.total>0)
            $scope.semestreSelected=data.data[0].id;
    });

    $scope.loadEscuelas=function(){
        $scope.escuelaSelected=-1;
        $scope.loadingData=true;

         console.log($scope.escuela);
        EscuelaService.get({'filter[facultad_id]':$scope.facultadSelected,'filter[name]':$scope.escuela},function(data){
               $scope.escuelas=data.data;
               if(data.total>0)
                $scope.escuelaSelected=data.data[0].id;
                $scope.loadingData=false;
               $scope.loadDocentes();
        });
    }


    $scope.loadEtapaEvaluacion=function(facultad_id){
        $scope.plantillaSelected=-1;
        EtapaEvaluacionService.get({
            'filter[semestre_id]':$scope.semestreSelected,
            'filter[facultad_id]':facultad_id,
            'filter[fromquestion]':'Alumno'
        },function(data){
            if(data.total>0){
                $scope.plantillaSelected=data.data[0].plantilla_id;
                 $log.info($scope.plantillaSelected);
            }

        })
    }

    $scope.loadDocentes=function(){
        $scope.docenteSelected=-1;
        DocenteService.get({'filter[escuela_id]':$scope.escuelaSelected},function(data){
            $scope.docentes=data.data;
            if(data.total>0){
                //$scope.docenteSelected=data.data[0].id;
                $scope.loadCursos();
            }
        });
    };

    $scope.loadCursos=function(){
        $scope.cursoSelected=-1;
        var params={
            'filter[docente_id]':$scope.docenteSelected,
            'filter[semestre_id]':$scope.semestreSelected
        };
        CursoAsignadoService.get(params,function(data){
            $scope.cursos=data.data;
            if(data.total>0){
                //$scope.cursoSelected=data.data[0].id;
                $scope.loadEtapaEvaluacion(data.data[0].curso.escuela.facultad_id);
            }
            $scope.changeCurso();
        });
    };

    $scope.changeCurso=function(){
        $.each($scope.cursos,function(){
            if(this.id==$scope.cursoSelected)
                $scope.cursoasignado=this;
        })
    }
    $scope.list=function(){
        $scope.showLoading=true;
        $scope.showmessage=false;
        if($scope.plantillaSelected!=-1){
            if($scope.cursoSelected!=-1){
                var params={
                    "filter[plantilla_id]":$scope.plantillaSelected,
                    "filter[cursoasignado_id]":$scope.cursoSelected

                };
                var Api = $resource('./reports/evaluaciondocente');
                Api.get(params, function(data) {
                    $scope.data=data.data;
                    $scope.showLoading=false;
                });
            }else{
                $scope.message="No se ha seleccionado el curso o docente evaluado.";
                $scope.showmessage=true;
                $scope.showLoading=false;
            }
        }else{
            $scope.message="No se encontro el listado de criterios o no  existe una etapa de evaluación para la facultad y el semestre seleccionado";
            $scope.showmessage=true;
             $scope.showLoading=false;
        }

    };

    $scope.show=function(item){
        if(item.visible){
            item.visible=false;
            item.icon="glyphicon glyphicon-plus";
        }
        else{
            item.visible=true;
            item.icon="glyphicon glyphicon-minus";
        }
        return false;
    }

    $scope.ExportToExcel=function(){
        $("#data_download").val($("#reportTable").html());
        $("#myform").submit();
    }


    $scope.logo=$rootScope.pathBase+'/images/logo.png';

    $scope.promedio=function(list){
        var total=0;
        var promedio=0;
        var count=0;
        $.each(list,function(){
            total+=parseInt(this.tipovaloracion.value);
            count++;
        })
        return Math.round(total/count * 10) / 10

    };
});

app.controller("AutoEvaluacionDocenteJdController",function($log,$rootScope,EtapaEvaluacionService,CursoAsignadoService,SemestreService,FacultadService,EscuelaService,DocenteService,$scope,$timeout,$routeParams,$http,$resource,ngTableParams){
    $scope.facultadSelected=-1;
    $scope.escuelaSelected=-1;
    //$scope.docenteSelected=-1;
    //$scope.cursoSelected=-1;
    $scope.semestreSelected=-1;
    $scope.showmessage=false;
    $scope.showLoading=false;
    $scope.entidad={};
    /**/

    $scope.loadingData=true;
    $http({url: './admin/type',method: "GET"}).success(function (data) {
            $scope.faculta_id=data.entity.escuela.facultad_id;
            $scope.escuela=data.entity.escuela.name;
            FacultadService.get({facultad_id:$scope.faculta_id},function(data){
                $scope.facultades=data.data;
                //$scope.others.facultades=data.data;
                if(data.total>0)
                    $scope.facultadSelected=data.data[0].id;
                $scope.loadingData=false;
                $scope.loadEscuelas();
            });
    });


    SemestreService.get({},function(data){
        $scope.semestres=data.data;
        if(data.total>0)
            $scope.semestreSelected=data.data[0].id;
    });

    $scope.loadEscuelas=function(){
        $scope.escuelaSelected=-1;
        $scope.loadingData=true;

         console.log($scope.escuela);
        EscuelaService.get({'filter[facultad_id]':$scope.facultadSelected,'filter[name]':$scope.escuela},function(data){
               $scope.escuelas=data.data;
               if(data.total>0)
                $scope.escuelaSelected=data.data[0].id;
                $scope.loadingData=false;
               $scope.loadDocentes();
        });
    }


    $scope.loadEtapaEvaluacion=function(facultad_id){
        $scope.plantillaSelected=-1;
        EtapaEvaluacionService.get({
            'filter[semestre_id]':$scope.semestreSelected,
            'filter[facultad_id]':facultad_id,
            'filter[fromquestion]':'Docente'
        },function(data){
            if(data.total>0){
                $scope.plantillaSelected=data.data[0].plantilla_id;
                 $log.info($scope.plantillaSelected);
            }

        })
    }

    $scope.loadDocentes=function(){
        $scope.docenteSelected=-1;
        DocenteService.get({'filter[escuela_id]':$scope.escuelaSelected},function(data){
            $scope.docentes=data.data;
            if(data.total>0){
                //$scope.docenteSelected=data.data[0].id;
                $scope.loadCursos();
            }
        });
    };

    $scope.loadCursos=function(){
        $scope.cursoSelected=-1;
        var params={
            'filter[docente_id]':$scope.docenteSelected,
            'filter[semestre_id]':$scope.semestreSelected
        };
        CursoAsignadoService.get(params,function(data){
            $scope.cursos=data.data;
            if(data.total>0){
                //$scope.cursoSelected=data.data[0].id;
                $scope.loadEtapaEvaluacion(data.data[0].curso.escuela.facultad_id);
            }
            $scope.changeCurso();
        });
    };

    $scope.changeCurso=function(){
        $.each($scope.cursos,function(){
            if(this.id==$scope.cursoSelected)
                $scope.cursoasignado=this;
        })
    }
    $scope.list=function(){
        $scope.showLoading=true;
        $scope.showmessage=false;
        if($scope.plantillaSelected!=-1){
            if($scope.cursoSelected!=-1){
                var params={
                    "filter[plantilla_id]":$scope.plantillaSelected,
                    "filter[cursoasignado_id]":$scope.cursoSelected

                };
                var Api = $resource('./reports/autoevaluaciondocentejd');
                Api.get(params, function(data) {
                    $scope.data=data.data;
                    $scope.showLoading=false;
                });
            }else{
                $scope.message="No se ha seleccionado el curso o docente evaluado.";
                $scope.showmessage=true;
                $scope.showLoading=false;
            }
        }else{
            $scope.message="No se encontro el listado de criterios o no  existe una etapa de evaluación para la facultad y el semestre seleccionado";
            $scope.showmessage=true;
             $scope.showLoading=false;
        }

    };

    $scope.show=function(item){
        if(item.visible){
            item.visible=false;
            item.icon="glyphicon glyphicon-plus";
        }
        else{
            item.visible=true;
            item.icon="glyphicon glyphicon-minus";
        }
        return false;
    }

    $scope.ExportToExcel=function(){
        $("#data_download").val($("#reportTable").html());
        $("#myform").submit();
    }


    $scope.logo=$rootScope.pathBase+'/images/logo.png';

    $scope.promedio=function(list){
        var total=0;
        var promedio=0;
        var count=0;
        $.each(list,function(){
            total+=parseInt(this.tipovaloracion.value);
            count++;
        })
        return Math.round(total/count * 10) / 10

    };
});
app.controller("GraphicEvaluacionController",function($log,EtapaEvaluacionService,CursoAsignadoService,SemestreService,FacultadService,EscuelaService,DocenteService,$scope,$timeout,$routeParams,$http,$resource,ngTableParams){
    $scope.facultadSelected=0;
    $scope.escuelaSelected=0;
    $scope.docenteSelected=0;
    $scope.cursoSelected=0;
    $scope.semestreSelected=-1;
    $scope.plantillaSelected=-1;
    $scope.showmessage=false;
    $scope.showLoading=false;
    $scope.chartSeries=[];
    $scope.categories=[];
    $scope.showTable=false;
    $scope.chartConfig = {


        options: {
            chart: {
                type: 'column'
            },
            plotOptions: {
                series: {
                    stacking: ''
                }
            },
            exporting:{
                enabled:true
            },
            tooltip: {
            formatter: function() {
                return '<b>'+$scope.categories[this.x].name +
                    '</b> <br/><b style="border: 1px solid #000;color:'+this.point.series.color+'"">'+this.point.series.name+':</b>' +this.y +'';
            }
        }
        },

        series: [],

        title: {
            text: 'Resumen de Valoración por Criterios de Evaluacion'
        },
        credits: {
            enabled: false
        },
        loading: false,
        size: {},
        xAxis: {
            title: {text: 'criterios'},
            categories: []
        },
        yAxis:{
            allowDecimals:false
        }

    };
    FacultadService.get({},function(data){
               $scope.facultades=data.data;
               if(data.total>0)
                $scope.facultadSelected=data.data[0].id;
               $scope.loadEscuelas();
    });

    SemestreService.get({},function(data){
        $scope.semestres=data.data;
        if(data.total>0){
            $scope.semestreSelected=data.data[0].id;

        }
    });
    $scope.loadEscuelas=function(){
        $scope.escuelaSelected=0;
        //$scope.loadEtapaEvaluacion();
        if($scope.facultadSelected>0){
            EscuelaService.get({'filter[facultad_id]':$scope.facultadSelected},function(data){
                   $scope.escuelas=data.data;

                   $scope.loadDocentes();
            });
        }else{
            $scope.escuelas=[];
            $scope.loadDocentes();
        }

    }

    $scope.loadDocentes=function(){
        //$scope.docenteSelected=0;
        $log.info($scope.escuelaSelected)
        if($scope.escuelaSelected!=0){


            $http({
                url: './reports/docentessemestre',
                method: "GET",
                params:{
                    facultad_id:$scope.facultadSelected,
                    escuela_id:$scope.escuelaSelected,
                    semestre_id:$scope.semestreSelected
                }
            }).success(function (data) {
                $scope.docentes=data;
                $scope.loadCursos();
            });
        }else{
            $scope.docentes=[];
        }


    };
    $scope.loadCursos=function(){
        $scope.cursoSelected=0;
        if($scope.docenteSelected>0){
            var params={
                'filter[docente_id]':$scope.docenteSelected,
                'filter[semestre_id]':$scope.semestreSelected
            };
            CursoAsignadoService.get(params,function(data){
                $scope.cursos=data.data;
                if(data.total>0){
                    $scope.cursoSelected=data.data[0].id;
                    //$scope.loadEtapaEvaluacion(data.data[0].curso.escuela.facultad_id);
                }

            });
        }else{
            $scope.cursos=[];
        }

    };
    $scope.loadCriterios=function(data){
        var myData=data;
        $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        filter:{

        },
        sorting: {
            name: 'asc'     // initial sorting
        }
        }, {
            total: 1,           // length of data
            counts:[],
            getData: function($defer, params) {
                var datapaginate = angular.copy(myData);

                $defer.resolve(myData);
            }
        });
    };
    $scope.chartTypes = [
    {"id": "line", "title": "Line"},
    {"id": "spline", "title": "Smooth line"},
    {"id": "area", "title": "Area"},
    {"id": "areaspline", "title": "Smooth area"},
    {"id": "column", "title": "Column"},
    {"id": "bar", "title": "Bar"},
    {"id": "pie", "title": "Pie"},
    {"id": "scatter", "title": "Scatter"}
  ];
    $scope.list=function(){
        $scope.showLoading=true;
        $scope.showmessage=false;

        EtapaEvaluacionService.get({
            'filter[semestre_id]':$scope.semestreSelected,
            'filter[facultad_id]':$scope.facultadSelected,
            'filter[fromquestion]':'Alumno'

        },function(data){
            if(data.total>0){
                $scope.plantillaSelected=data.data[0].plantilla_id;
                $log.info("PLANTiLLA:"+$scope.plantillaSelected);
                if($scope.semestreSelected!=-1){
                    if($scope.plantillaSelected!=-1){

                            var params={
                                "plantilla_id":$scope.plantillaSelected,
                                "semestre_id":$scope.semestreSelected,
                                "facultad_id":$scope.facultadSelected,
                                "escuela_id":$scope.escuelaSelected,
                                "docente_id":$scope.docenteSelected,
                                "cursoasignado_id":$scope.cursoSelected

                            };
                            $http({
                                url: './reports/resumencriterios',
                                method: "GET",
                                params:params,
                            }).success(function (data) {
                                $scope.data=data;

                                var Siempre={name:'Siempre','data':[],color:'#2f7ed8',dataLabels: { enabled: true}};
                                var Frecuente={name:'Frecuente','data':[],color:'#004072',dataLabels: { enabled: true}};
                                var Poco={name:'Poco','data':[],color:'#8bbc21',dataLabels: { enabled: true}};
                                var Nunca={name:'Nunca','data':[],color:'#981616',dataLabels: { enabled: true}};
                                $scope.categories=[];
                                $scope.cat=[];
                                $scope.totales={Siempre:0,Frecuente:0,Poco:0,Nunca:0};
                                $.each(data,function(index,element){
                                    $scope.totales.Siempre+=parseInt(this.Siempre);
                                    $scope.totales.Frecuente+=parseInt(this.Frecuente);
                                    $scope.totales.Poco+=parseInt(this.Poco);
                                    $scope.totales.Nunca+=parseInt(this.Nunca);
                                    Siempre.data.push(parseInt(this.Siempre));
                                    Frecuente.data.push(parseInt(this.Frecuente));
                                    Poco.data.push(parseInt(this.Poco));
                                    Nunca.data.push(parseInt(this.Nunca));
                                    $scope.categories.push(this);
                                    $scope.cat.push(index);
                                });
                                //$scope.chartSeries=[Siempre,Frecuente,Poco,Nunca];
                                $scope.chartConfig.series=[Siempre,Frecuente,Poco,Nunca];
                                //$scope.chartConfig.xAxis.categories=$scope.cat;
                                $scope.loadCriterios($scope.categories);
                                $scope.showLoading=false;
                                $scope.showTable=true;
                            });


                    }else{
                        $scope.message="No se encontro el listado de criterios o no  existe una etapa de evaluación para la facultad y el semestre seleccionado";
                        $scope.showmessage=true;
                         $scope.showLoading=false;
                    }
                }
            }

        })

    };

});

app.controller("GraphicAutoEvaluacionController",function($log,EtapaEvaluacionService,CursoAsignadoService,SemestreService,FacultadService,EscuelaService,DocenteService,$scope,$timeout,$routeParams,$http,$resource,ngTableParams){
    $scope.facultadSelected=0;
    $scope.escuelaSelected=0;
    $scope.docenteSelected=0;
    $scope.cursoSelected=0;
    $scope.semestreSelected=-1;
    $scope.plantillaSelected=-1;
    $scope.showmessage=false;
    $scope.showLoading=false;
    $scope.chartSeries=[];
    $scope.categories=[];
    $scope.showTable=false;

    $scope.chartConfig = {


        "options": {
            "chart": {
                "type": "areaspline"
            },
            "plotOptions": {
                "series": {
                    "stacking": ""
                }
            }
        },
        credits: {
                enabled: false
            },
        "series": [

        ],
        "title": {
            "text": "Resumen General De Autoevaluacion Docente:"
        },
        subtitle: {
            text: 'Por Variables'
        },
        xAxis: {
            categories: [
                'PLANIFICACION Y PREPARACION DE CLASES (De 10 Preguntas)',
                'METODOLOGIA (De 14 preguntas)',
                'AMBIENTE PARA EL APRENDISAJE (De 6 preguntas)',
                'EVALUACION (De 8 preguntas)',
                'COMPROMISO CON LA INSTITUCION (De 5 preguntas)',
                'INVESTIGACION (De 4 preguntas)'

            ]
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Apreciaciones (%)'
            }
        },
        "loading": false,
        "size": {}
    };
    FacultadService.get({},function(data){
               $scope.facultades=data.data;
               if(data.total>0)
                $scope.facultadSelected=data.data[0].id;
               $scope.loadEscuelas();
    });

    SemestreService.get({},function(data){
        $scope.semestres=data.data;
        if(data.total>0){
            $scope.semestreSelected=data.data[0].id;

        }
    });
    $scope.loadEscuelas=function(){
        $scope.escuelaSelected=0;
        //$scope.loadEtapaEvaluacion();
        if($scope.facultadSelected>0){
            EscuelaService.get({'filter[facultad_id]':$scope.facultadSelected},function(data){
                   $scope.escuelas=data.data;

                   $scope.loadDocentes();
            });
        }else{
            $scope.escuelas=[];
            $scope.loadDocentes();
        }

    }

    $scope.loadDocentes=function(){
        //$scope.docenteSelected=0;
        $log.info($scope.escuelaSelected)
        if($scope.escuelaSelected!=0){


            $http({
                url: './reports/docentessemestre',
                method: "GET",
                params:{
                    facultad_id:$scope.facultadSelected,
                    escuela_id:$scope.escuelaSelected,
                    semestre_id:$scope.semestreSelected
                }
            }).success(function (data) {
                $scope.docentes=data;
                $scope.loadCursos();
            });
        }else{
            $scope.docentes=[];
        }


    };
    $scope.loadCursos=function(){
        $scope.cursoSelected=0;
        if($scope.docenteSelected>0){
            var params={
                'filter[docente_id]':$scope.docenteSelected,
                'filter[semestre_id]':$scope.semestreSelected
            };
            CursoAsignadoService.get(params,function(data){
                $scope.cursos=data.data;
                if(data.total>0){
                    $scope.cursoSelected=data.data[0].id;
                    //$scope.loadEtapaEvaluacion(data.data[0].curso.escuela.facultad_id);
                }

            });
        }else{
            $scope.cursos=[];
        }

    };
    $scope.loadCriterios=function(data){
        var myData=data;
        $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        filter:{

        },
        sorting: {
            name: 'asc'     // initial sorting
        }
        }, {
            total: 1,           // length of data
            counts:[],
            getData: function($defer, params) {
                var datapaginate = angular.copy(myData);

                $defer.resolve(myData);
            }
        });
    };
    $scope.chartTypes = [
    {"id": "line", "title": "Line"},
    {"id": "spline", "title": "Smooth line"},
    {"id": "area", "title": "Area"},
    {"id": "areaspline", "title": "Smooth area"},
    {"id": "column", "title": "Column"},
    {"id": "bar", "title": "Bar"},
    {"id": "pie", "title": "Pie"},
    {"id": "scatter", "title": "Scatter"}
  ];


    $scope.list=function(){
        $scope.showLoading=true;
        $scope.showmessage=false;

        console.log("Facultad id "+ $scope.facultadSelected);
        console.log("Escuela id "+ $scope.escuelaSelected);
        console.log("Semestre id "+ $scope.semestreSelected);

        if(!$scope.tableParams){
        /*EtapaEvaluacionService.get({
            'filter[semestre_id]':$scope.semestreSelected,
            'filter[facultad_id]':$scope.facultadSelected,
            'filter[fromquestion]':'Docente'

        },function(data){

            if(data.total>0){*/

                //if($scope.semestreSelected!=-1){
                    //if($scope.plantillaSelected!=-1){

                         var params={
                               "facultad_id":$scope.facultadSelected,
                                "escuela_id":$scope.escuelaSelected,
                               "semestre_id":$scope.semestreSelected
                               };

                            $http({
                                url: './reports/resumencriteriosauto',
                                method: "GET",
                                params:params,
                            }).success(function (data) {
                                $scope.datatable=data;

                                var Si={
                                    "name":'Si',"data":[],"type": "column", "id": "series-2", "color": "GREEN",dataLabels: { enabled: true}
                                };
                                var No={name:'No',"data":[],"type": "column", "id": "series-3", "color": "BLUE",dataLabels: { enabled: true}
                                };


                                $scope.categories=[];
                                $scope.cat=[];
                                $scope.totales={Si:0,No:0};
                                $.each(data,function(index,element){

                                    Si.data.push(parseFloat(this.PS));
                                    No.data.push(parseFloat(this.PN));

                                    $scope.categories.push(this);
                                    $scope.cat.push(index);
                                });
                                //$scope.chartSeries=[Siempre,Frecuente,Poco,Nunca];
                                $scope.chartConfig.series=[Si,No];
                                //$scope.chartConfig.xAxis.categories=$scope.cat;
                                $scope.loadCriterios($scope.categories);
                                $scope.showLoading=false;
                                $scope.showTable=true;
                            });


                    /*}else{
                        $scope.message="No se encontro el listado de criterios o no  existe una etapa de autoevaluación para la facultad y el semestre seleccionado";
                        $scope.showmessage=true;
                         $scope.showLoading=false;
                        $scope.showTable=false;
                    }*/
                //}
            //}

        /*})*/
        }else
            {
                $scope.tableParams.filter.facultad_id=$scope.facultadSelected;
                $scope.tableParams.filter.escuela_id=$scope.escuelaSelected;
                $scope.tableParams.filter.semestre_id=$scope.semestreSelected;
                $scope.tableParams.reload();
            }
    };

});

app.controller("GraphicEvaluacionJefeController",function($log,EtapaEvaluacionService,CursoAsignadoService,SemestreService,FacultadService,EscuelaService,DocenteService,$scope,$timeout,$routeParams,$http,$resource,ngTableParams){
    $scope.facultadSelected=0;
    $scope.escuelaSelected=0;
    $scope.docenteSelected=0;
    $scope.cursoSelected=0;
    $scope.semestreSelected=-1;
    $scope.plantillaSelected=-1;
    $scope.showmessage=false;
    $scope.showLoading=false;
    $scope.chartSeries=[];
    $scope.categories=[];
    $scope.showTable=false;

    $scope.chartConfig = {
        "options": {
            "chart": {
                "type": "column"
            },

        },
        title: {
            text: 'EVALUACION POR EL JEFE DE DEPARTAMENTO'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            title: {text: 'COD PLAZA'},
            categories: [

            ]
        },
        credits:{
            enabled:false
        },
        yAxis: {
            min: 0,
            max: 30,
            title: {
                text: 'PUNTAJE OBTENIDO'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: []

    };

    FacultadService.get({},function(data){
        $scope.facultades=data.data;
        if(data.total>0)
            $scope.facultadSelected=data.data[0].id;
        $scope.loadEscuelas();
    });

    SemestreService.get({},function(data){
        $scope.semestres=data.data;
        if(data.total>0){
            $scope.semestreSelected=data.data[0].id;

        }
    });
    $scope.loadEscuelas=function(){
        $scope.escuelaSelected=0;
        //$scope.loadEtapaEvaluacion();
        if($scope.facultadSelected>0){
            EscuelaService.get({'filter[facultad_id]':$scope.facultadSelected},function(data){
                $scope.escuelas=data.data;

                $scope.loadDocentes();
            });
        }else{
            $scope.escuelas=[];
            $scope.loadDocentes();
        }

    }

    $scope.loadDocentes=function(){
        //$scope.docenteSelected=0;
        $log.info($scope.escuelaSelected)
        if($scope.escuelaSelected!=0){


            $http({
                url: './reports/docentessemestre',
                method: "GET",
                params:{
                    facultad_id:$scope.facultadSelected,
                    escuela_id:$scope.escuelaSelected,
                    semestre_id:$scope.semestreSelected
                }
            }).success(function (data) {
                $scope.docentes=data;
                $scope.loadCursos();
            });
        }else{
            $scope.docentes=[];
        }


    };
    $scope.loadCursos=function(){
        $scope.cursoSelected=0;
        if($scope.docenteSelected>0){
            var params={
                'filter[docente_id]':$scope.docenteSelected,
                'filter[semestre_id]':$scope.semestreSelected
            };
            CursoAsignadoService.get(params,function(data){
                $scope.cursos=data.data;
                if(data.total>0){
                    $scope.cursoSelected=data.data[0].id;
                    //$scope.loadEtapaEvaluacion(data.data[0].curso.escuela.facultad_id);
                }

            });
        }else{
            $scope.cursos=[];
        }

    };
    $scope.loadCriterios=function(data){
        var myData=data;
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            filter:{

            },
            sorting: {
                name: 'asc'     // initial sorting
            }
        }, {
            total: 1,           // length of data
            counts:[],
            getData: function($defer, params) {
                var datapaginate = angular.copy(myData);

                $defer.resolve(myData);
            }
        });
    };
    $scope.chartTypes = [
        {"id": "line", "title": "Line"},
        {"id": "spline", "title": "Smooth line"},
        {"id": "area", "title": "Area"},
        {"id": "areaspline", "title": "Smooth area"},
        {"id": "column", "title": "Column"},
        {"id": "bar", "title": "Bar"},
        {"id": "pie", "title": "Pie"},
        {"id": "scatter", "title": "Scatter"}
    ];
    $scope.list=function(){
        $scope.showLoading=true;
        $scope.showmessage=false;

        EtapaEvaluacionService.get({
            'filter[semestre_id]':$scope.semestreSelected,
            'filter[facultad_id]':$scope.facultadSelected,
            'filter[fromquestion]':'Alumno'

        },function(data){
            if(data.total>0){
                $scope.plantillaSelected=data.data[0].plantilla_id;
                $log.info("PLANTiLLA:"+$scope.plantillaSelected);
                if($scope.semestreSelected!=-1){
                    if($scope.plantillaSelected!=-1){

                        var params={
                            "plantilla_id":$scope.plantillaSelected,
                            "semestre_id":$scope.semestreSelected,
                            "facultad_id":$scope.facultadSelected,
                            "escuela_id":$scope.escuelaSelected,
                            "docente_id":$scope.docenteSelected,
                            "cursoasignado_id":$scope.cursoSelected
                        //{plantilla_id: 1, semestre_id: "0", facultad_id: "0", escuela_id: "0", docente_id: "0"}
                        };
                        $http({
                            url: './reports/evaluacionjefedepartamento',
                            method: "GET",
                            params:params
                        }).success(function (data) {

                            console.log(params);
                            $scope.datatable=data;

                            var plaza=[];
                            var puntaje={name:'Puntaje Obtenido','data':[],color:'#2f7ed8',dataLabels: { enabled: true}};


                            $.each(data,function(index,element){

                                //cargamos el array con los 5 valores
                                var valores = [];
                                valores.push(this.cinco);
                                valores.push(this.cuatro);
                                valores.push(this.tres);
                                valores.push(this.dos);
                                valores.push(this.uno);

                                //utilizamos la funcion especial de math para hallar el valor maximo del array
                                var max=Math.max.apply(null, valores);

                                puntaje.data.push(parseInt(max));
                                plaza.push(this.docente_id + 'CS');

                            });
                            //$scope.chartSeries=[Siempre,Frecuente,Poco,Nunca];
                            $scope.chartConfig.series=[puntaje];
                            $scope.chartConfig.xAxis.categories=plaza;

                            $scope.showLoading=false;
                            $scope.showTable=true;
                        });


                    }else{

                        $scope.showmessage=true;
                        $scope.showLoading=false;
                    }
                }
            }

        })

    };

});


app.controller("GraphicAutoEvaluacionCriterioController",function($log,EtapaEvaluacionService,CursoAsignadoService,SemestreService,FacultadService,EscuelaService,DocenteService,$scope,$timeout,$routeParams,$http,$resource,ngTableParams){
    $scope.facultadSelected=0;
    $scope.escuelaSelected=0;
    $scope.criterioSelected=81;
    $scope.semestreSelected=-1;
    $scope.plantillaSelected=-1;
    $scope.showmessage=false;
    $scope.showLoading=false;
    $scope.chartSeries=[];
    $scope.categories=[];
    $scope.showTable=false;
    $scope.criterioactivo= "PLANIFICACION Y PREPARACION DE CLASES";

    $scope.p = function(p)
    {
        for(i=0;i<$scope.varcri.length;i++) {
            if ($scope.varcri[i].id == $scope.criterioSelected) {
                $scope.criterioactivo = $scope.varcri[i].name;
            }
        }
    }

    FacultadService.get({},function(data){
        $scope.facultades=data.data;
        if(data.total>0)
            $scope.facultadSelected=data.data[0].id;
        $scope.loadEscuelas();
    });

    SemestreService.get({},function(data){
        $scope.semestres=data.data;
        if(data.total>0){
            $scope.semestreSelected=data.data[0].id;

        }
    });
    $scope.loadComboCriterios=function(){
        $http({
            url: './reports/criterios',
            method: "GET"
        }).success(function (data) {
            $scope.criterios=data;
            $scope.varcri=data;
        });


    };
    $scope.loadComboCriterios();
    $scope.loadEscuelas=function(){
        $scope.escuelaSelected=0;
        //$scope.loadEtapaEvaluacion();
        if($scope.facultadSelected>0){
            EscuelaService.get({'filter[facultad_id]':$scope.facultadSelected},function(data){
                $scope.escuelas=data.data;

            });
        }else{
            $scope.escuelas=[];

        }

    }


    $scope.chartTypes = [
        {"id": "line", "title": "Line"},
        {"id": "spline", "title": "Smooth line"},
        {"id": "area", "title": "Area"},
        {"id": "areaspline", "title": "Smooth area"},
        {"id": "column", "title": "Column"},
        {"id": "bar", "title": "Bar"},
        {"id": "pie", "title": "Pie"},
        {"id": "scatter", "title": "Scatter"}
    ];


    $scope.list=function(){

        $scope.showLoading=true;
        $scope.showmessage=false;

        $scope.chartConfig = {

            "options": {
                "chart": {
                    "type": "areaspline"
                },
                "plotOptions": {
                    "series": {
                        "stacking": ""
                    }
                }
            },
            credits: {
                enabled: false
            },
            "series": [

            ],
            "title": {
                "text": "Autoevaluacion Docente:"
            },
            subtitle: {
                text: 'Variable : ' + $scope.criterioactivo
            },
            xAxis: {
                categories: [

                ]
            },
            yAxis: {
                min: 0,
                max: 200,
                title: {
                    text: 'Apreciaciones'
                }
            },
            "loading": false,
            "size": {}
        };

        EtapaEvaluacionService.get({
            'filter[semestre_id]':$scope.semestreSelected,
            'filter[facultad_id]':$scope.facultadSelected,
            'filter[fromquestion]':'Docente'

        },function(data){
            if(data.total>0){
                $scope.plantillaSelected=data.data[0].plantilla_id;
                $log.info("PLANTiLLA:"+$scope.plantillaSelected);
                if($scope.semestreSelected!=-1){
                    if($scope.plantillaSelected!=-1){

                        var params={
                            "semestre_id":$scope.semestreSelected,
                            "facultad_id":$scope.facultadSelected,
                            "escuela_id":$scope.escuelaSelected,
                            "criterio_id":$scope.criterioSelected
                        };

                        $http({
                            url: './reports/resumencriteriosautodetalle',
                            method: "GET",
                            params:params
                        }).success(function (data) {
                            $scope.datatable=data;

                            var Si={"name":'Si',"data":[],"type": "column", "id": "series-2", "color": "GREEN",dataLabels: { enabled: true}};
                            var No={name:'No',"data":[],"type": "column", "id": "series-3", "color": "DARK",dataLabels: { enabled: true}};

                            $scope.categories=[];
                            $scope.cat=[];
                            $scope.totales={Si:0,No:0};
                            $.each(data,function(index,element){

                                Si.data.push(parseFloat(this.S));
                                No.data.push(parseFloat(this.N));

                                $scope.categories.push(this.name);
                                $scope.cat.push(index);
                            });

                            $scope.chartConfig.series=[Si,No];
                            $scope.chartConfig.xAxis.categories=$scope.categories;

                            $scope.showLoading=false;
                            $scope.showTable=true;
                        });


                    }else{
                        $scope.message="No se encontro el listado de criterios o no  existe una etapa de autoevaluación para la facultad y el semestre seleccionado";
                        $scope.showmessage=true;
                        $scope.showLoading=false;
                        $scope.showTable=false;
                    }
                }
            }

        })

    };

});


app.controller("CargaHorariaAsignadaController",function($rootScope,$log,CargaNoLectivaService,CursoAsignadoService,SemestreService,FacultadService,EscuelaService,DocenteService,$scope,$timeout,$routeParams,$http,$resource,ngTableParams){
    $scope.facultad_id=-1;
    $scope.escuela_id=-1;
    $scope.docente_id=-1;
    $scope.semestre_id=-1;
    $scope.showmessage=false;
    $scope.showLoading=false;

    var getById=function(json,id){
        var obj;
        $.each(json,function(index,element){
            if(this.id==id)
                obj=this;
        });
        return obj;
    }
    $scope.loadingData=true;

    FacultadService.get({},function(data){
                $scope.facultades=data.data;
                if(data.total>0){
                    $scope.facultad_id=data.data[0].id;
                    $scope.loadingData=false;
                    $scope.facultad=data.data[0];
                }
               $scope.loadEscuelas();
    });

    SemestreService.get({},function(data){
        $scope.semestres=data.data;
        if(data.total>0){
            $scope.semestre_id=data.data[0].id;
            $scope.semstre=data.data[0];
        }
    });
    $scope.loadEscuelas=function(){
        $scope.facultad=getById($scope.facultades,$scope.facultad_id);
         $scope.loadingData=true;
        EscuelaService.get({'filter[facultad_id]':$scope.facultad_id},function(data){
               $scope.escuelas=data.data;
               if(data.total>0){
                    $scope.escuela_id=data.data[0].id;
                    $scope.loadingData=false;
                    $scope.escuela=data.data[0];

                }

               $scope.loadDocentes();
        });
    }

    $scope.loadDocentes=function(){
        $scope.escuela=getById($scope.escuelas,$scope.escuela_id);
        $scope.loadingData=true;
        DocenteService.get({'filter[escuela_id]':$scope.escuela_id},function(data){
            $scope.docentes=data.data;
            if(data.total>0){
                $scope.docente_id=data.data[0].id;
                $scope.loadingData=false;
                $scope.docente=data.data[0];
            }
            $scope.loadCursos();
        });
    };
    $scope.filter=function(){
        $scope.semestre=getById($scope.semestres,$scope.semestre_id);
        $scope.loadCursos();
        $scope.loadCargaNoLectiva();

    };
    $scope.loadCursos=function(){
        $scope.docente=getById($scope.docentes,$scope.docente_id);
        var params={
            'filter[docente_id]':$scope.docente_id,
            'filter[semestre_id]':$scope.semestre_id
        };
        CursoAsignadoService.get(params,function(data){
            $scope.cursos=data.data;
            var total_hora_lectiva=0;
            $.each($scope.cursos,function(){
                total_hora_lectiva+=parseInt(this.number_hours_theory)+parseInt(this.number_hours_practices)+parseInt(this.number_hours_laboratory);
            });
            $scope.totalCargaLectiva=total_hora_lectiva;
        });
    };
    $scope.loadCargaNoLectiva=function(){
        var params={
            'filter[docente_id]':$scope.docente_id,
            'filter[semestre_id]':$scope.semestre_id
        };
        CargaNoLectivaService.get(params,function(data){
            $scope.cargasnolectivas=data.data;
            var total=0;
            $.each($scope.cargasnolectivas,function(){
                total+=parseInt(this.numberhours);
            });
            $scope.totalCargaNoLectiva=total;
        });
    };

    $scope.ExportToExcel=function(){
        $("#data_download").val($("#reportTable").html());
        $("#myform").submit();
    }


    $scope.logo=$rootScope.pathBase+'/images/logo.png';
});

app.controller("AvanceCurricularController",function(CargaLectivaService,$log,$rootScope,EtapaEvaluacionService,CursoAsignadoService,SemestreService,FacultadService,EscuelaService,DocenteService,$scope,$timeout,$routeParams,$http,$resource,ngTableParams){
    $scope.facultadSelected=-1;
    $scope.escuelaSelected=-1;
    $scope.docenteSelected=-1;
    $scope.cursoSelected=-1;
    $scope.semestreSelected=-1;
    $scope.showmessage=false;
    $scope.showLoading=false;
    var getById=function(json,id){
        var obj;
        $.each(json,function(index,element){
            if(this.id==id)
                obj=this;
        });
        return obj;
    }
    $scope.loadingData=true;
    FacultadService.get({},function(data){
               $scope.facultades=data.data;
               if(data.total>0)
               $scope.facultadSelected=data.data[0].id;
               $scope.loadingData=false;
               $scope.loadEscuelas();
    });

    SemestreService.get({},function(data){
        $scope.semestres=data.data;
        if(data.total>0)
            $scope.semestreSelected=data.data[0].id;
    });
    $scope.loadEscuelas=function(){
        $scope.escuelaSelected=-1;
        $scope.loadingData=true;
        EscuelaService.get({'filter[facultad_id]':$scope.facultadSelected},function(data){
               $scope.escuelas=data.data;
               if(data.total>0)
                $scope.escuelaSelected=data.data[0].id;
              $scope.loadingData=false;
               $scope.loadDocentes();
        });
    }
    $scope.loadEtapaEvaluacion=function(facultad_id){
        $scope.plantillaSelected=-1;
        EtapaEvaluacionService.get({
            'filter[semestre_id]':$scope.semestreSelected,
            'filter[facultad_id]':facultad_id,
            'filter[fromquestion]':'Docente'
        },function(data){
            if(data.total>0){
                $scope.plantillaSelected=data.data[0].plantilla_id;
                 $log.info($scope.plantillaSelected);
            }

        })
    }
    $scope.loadDocentes=function(){
        $scope.docenteSelected=-1;
        $scope.loadingData=true;
        DocenteService.get({'filter[escuela_id]':$scope.escuelaSelected},function(data){
            $scope.docentes=data.data;
            if(data.total>0){
                //$scope.docenteSelected=data.data[0].id;
                $scope.loadingData=false;
                $scope.loadCursos();
            }
        });
    };
    /*$scope.loadCursos=function(){
        $scope.docente=getById($scope.docentes,$scope.docenteSelected);
        $log.info($scope.docente);
        $scope.cursoSelected=-1;
        var params={
            'filter[docente_id]':$scope.docenteSelected,
            'filter[semestre_id]':$scope.semestreSelected
        };
        CursoAsignadoService.get(params,function(data){
            $scope.cursos=data.data;
            if(data.total>0){
                //$scope.cursoSelected=data.data[0].id;
                $scope.loadEtapaEvaluacion(data.data[0].curso.escuela.facultad_id);
            }
            $scope.changeCurso();
        });
    };*/
    $scope.changeCurso=function(){
        $.each($scope.cursos,function(){
            if(this.id==$scope.cursoSelected)
                $scope.cursoasignado=this;
        })
        console.log($scope.cursoasignado)
    }
    $scope.list=function(){
        $scope.showLoading=true;
        $scope.showmessage=false;
        if($scope.plantillaSelected!=-1){
            if($scope.cursoSelected!=-1){
                var params={
                    "filter[plantilla_id]":$scope.plantillaSelected,
                    "filter[cursoasignado_id]":$scope.cursoSelected

                };
                $scope.tableParams = new ngTableParams(
                {
                    page: 1,            // show first page
                    count: 10,          // count per page
                    r:Math.random(),
                    filter:
                    {
                        cursoasignado_id:$scope.cursoSelected
                    },
                    sorting:
                    {
                        name: 'asc'     // initial sorting
                    }
                },
                {
                    groupBy: 'week',
                    total: 1,           // length of data
                    counts:[],
                    getData: function($defer, params) {
                        CargaLectivaService.get(params.url(),function(data){
                            $scope.totalHoras=0;
                            $timeout(function() {
                                $.each(data.data,function(){
                                    $scope.totalHoras+=parseInt(this.numberhours);
                                });
                                console.log(data);
                                if(data.total==0){
                                        data.data={};
                                }
                                // update table params
                                params.total(data.total);
                                // set new data
                                $defer.resolve(data.data);
                            }, 500);
                         })
                    }
                });
            }else{
                $scope.message="No se ha seleccionado el curso o docente evaluado.";
                $scope.showmessage=true;
                $scope.showLoading=false;
            }
        }else{
            $scope.message="No se enontro el listado de criterios o no  existe una etapa de evaluación para la facultad y el semestre seleccionado";
            $scope.showmessage=true;
             $scope.showLoading=false;
        }

    };
    $scope.show=function(item){
        if(item.visible){
            item.visible=false;
            item.icon="glyphicon glyphicon-plus";
        }
        else{
            item.visible=true;
            item.icon="glyphicon glyphicon-minus";
        }
        return false;
    }
    $scope.ExportToExcel=function(){
        $("#data_download").val($("#reportTable").html());
        $("#myform").submit();
    }


    $scope.logo=$rootScope.pathBase+'/images/logo.png';

    $scope.promedio=function(list){
        var total=0;
        var promedio=0;
        var count=0;
        $.each(list,function(){
            total+=parseInt(this.tipovaloracion.value);
            count++;
        })
        return Math.round(total/count * 10) / 10
    };
});

app.controller("AvanceCurricularJdController",function(CargaLectivaService,$log,$rootScope,EtapaEvaluacionService,CursoAsignadoService,SemestreService,FacultadService,EscuelaService,DocenteService,$scope,$timeout,$routeParams,$http,$resource,ngTableParams){
    $scope.facultadSelected=-1;
    $scope.escuelaSelected=-1;
    $scope.docenteSelected=-1;
    $scope.cursoSelected=-1;
    $scope.semestreSelected=-1;
    $scope.showmessage=false;
    $scope.showLoading=false;
    var getById=function(json,id){
        var obj;
        $.each(json,function(index,element){
            if(this.id==id)
                obj=this;
        });
        return obj;
    }
    $scope.loadingData=true;
    $http({url: './admin/type',method: "GET"}).success(function (data) {
            $scope.faculta_id=data.entity.escuela.facultad_id;
            $scope.escuela=data.entity.escuela.name;
            FacultadService.get({facultad_id:$scope.faculta_id},function(data){
                $scope.facultades=data.data;
                //$scope.others.facultades=data.data;
                if(data.total>0)
                    $scope.facultadSelected=data.data[0].id;
                $scope.loadingData=false;
                $scope.loadEscuelas();
            });
    });

    SemestreService.get({},function(data){
        $scope.semestres=data.data;
        if(data.total>0)
            $scope.semestreSelected=data.data[0].id;
    });
    $scope.loadEscuelas=function(){
        $scope.escuelaSelected=-1;
        $scope.loadingData=true;
        EscuelaService.get({'filter[facultad_id]':$scope.facultadSelected,'filter[name]':$scope.escuela},function(data){
               $scope.escuelas=data.data;
               if(data.total>0)
                $scope.escuelaSelected=data.data[0].id;
              $scope.loadingData=false;
               $scope.loadDocentes();
        });
    }
    $scope.loadEtapaEvaluacion=function(facultad_id){
        $scope.plantillaSelected=-1;
        EtapaEvaluacionService.get({
            'filter[semestre_id]':$scope.semestreSelected,
            'filter[facultad_id]':facultad_id,
            'filter[fromquestion]':'Docente'
        },function(data){
            if(data.total>0){
                $scope.plantillaSelected=data.data[0].plantilla_id;
                 $log.info($scope.plantillaSelected);
            }

        })
    }
    $scope.loadDocentes=function(){
        $scope.docenteSelected=-1;
        $scope.loadingData=true;
        DocenteService.get({'filter[escuela_id]':$scope.escuelaSelected},function(data){
            $scope.docentes=data.data;
            if(data.total>0){
                //$scope.docenteSelected=data.data[0].id;
                $scope.loadingData=false;
                $scope.loadCursos();
            }
        });
    };
    $scope.loadCursos=function(){
        $scope.docente=getById($scope.docentes,$scope.docenteSelected);
        $log.info($scope.docente);
        $scope.cursoSelected=-1;
        var params={
            'filter[docente_id]':$scope.docenteSelected,
            'filter[semestre_id]':$scope.semestreSelected
        };
        CursoAsignadoService.get(params,function(data){
            $scope.cursos=data.data;
            if(data.total>0){
                //$scope.cursoSelected=data.data[0].id;
                $scope.loadEtapaEvaluacion(data.data[0].curso.escuela.facultad_id);
            }
            $scope.changeCurso();
        });
    };
    $scope.changeCurso=function(){
        $.each($scope.cursos,function(){
            if(this.id==$scope.cursoSelected)
                $scope.cursoasignado=this;
        })
        console.log($scope.cursoasignado)
    }
    $scope.list=function(){
        $scope.showLoading=true;
        $scope.showmessage=false;
        if($scope.plantillaSelected!=-1){
            if($scope.cursoSelected!=-1){
                var params={
                    "filter[plantilla_id]":$scope.plantillaSelected,
                    "filter[cursoasignado_id]":$scope.cursoSelected

                };
                $scope.tableParams = new ngTableParams(
                {
                    page: 1,            // show first page
                    count: 10,          // count per page
                    r:Math.random(),
                    filter:
                    {
                        cursoasignado_id:$scope.cursoSelected
                    },
                    sorting:
                    {
                        name: 'asc'     // initial sorting
                    }
                },
                {
                    groupBy: 'week',
                    total: 1,           // length of data
                    counts:[],
                    getData: function($defer, params) {
                        CargaLectivaService.get(params.url(),function(data){
                            $scope.totalHoras=0;
                            $timeout(function() {
                                $.each(data.data,function(){
                                    $scope.totalHoras+=parseInt(this.numberhours);
                                });
                                console.log(data);
                                if(data.total==0){
                                        data.data={};
                                }
                                // update table params
                                params.total(data.total);
                                // set new data
                                $defer.resolve(data.data);
                            }, 500);
                         })
                    }
                });
            }else{
                $scope.message="No se ha seleccionado el curso o docente evaluado.";
                $scope.showmessage=true;
                $scope.showLoading=false;
            }
        }else{
            $scope.message="No se enontro el listado de criterios o no  existe una etapa de evaluación para la facultad y el semestre seleccionado";
            $scope.showmessage=true;
             $scope.showLoading=false;
        }

    };
    $scope.show=function(item){
        if(item.visible){
            item.visible=false;
            item.icon="glyphicon glyphicon-plus";
        }
        else{
            item.visible=true;
            item.icon="glyphicon glyphicon-minus";
        }
        return false;
    }
    $scope.ExportToExcel=function(){
        $("#data_download").val($("#reportTable").html());
        $("#myform").submit();
    }


    $scope.logo=$rootScope.pathBase+'/images/logo.png';

    $scope.promedio=function(list){
        var total=0;
        var promedio=0;
        var count=0;
        $.each(list,function(){
            total+=parseInt(this.tipovaloracion.value);
            count++;
        })
        return Math.round(total/count * 10) / 10

    };
});

app.controller("CargaHorariaAsignadaJdController",function($rootScope,$log,CargaNoLectivaService,CursoAsignadoService,SemestreService,FacultadService,EscuelaService,DocenteService,$scope,$timeout,$routeParams,$http,$resource,ngTableParams){
    $scope.facultad_id=-1;
    $scope.escuela_id=-1;
    $scope.docente_id=-1;
    $scope.semestre_id=-1;
    $scope.showmessage=false;
    $scope.showLoading=false;

    var getById=function(json,id){
        var obj;
        $.each(json,function(index,element){
            if(this.id==id)
                obj=this;
        });
        return obj;
    }
    $scope.loadingData=true;

    $http({url: './admin/type',method: "GET"}).success(function (data) {
            $scope.facultad_id=data.entity.escuela.facultad_id;
            $scope.escuela=data.entity.escuela.name;
            FacultadService.get({facultad_id:$scope.facultad_id},function(data){
                $scope.facultades=data.data;
                //$scope.others.facultades=data.data;
                if(data.total>0)
                    $scope.facultadSelected=data.data[0].id;
                $scope.loadingData=false;
                $scope.loadEscuelas();
            });
    });

    SemestreService.get({},function(data){
        $scope.semestres=data.data;
        if(data.total>0){
            $scope.semestre_id=data.data[0].id;
            $scope.semstre=data.data[0];
        }
    });
    $scope.loadEscuelas=function(){
        $scope.facultad=getById($scope.facultades,$scope.facultad_id);
         $scope.loadingData=true;
        EscuelaService.get({'filter[facultad_id]':$scope.facultad_id,'filter[name]':$scope.escuela},function(data){
               $scope.escuelas=data.data;
               if(data.total>0){
                    $scope.escuela_id=data.data[0].id;
                    $scope.loadingData=false;
                    $scope.escuela=data.data[0];

                }

               $scope.loadDocentes();
        });
    }

    $scope.loadDocentes=function(){
        $scope.escuela=getById($scope.escuelas,$scope.escuela_id);
        $scope.loadingData=true;
        DocenteService.get({'filter[escuela_id]':$scope.escuela_id},function(data){
            $scope.docentes=data.data;
            if(data.total>0){
                $scope.docente_id=data.data[0].id;
                $scope.loadingData=false;
                $scope.docente=data.data[0];
            }
            $scope.loadCursos();
        });
    };
    $scope.filter=function(){
        $scope.semestre=getById($scope.semestres,$scope.semestre_id);
        $scope.loadCursos();
        $scope.loadCargaNoLectiva();

    };
    $scope.loadCursos=function(){
        $scope.docente=getById($scope.docentes,$scope.docente_id);
        var params={
            'filter[docente_id]':$scope.docente_id,
            'filter[semestre_id]':$scope.semestre_id
        };
        CursoAsignadoService.get(params,function(data){
            $scope.cursos=data.data;
            var total_hora_lectiva=0;
            $.each($scope.cursos,function(){
                total_hora_lectiva+=parseInt(this.number_hours_theory)+parseInt(this.number_hours_practices)+parseInt(this.number_hours_laboratory);
            });
            $scope.totalCargaLectiva=total_hora_lectiva;
        });
    };
    $scope.loadCargaNoLectiva=function(){
        var params={
            'filter[docente_id]':$scope.docente_id,
            'filter[semestre_id]':$scope.semestre_id
        };
        CargaNoLectivaService.get(params,function(data){
            $scope.cargasnolectivas=data.data;
            var total=0;
            $.each($scope.cargasnolectivas,function(){
                total+=parseInt(this.numberhours);
            });
            $scope.totalCargaNoLectiva=total;
        });
    };

    $scope.ExportToExcel=function(){
        $("#data_download").val($("#reportTable").html());
        $("#myform").submit();
    }


    $scope.logo=$rootScope.pathBase+'/images/logo.png';
});






app.controller("EvaluacionPromedioAlDocDimController",function($log,CriterioEvaluacionService, EtapaEvaluacionService,CursoAsignadoService,SemestreService,FacultadService,EscuelaService,DocenteService,$scope,$timeout,$routeParams,$http,$resource,ngTableParams){
    $scope.facultadSelected=0;
    $scope.escuelaSelected=0;
    $scope.docenteSelected=0;
    $scope.cursoSelected=0;
    $scope.semestreSelected=-1;
    $scope.plantillaSelected=-1;
    $scope.showmessage=false;
    $scope.showLoading=false;
    $scope.chartSeries=[];
    $scope.categories=[];
    $scope.showTable=false;

    $scope.chartConfig = {
        "options": {
            "chart": {
                "type": "column"
            },

        },
        title: {
            text: 'INDICADORES DE EVALUACION PROMEDIO DE LOS ALUMNOS A LOS DOCENTES POR DIMENSION DE LA ESCUELA'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            title: {text: 'COD PLAZA'},
            categories: [

            ]
        },
        credits:{
            enabled:false
        },
        yAxis: {
            min: 0,
            max: 30,
            title: {
                text: 'PUNTAJE OBTENIDO'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: []

    };

		$scope.criteriosevaluacion = [];
		$scope.criteriosevaluacionpadres = [];
		CriterioEvaluacionService.get({
			'filter[plantilla_id]': 1
		},function(data){
			angular.forEach(data.data, function(item){
				$scope.criteriosevaluacionpadres.push(item);
				angular.forEach(item.children, function(item2){
					$scope.criteriosevaluacion.push(item2);
				});
			});
			//$scope.criteriosevaluacion=data.data;
		});

    FacultadService.get({},function(data){
        $scope.facultades=data.data;
        if(data.total>0)
            $scope.facultadSelected=data.data[0].id;
        $scope.loadEscuelas();
    });

    SemestreService.get({},function(data){
        $scope.semestres=data.data;
        if(data.total>0){
            $scope.semestreSelected=data.data[0].id;

        }
    });
    $scope.loadEscuelas=function(){
        $scope.escuelaSelected=0;
        //$scope.loadEtapaEvaluacion();
        if($scope.facultadSelected>0){
            EscuelaService.get({'filter[facultad_id]':$scope.facultadSelected},function(data){
                $scope.escuelas=data.data;

                $scope.loadDocentes();
            });
        }else{
            $scope.escuelas=[];
            $scope.loadDocentes();
        }

    }

    $scope.loadDocentes=function(){
        //$scope.docenteSelected=0;
        $log.info($scope.escuelaSelected)
        if($scope.escuelaSelected!=0){


            $http({
                url: './reports/docentessemestre',
                method: "GET",
                params:{
                    facultad_id:$scope.facultadSelected,
                    escuela_id:$scope.escuelaSelected,
                    semestre_id:$scope.semestreSelected
                }
            }).success(function (data) {
                $scope.docentes=data;
                $scope.loadCursos();
            });
        }else{
            $scope.docentes=[];
        }


    };
    $scope.loadCursos=function(){
        $scope.cursoSelected=0;
        if($scope.docenteSelected>0){
            var params={
                'filter[docente_id]':$scope.docenteSelected,
                'filter[semestre_id]':$scope.semestreSelected
            };
            CursoAsignadoService.get(params,function(data){
                $scope.cursos=data.data;
                if(data.total>0){
                    $scope.cursoSelected=data.data[0].id;
                    //$scope.loadEtapaEvaluacion(data.data[0].curso.escuela.facultad_id);
                }

            });
        }else{
            $scope.cursos=[];
        }

    };
    $scope.loadCriterios=function(data){
        var myData=data;
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            filter:{

            },
            sorting: {
                name: 'asc'     // initial sorting
            }
        }, {
            total: 1,           // length of data
            counts:[],
            getData: function($defer, params) {
                var datapaginate = angular.copy(myData);

                $defer.resolve(myData);
            }
        });
    };
    $scope.chartTypes = [
        {"id": "line", "title": "Line"},
        {"id": "spline", "title": "Smooth line"},
        {"id": "area", "title": "Area"},
        {"id": "areaspline", "title": "Smooth area"},
        {"id": "column", "title": "Column"},
        {"id": "bar", "title": "Bar"},
        {"id": "pie", "title": "Pie"},
        {"id": "scatter", "title": "Scatter"}
    ];
    $scope.list=function(){
        $scope.showLoading=true;
        $scope.showmessage=false;

        EtapaEvaluacionService.get({
            'filter[semestre_id]':$scope.semestreSelected,
            'filter[facultad_id]':$scope.facultadSelected,
            'filter[fromquestion]':'Alumno'

        },function(data){
            if(data.total>0){
                $scope.plantillaSelected=data.data[0].plantilla_id;
                $log.info("PLANTiLLA:"+$scope.plantillaSelected);
                if($scope.semestreSelected!=-1){
                    if($scope.plantillaSelected!=-1){

                        var params={
                            "plantilla_id":$scope.plantillaSelected,
                            "semestre_id":$scope.semestreSelected,
                            "facultad_id":$scope.facultadSelected,
                            "escuela_id":$scope.escuelaSelected,
                            "docente_id":$scope.docenteSelected,
                            "cursoasignado_id":$scope.cursoSelected
                        //{plantilla_id: 1, semestre_id: "0", facultad_id: "0", escuela_id: "0", docente_id: "0"}
                        };
                        $http({
                            url: './reports/evaluacionjefedepartamento',
                            method: "GET",
                            params:params
                        }).success(function (data) {

                            console.log(params);
                            $scope.datatable=data;

                            var plaza=[];
                            var puntaje={name:'Puntaje Obtenido','data':[],color:'#2f7ed8',dataLabels: { enabled: true}};


                            $.each(data,function(index,element){

                                //cargamos el array con los 5 valores
                                var valores = [];
                                valores.push(this.cinco);
                                valores.push(this.cuatro);
                                valores.push(this.tres);
                                valores.push(this.dos);
                                valores.push(this.uno);

                                //utilizamos la funcion especial de math para hallar el valor maximo del array
                                var max=Math.max.apply(null, valores);

                                puntaje.data.push(parseInt(max));
                                plaza.push(this.docente_id + 'CS');

                            });
                            //$scope.chartSeries=[Siempre,Frecuente,Poco,Nunca];
                            $scope.chartConfig.series=[puntaje];
                            $scope.chartConfig.xAxis.categories=plaza;

                            $scope.showLoading=false;
                            $scope.showTable=true;
                        });


                    }else{

                        $scope.showmessage=true;
                        $scope.showLoading=false;
                    }
                }
            }

        })

    };

});
