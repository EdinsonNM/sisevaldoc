app.controller("EvaluacionJefeDptoController", function EvaluacionJefeDptoController(ValoracionEvaluacionJefeDptoService,EtapaEvaluacionService,EscuelaService,EvaluacionJefeDptoService,CursoAsignadoService,TipoValoracionService, PlantillaCriteriosService,CriterioEvaluacionService,$routeParams,$scope,$timeout,$http,$route,$location, $resource,ngTableParams){
    $scope.url=$location.path();
    $scope.showMsg=false;
    $scope.showEvaluacion=false;
    $scope.showNoExisteEvaluacion=false;
    $scope.showNoExisteEtapaEvaluacion=false;
    $scope.showLoading=true;
    $scope.disabledEdition=false;
    $scope.finalizado=false;
    $scope.location = $location;

    $scope.existeevaluacion=false;
    $scope.others={};
   $scope.entidad={};
   $http({url: './admin/type',method: "GET"}).success(function (data) {
            $scope.docente=data.entity;

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
                            'filter[fromquestion]':'JefeDepartamento'
                        },
                        function(data){
                            if(data.total>0){
                                $scope.others.etapaevaluacion=data.data[0];
                                //Obtengo la autoevaluacion de docente para el curso asignado
                                var result=$scope.ValidateEtapa($scope.others.etapaevaluacion);
                                if(result.success){
                                    EvaluacionJefeDptoService.get(
                                        {
                                            cursoasignado_id:$routeParams.id,
                                            docente_id:$scope.docente.id
                                        },
                                        function(data){
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
                message:"Etapa de Evaluación del Docente por parte del Jefe Departamento, aun no ha iniciado",
                success:false
            };
        }else
        {
            if(moment(myDate).isAfter(fin))
            {
                console.log('etapa de evaluación ha culminado');
                result={
                    message:"Etapa de Evaluación del Docente por parte del Jefe Departamento ha culminado",
                    success:false
                };
            }else
            {
                console.log('etapa de evaluación vigente');
                result={
                    message:"Etapa de Evaluación del Docente por parte del Jefe Departamento se encuentra vigente",
                    success:true
                };
            }
        }
        return result;
   };

   $scope.createEvaluacionJefe=function(){
        $scope.showLoading=true;
        if(!$scope.existeevaluacion){
            $scope.entidad={
                cursoasignado_id:$routeParams.id,
                docente_id:$scope.docente.id
            }
            EvaluacionJefeDptoService.save($scope.entidad,function(data){
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
                        EvaluacionJefeDptoService.update($scope.entidad,function(data){
                            $scope.entidad=data.entity;
                            noty({
                                    text: 'Evaluacion del Jefe de Departamento registrada satisfactoriamente', 
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
   $scope.SaveValoracion=function(criterio){
        console.log(criterio);
        $scope.validateForm();
        var valoracion={
            tipovaloracion_id: criterio.valoracion.id,
            evaluacionjefedpto_id:$scope.entidad.id,
            criterioevaluacion_id:criterio.id

        };
        console.log(valoracion);
        ValoracionEvaluacionJefeDptoService.save(valoracion,function(data){
            noty({
                    text: 'valoracion actualizada satisfactoriamente', 
                    type: 'success',
                    layout:'bottomRight',
                    timeout:5000,
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
            evaluacionjefedpto_id:$scope.entidad.id
        },
        sorting: {
            name: 'asc'     // initial sorting
        }
        }, {
            total: 0,           // length of data
            counts: [],
            getData: function($defer, params) {
                // ajax request to api
                ValoracionEvaluacionJefeDptoService.get(params.url(),function(data){
                    $timeout(function() {
                        console.log(data);
                        // update table params
                        
                        params.total(data.total);
                        $.each(data.data, function(index, element){
                          $.each(this.children, function(index, element){
                            this.valoracion={id:0};
                            if(this.valoracionevaluacionjefedpto.length>0)
                                this.valoracion.id=this.valoracionevaluacionjefedpto[0].tipovaloracion_id||0;
                          });
                        });

                        $scope.dataCriterios=data.data;
                        $scope.validateForm();
                        // set new data
                        $defer.resolve(data.data);
                    }, 500);
                });
            }
        });
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