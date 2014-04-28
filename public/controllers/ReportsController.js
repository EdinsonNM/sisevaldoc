app.controller("EvaluacionDocenteController",function($log,$rootScope,EtapaEvaluacionService,CursoAsignadoService,SemestreService,FacultadService,EscuelaService,DocenteService,$scope,$timeout,$routeParams,$http,$resource,ngTableParams){
	$scope.facultadSelected=-1;
    $scope.escuelaSelected=-1;
    $scope.docenteSelected=-1;
    $scope.cursoSelected=-1;
    $scope.semestreSelected=-1;
    $scope.showmessage=false;
    $scope.showLoading=false;

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
        $scope.escuelaSelected=-1;
        
        EscuelaService.get({'filter[facultad_id]':$scope.facultadSelected},function(data){
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
            'filter[facultad_id]':facultad_id
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
                $scope.docenteSelected=data.data[0].id;
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
                $scope.cursoSelected=data.data[0].id;
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
                    '</b> <br/><b style="color:'+this.point.series.color+'"">'+this.point.series.name+':</b>' +this.y +'';
            }
        },
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
            'filter[facultad_id]':$scope.facultadSelected
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
                                
                                var Siempre={name:'Siempre','data':[],color:'#2f7ed8'};
                                var Frecuente={name:'Frecuente','data':[],color:'#004072'};
                                var Poco={name:'Poco','data':[],color:'#8bbc21'};
                                var Nunca={name:'Nunca','data':[],color:'#981616'};
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
                        $scope.message="No se enontro el listado de criterios o no  existe una etapa de evaluación para la facultad y el semestre seleccionado";
                        $scope.showmessage=true;
                         $scope.showLoading=false;
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
    FacultadService.get({},function(data){
                $scope.facultades=data.data; 
                if(data.total>0){
                    $scope.facultad_id=data.data[0].id;
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
        EscuelaService.get({'filter[facultad_id]':$scope.facultad_id},function(data){
               $scope.escuelas=data.data; 
               if(data.total>0){
                    $scope.escuela_id=data.data[0].id;
                    $scope.escuela=data.data[0];
                }

               $scope.loadDocentes();
        });
    }

    $scope.loadDocentes=function(){
        $scope.escuela=getById($scope.escuelas,$scope.escuela_id);
        DocenteService.get({'filter[escuela_id]':$scope.escuela_id},function(data){
            $scope.docentes=data.data;
            if(data.total>0){
                $scope.docente_id=data.data[0].id;
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
        $scope.escuelaSelected=-1;
        
        EscuelaService.get({'filter[facultad_id]':$scope.facultadSelected},function(data){
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
            'filter[facultad_id]':facultad_id
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
                $scope.docenteSelected=data.data[0].id;
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
                $scope.cursoSelected=data.data[0].id;
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
