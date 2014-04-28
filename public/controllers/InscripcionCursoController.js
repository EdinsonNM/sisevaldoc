app.controller("InscripcionCursoController", function InscripcionCursoController(AlumnoService,InscripcionCursoService,CursoAsignadoService,$routeParams,$scope,$timeout,$http,$route,$location, $resource,ngTableParams){
    $scope.others={};
    
    $scope.entidad={};
    $scope.location = $location;
   CursoAsignadoService.get({id:$routeParams.id},function(data){ $scope.others.cursoasignado=data.data;});
   var ENTITYNAME='criterioevaluacion';
   $scope.list=function(){
        $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        r:Math.random(),
         filter:{
            cursoasignado_id:$routeParams.id
        },
        sorting: {
            name: 'asc'     // initial sorting
        }
        }, {
            total: 0,           // length of data
            getData: function($defer, params) {
                InscripcionCursoService.get(params.url(),function(data){
                    $timeout(function() {
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
    };
    
    $scope.listStudents=function(){
        console.log($scope.others.cursoasignado.curso.escuela_id)
        $scope.others.Students = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        filter:{
            escuela_id:$scope.others.cursoasignado.curso.escuela_id
        },
        sorting: {
            name: 'asc'     // initial sorting
        }
        }, {
            total: 0,           // length of data
            getData: function($defer, params) {
                AlumnoService.get(params.url(),function(data){
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
        $scope.listStudents();
    };
    $scope.edit=function(id){
        $scope.entidad={};
        InscripcionCursoService.get({id:id},function(data){
            $scope.entidad=data.data;
        })
        
    };
    $scope.others.AddStudent=function(item){
        $scope.entidad.alumno=item;
        $scope.entidad.cursoasignado=$scope.others.cursoasignado;
        InscripcionCursoService.save($scope.entidad,function(data){
           
            noty({
                    text: 'Alumno registrado satisfactoriamente', 
                    type: 'success',
                    layout:'bottomRight',
                    timeout:5000,
            });
            $('#winNew').modal('hide');
             $scope.list();
        });
    };
    
    $scope.update=function(){
        InscripcionCursoService.update($scope.entidad,function(data){
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
                InscripcionCursoService.delete({id:id},function(data){
                    $scope.list();
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


    $scope.list();
   
    
});