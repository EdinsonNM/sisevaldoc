app.controller("CriterioEvaluacionController", function CriterioEvaluacionController(PlantillaCriteriosService,$routeParams,$scope,$timeout,$http,$route,$location, $resource,ngTableParams){
    $scope.others={
       grupos:[
            {'id':'1','name':'Grupo de Evaluación'},
            {'id':'0','name':'Criterio de Evaluación'}
        ]
    };
    
    $scope.entidad={};
    $scope.location = $location;
   PlantillaCriteriosService.get({id:$routeParams.id},function(data){ $scope.others.matrizcriterios=data.data;});
   var ENTITYNAME='criterioevaluacion';
   $scope.list=function(){
        var Api = $resource('./'+ENTITYNAME);
        $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
         filter:{
            plantilla_id:$routeParams.id
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
    $scope.newGroup=function(){
        //esto es para que siempre este en blanco los campos cuando se crea unno nuevo
        $scope.entidad={
            grupo:1,
            idpadre:0
        };
    };
    $scope.new=function(item){
        //esto es para que siempre este en blanco los campos cuando se crea unno nuevo
        $scope.entidad={
            plantilla_id:$scope.others.matrizcriterios.id,
            grupo:0,
            idpadre:item.id,
            grupo_nombre:item.name
        };
    };
    $scope.edit=function(id){
        
        $scope.entidad={
            plantilla_id:$scope.others.matrizcriterios.id
        };
        
        $http({
            url: './'+ENTITYNAME+'/'+id,
            method: "GET"            
        }).success(function (data) {
            console.log(data)
            $scope.entidad=data.data;
            $scope.entidad.grupo_nombre=data.data.padre.name;
            
        });
    };

    $scope.save=function(){
        $scope.entidad.plantilla_id=$scope.others.matrizcriterios.id;
        $http({
            url: './'+ENTITYNAME,
            method: "POST",
            data: $scope.entidad,
            
        }).success(function (data, status, headers, config) {
                noty({
                    text: 'Criterio registrado satisfactoriamente', 
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


    $scope.list();
   
    
});