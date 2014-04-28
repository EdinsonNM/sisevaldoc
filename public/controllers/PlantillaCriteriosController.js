app.controller("PlantillaCriteriosController", function PlantillaCriteriosController(PlantillaCriteriosService,$scope,$timeout,$http,$route,$location, $resource,ngTableParams){
    $scope.others={};
    $scope.entidad={};
    $scope.location = $location;
    var ENTITYNAME='plantillacriterios';
   $scope.list=function(){
        $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
            name: 'asc'     // initial sorting
        }
        }, {
            total: 0,           // length of data
            getData: function($defer, params) {
                // ajax request to api
                 PlantillaCriteriosService.get(params.url(),function(data){
                    $timeout(function() {
                        console.log(data);
                        // update table params
                        params.total(data.total);
                        // set new data
                        $defer.resolve(data.data);
                    }, 500);
                 })
                
            }
        });
    };
    $scope.new=function(){
        //esto es para que siempre este en blanco los campos cuando se crea unno nuevo
        $scope.entidad={};
    };
    $scope.edit=function(id){
        $scope.entidad={};
        PlantillaCriteriosService.get({id:id},function(data){
            $scope.entidad=data.data;
        })
        
    };
    $scope.save=function(){
        PlantillaCriteriosService.save($scope.entidad,function(data){
            noty({
                    text: 'Grado registrada satisfactoriamente', 
                    type: 'success',
                    layout:'bottomRight',
                    timeout:5000,
            });
            $('#winNew').modal('hide');
            $route.reload();
        });
        
    };
    $scope.update=function(){
        PlantillaCriteriosService.update($scope.entidad,function(data){
            var n = noty({
                    text: data.message,
                    type: 'success',
                    modal:false,
                    timeout:5000,
                    layout: 'bottomRight',
                    theme: 'defaultTheme'                                  
            });
            $('#winUpd').modal('hide')
            $route.reload();
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
                $noty.close();
                PlantillaCriteriosService.delete({id:id},function(data){
                    $route.reload();
                    noty({
                        text: 'Se ha eliminado el registro satisfactoriamente', 
                        type: 'success',
                        layout:'bottomRight',
                        timeout:5000
                    });
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
    $scope.criterios=function(id){
        var url="/matrizevaluacion/"+id+"/criterioevaluacion";
        $location.path(url);
    };
    $scope.list();
   
    
});