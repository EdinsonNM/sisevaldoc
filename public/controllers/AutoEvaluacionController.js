app.controller("AutoEvaluacionController", function AutoEvaluacionController(ValoracionAutoevaluacionService,EtapaEvaluacionService,EscuelaService,AutoEvaluacionService,CursoAsignadoService,TipoValoracionService, PlantillaCriteriosService,CriterioEvaluacionService,$routeParams,$scope,$timeout,$http,$route,$location, $resource,ngTableParams){
    $scope.url=$location.path();
    $scope.showMsg=false;
    $scope.showEvaluacion=false;
    $scope.showNoExisteEvaluacion=false;
    $scope.showNoExisteEtapaEvaluacion=false;
    $scope.showLoading=true;
    $scope.disabledEdition=false;
    $scope.finalizado=false;
    $scope.location = $location;
    $scope.others={
       grupos:[
            {'id':'1','name':'Grupo de Evaluación'},
            {'id':'0','name':'Criterio de Evaluación'}
        ]
    };
    $scope.existeautoevaluacion=false;

   $scope.entidad={};
   CursoAsignadoService.get({id:$routeParams.id},function(data){
        $scope.others.cursoasignado=data.data;
        //obtengo la escuela a la que pertence el curso asignado
        EscuelaService.get({id:$scope.others.cursoasignado.curso.escuela_id},function(data){
            $scope.others.escuela=data.data;
            //obtengo la etapa de evaluacion establecidad para la facultad
            EtapaEvaluacionService.get(
                {
                    'filter[semestre_id]':$scope.others.cursoasignado.semestre.id,
                    'filter[facultad_id]':$scope.others.escuela.facultad_id,
                    'filter[fromquestion]':'Docente'
                },
                function(data){
                    
                        if(data.total>0){
                            $scope.others.etapaevaluacion=data.data[0];
                            var result=$scope.ValidateEtapa($scope.others.etapaevaluacion);
                            if(result.success){
                                
                                //Obtengo la autoevaluacion de docente para el curso asignado
                                AutoEvaluacionService.get({cursoasignado_id:$routeParams.id},function(data){
                                    if(data.total>0){
                                        $scope.existeautoevaluacion=true;
                                        $scope.entidad=data.data[0];
                                        $scope.showEvaluacion=true;
                                        $scope.list();
                                        if($scope.entidad.finalizado=='1'){
                                            $scope.disabledEdition=true;
                                            $scope.finalizado=true;
                                        }
                                    }else{
                                         $scope.msg_title="No existe Autoevaluación";
                                         $scope.showNoExisteEvaluacion=true;
                                         $scope.showMsg=true;
                                         $scope.showEvaluacion=false;
                                         
                                    }
                                    $scope.showLoading=false;
                               });
                            }else{
                                console.log(result);
                                $scope.msg_title="Error Periodo de Evaluación";
                                $scope.messageOtherError=result.message;
                                $scope.showOtherError=true;
                                $scope.showMsg=true;
                                $scope.showEvaluacion=false;
                                $scope.showLoading=false;
                            }
                        }else{
                            $scope.msg_title=" No existe Etapa de Evaluación";
                            $scope.showNoExisteEtapaEvaluacion=true;
                            $scope.showMsg=true;
                            $scope.showEvaluacion=false;
                            $scope.showLoading=false;
                        }
                    
            });
        });
   });
   
   
   
   var ENTITYNAME='criterioevaluacion';
   
   $scope.ValidateEtapa=function(etapa){
    var result={},
        inicio=moment(etapa.date_init).tz("America/Lima").format('YYYY/MM/DD'),
        fin=moment(etapa.date_end).tz("America/Lima").format('YYYY/MM/DD'),
        myDate=moment().tz("America/Lima").format('YYYY/MM/DD');

        if(moment(myDate).isBefore(inicio))
        {
            console.log("etapa aun no inicia");
            result={
                message:"Etapa de Autoevaluación aun no ha iniciado",
                success:false
            };
        }else
        {
            if(moment(myDate).isAfter(fin))
            {
                console.log('etapa de evaluación ha culminado');
                result={
                    message:"Etapa de Autoevaluación ha culminado",
                    success:false
                };
            }else
            {
                console.log('etapa de evaluación vigente');
                result={
                    message:"Etapa de Autoevaluación se encuentra vigente",
                    success:true
                };
            }
        }
        return result;
   };

   $scope.createAutoevaluacion=function(){
        $scope.showLoading=true;
        if(!$scope.existeautoevaluacion){
            $scope.entidad={
                cursoasignado_id:$routeParams.id
            }
            AutoEvaluacionService.save($scope.entidad,function(data){
                $scope.entidad=data.entity;
                console.log($scope.entidad);
                noty({
                        text: 'Autoevaluacion registrada satisfactoriamente', 
                        type: 'success',
                        layout:'bottomRight',
                        timeout:5000,
                });
                $route.reload();
                $scope.showLoading=false;
            });
        }
   };

    $scope.CloseAutoevaluacion=function(){
       
        if($scope.existeautoevaluacion){
            var n=noty({
              text: 'Desea enviar la autoevaluación?',
              layout: 'center',
              theme: 'defaultTheme',
              modal:true,
              buttons: [
                {
                    addClass: 'btn btn-success', text: 'Si', onClick: function($noty) {
                        $noty.close();
                         $scope.showLoading=true;
                        $scope.entidad.finish=true;
                        AutoEvaluacionService.update($scope.entidad,function(data){
                            $scope.entidad=data.entity;
                            noty({
                                    text: 'Autoevaluacion registrada satisfactoriamente', 
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
        console.log(criterio);
        var valoracion={
            tipovaloracion_id: criterio.valoracion.id,
            autoevaluacion_id:$scope.entidad.id,
            criterioevaluacion_id:criterio.id

        };
        console.log(valoracion);
        ValoracionAutoevaluacionService.save(valoracion,function(data){
            noty({
                    text: 'valoracion actualizada satisfactoriamente', 
                    type: 'success',
                    layout:'bottomRight',
                    timeout:2000,
            });
            
        });
   };
   $scope.list=function(){
        PlantillaCriteriosService.get({id:$scope.others.etapaevaluacion.plantilla_id},function(data){
            TipoValoracionService.get({'filter[tipo]':data.data.tiporespuesta},function(data){ 
                $scope.others.tiposvaloracion=data.data;});
        });
        

        $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10000,          // count per page
         filter:{
            plantilla_id:$scope.others.etapaevaluacion.plantilla_id,
            curso_id:$scope.others.cursoasignado.curso.id,
            autoevaluacion_id:$scope.entidad.id
        },
        sorting: {
            name: 'asc'     // initial sorting
        }
        }, {
            total: 0,           // length of data
            counts: [],
            getData: function($defer, params) {
                // ajax request to api
                ValoracionAutoevaluacionService.get(params.url(),function(data){
                    $timeout(function() {
                        console.log(data);
                        // update table params
                        params.total(data.total);
                        // set new data
                        $.each(data.data, function(index, element){
                          $.each(this.children, function(index, element){
                            this.valoracion={id:0};
                            if(this.valoracionautoevaluacion.length>0)
                                this.valoracion.id=this.valoracionautoevaluacion[0].tipovaloracion_id||0;
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