app.controller("EtapaEvaluacionController", function EtapaEvaluacionController(PlantillaCriteriosService,FacultadService,SemestreService,$scope,$routeParams,$timeout,$http,$location,$resource,$route,ngTableParams){   
    
    $scope.others={};
    $scope.entidad={};
    var ENTITYNAME='etapaevaluacion'
    $scope.location = $location;
    FacultadService.get({id:$routeParams.id},function(data){ $scope.others.facultad=data.data;});
    SemestreService.get({},function(data){ $scope.others.semestres=data.data;});
    PlantillaCriteriosService.get({},function(data){ $scope.others.matricescriterios=data.data;});
    $scope.list=function(){
		var Api = $resource('./'+ENTITYNAME);
        $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        filter:{
            facultad_id:$routeParams.id
        },
        sorting: {
            name: 'asc'     // initial sorting
        }
        }, {
            total: 0,           // length of data
            getData: function($defer, params) {
                // ajax request to api
                Api.get(params.url(), function(data) {
                    $timeout(function() {
                        console.log(data);
                        // update table params
                        params.total(data.total);
                        // set new data
                        $defer.resolve(data.data);
                    }, 500);
                });
            }
        });
    };12
    $scope.new=function(){
    	//esto es para que siempre este en blanco los campos cuando se crea unno nuevo
    	$scope.entidad={};
    };
    $scope.edit=function(id){
    	$scope.entidad={};
        
        $http({
            url: './'+ENTITYNAME+'/'+id,
            method: "GET"            
        }).success(function (data) {
            console.log(data)
            $scope.entidad=data.data;
            
        });
    };
    $scope.save=function(){
    	$scope.entidad.facultad_id=$scope.others.facultad.id;
        $http({
            url: './'+ENTITYNAME,
            method: "POST",
            data: $scope.entidad,
            
        }).success(function (data, status, headers, config) {
                noty({
                    text: 'etapa registrada satisfactoriamente', 
                    type: 'success',
                    layout:'bottomRight',
                    timeout:5000,
                });
               $('#winNew').modal('hide');
               $route.reload();
              
        });
    };
    $scope.update=function(){
    	 $http({
            url: './'+ENTITYNAME+'/'+$scope.entidad.id,
            method: "PUT",
            data: $scope.entidad,
            
        }).success(function (data, status, headers, config) {
            var n = noty({
                    text: data.message,
                    type: 'success',
                    modal:false,
                    timeout:5000,
                    layout: 'bottomRight',
                    theme: 'defaultTheme'                                  
            });
            $('#winUpd').modal('hide')
            $route.reload()
              
        });
    };
    $scope.delete=function(id){
        var n=noty({
          text: 'Desea eliminar el registro seleccionado?',
          layout: 'center',
          theme: 'defaultTheme',
          modal:true,
          buttons: [
            {addClass: 'btn btn-success', text: 'Si', onClick: function($noty) {

                $http({
                        url: './'+ENTITYNAME+'/'+id,
                        method: "DELETE"            
                    }).success(function (data) {
                        $route.reload();
                        console.log(data)
                       

                });
                $noty.close();
                noty({
                    text: 'Se ha eliminado el registro satisfactoriamente', 
                    type: 'success',
                    layout:'bottomRight',
                    timeout:5000,
                });
              }
            },
            {addClass: 'btn btn-danger', text: 'No', onClick: function($noty) {
                $noty.close();
                
            }
            }
          ]
        });
    };
    $scope.cursos=function(id){
        
         $location.url('/facultad/'+$scope.others.facultad.id+'/escuela/'+id+'/cursos');
    };
    $scope.list();
    
});