app.controller("EvaluacionController", function EvaluacionController(ValoracionEvaluacionService,EtapaEvaluacionService,EscuelaService,EvaluacionService,AlumnoCursoService,CursoAsignadoService,TipoValoracionService, PlantillaCriteriosService,CriterioEvaluacionService,$routeParams,$scope,$timeout,$http,$route,$location, $resource,ngTableParams){
    $scope.url=$location.path();
    $scope.showMsg=false;
    $scope.showEvaluacion=false;
    $scope.showNoExisteEvaluacion=false;
    $scope.showNoExisteEtapaEvaluacion=false;
    $scope.showLoading=true;
    $scope.disabledEdition=false;
    $scope.finalizado=false;
    $scope.others={};
    $scope.existeevaluacion=false;
    $scope.location = $location;
    //$scope.formInvalid=true;
   $scope.entidad={};

   AlumnoCursoService.get({id:$routeParams.id},function(data){
        $scope.others.inscripcion=data.data;
   
            EtapaEvaluacionService.get(
                {
                    'filter[semestre_id]':$scope.others.inscripcion.cursoasignado.semestre.id,
                    'filter[facultad_id]':$scope.others.inscripcion.cursoasignado.curso.escuela.facultad_id
                },
                function(data){
                    if(data.total>0){
                        $scope.others.etapaevaluacion=data.data[0];
                        //Obtengo la autoevaluacion de docente para el curso asignado
                        EvaluacionService.get({inscripcioncurso_id:$routeParams.id},function(data){
                            if(data.total>0){
                                $scope.existeevaluacion=true;
                                $scope.entidad=data.data[0];
                                $scope.showEvaluacion=true;
                                $scope.list();
                                if($scope.entidad.finalizado=='1'){
                                    $scope.disabledEdition=true;
                                    $scope.finalizado=true;
                                }
                            }else{
                                 $scope.msg_title="No existe Evaluación";
                                 $scope.showNoExisteEvaluacion=true;
                                 $scope.showMsg=true;
                                 $scope.showEvaluacion=false;
                                 
                            }
                            $scope.showLoading=false;
                       });
                    }else{
                        $scope.msg_title=" No existe Etapa de Evaluación";
                        $scope.showNoExisteEtapaEvaluacion=true;
                        $scope.showMsg=true;
                        $scope.showEvaluacion=false;
                        $scope.showLoading=false;
                    }
            });
   });
   
   
   TipoValoracionService.get({},function(data){ $scope.others.tiposvaloracion=data.data;});
   var ENTITYNAME='criterioevaluacion';

   $scope.createEvaluacion=function(){
        $scope.showLoading=true;
        if(!$scope.existeevaluacion){
            $scope.entidad={
                inscripcioncurso_id:$routeParams.id
            }
            EvaluacionService.save($scope.entidad,function(data){
                $scope.entidad=data.entity;
                console.log($scope.entidad);
                noty({
                        text: 'Evaluacion registrada satisfactoriamente', 
                        type: 'success',
                        layout:'bottomRight',
                        timeout:5000,
                });
                $route.reload();
                $scope.showLoading=false;
            });
        }
   };

    $scope.CloseEvaluacion=function(){
       
        if($scope.existeevaluacion){
            var n=noty({
              text: 'Desea enviar la Evaluación?',
              layout: 'center',
              theme: 'defaultTheme',
              modal:true,
              buttons: [
                {
                    addClass: 'btn btn-success', text: 'Si', onClick: function($noty) {
                        $noty.close();
                         $scope.showLoading=true;
                        $scope.entidad.finish=true;
                        EvaluacionService.update($scope.entidad,function(data){
                            $scope.entidad=data.entity;
                            noty({
                                    text: 'Evaluacion enviada satisfactoriamente', 
                                    type: 'success',
                                    layout:'bottomRight',
                                    timeout:5000,
                            });
                            $route.reload();
                            $scope.showLoading=false;
                        });
                    
                    }
                },
                {
                    addClass: 'btn btn-danger', text: 'No', onClick: function($noty) {
                    $noty.close();
                    
                    }
                }
              ]
            });
            
        }
   };

   $scope.validateForm=function(){
        $scope.formInvalid=false;
        var invalid=false;
        $.each($scope.dataCriterios, function(index, element){
            $.each(this.children, function(index, element){
                if(this.valoracion.id==0){
                    invalid=true;
                }
            });
        });
        $scope.formInvalid=invalid;
   };
   $scope.SaveValoracion=function(criterio){
        $scope.validateForm();
        //console.log(criterio);
        var valoracion={
            tipovaloracion_id: criterio.valoracion.id,
            evaluacion_id:$scope.entidad.id,
            criterioevaluacion_id:criterio.id

        };
        //console.log(valoracion);
        ValoracionEvaluacionService.save(valoracion,function(data){
            noty({
                    text: 'valoracion actualizada satisfactoriamente', 
                    type: 'success',
                    layout:'bottomRight',
                    timeout:5000,
            });
            
        });
   };
   $scope.list=function(){

        $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10000,          // count per page
         filter:{
            plantilla_id:$scope.others.etapaevaluacion.plantilla_id,
            evaluacion_id:$scope.entidad.id
        },
        sorting: {
            name: 'asc'     // initial sorting
        }
        }, {
            total: 0,           // length of data
            counts: [],
            getData: function($defer, params) {
                // ajax request to api
                ValoracionEvaluacionService.get(params.url(),function(data){
                    $timeout(function() {
                        console.log(data);
                        // update table params
                        params.total(data.total);
                        // set new data

                        $.each(data.data, function(index, element){
                          $.each(this.children, function(index, element){
                            this.valoracion={id:0};
                            if(this.valoracionevaluacion.length>0)
                                this.valoracion.id=this.valoracionevaluacion[0].tipovaloracion_id||0;
                          });
                        });
                        $scope.dataCriterios=data.data;
                        $scope.validateForm();
                        console.log(data.data)
                        $defer.resolve(data.data);
                    }, 500);
                });
            }
        });
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

    
    
});