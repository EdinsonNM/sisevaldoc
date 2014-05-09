app.controller("EvaluacionDocentesController", function EvaluacionDocentesController($fileUploader,DocenteService,FacultadService,EscuelaService,CursoService,SemestreService,$scope,$timeout,$routeParams,$http,$route,$location, $resource,ngTableParams){
    $scope.others={};
    $scope.entidad={};
    $scope.IndexSemestreSelected=-1;
    $scope.showLoading=true;
    $scope.location = $location;
    $scope.facultadSelected=-1;
    $scope.escuelaSelected=-1;
    $scope.semestreSelected=-1;
    $scope.docenteSelected=-1;
    var ENTITYNAME='cursoasignado';

   
    $http({url: './admin/type',method: "GET"}).success(function (data) {
            $scope.faculta_id=data.entity.escuela.facultad_id;
            FacultadService.get({facultad_id:$scope.faculta_id},function(data){
                $scope.facultades=data.data; 
                $scope.others.facultades=data.data;
                if(data.total>0)
                    $scope.facultadSelected=data.data[0].id;
                $scope.loadEscuelas();
            });
    });
            
    
    SemestreService.get({},function(data){
        $scope.others.semestres=data.data;
        $scope.showLoading=false;
        if(data.total>0)
            $scope.LoadBySemestre(data.data[0],0);
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

    $scope.loadDocentes=function(){
        $scope.docenteSelected=-1;
        DocenteService.get({'filter[escuela_id]':$scope.escuelaSelected},function(data){
            $scope.docentes=data.data;
            if(data.total>0){
                $scope.docenteSelected=data.data[0].id;
                $scope.loadDocente();
                $scope.list();
            }
        });
    };
    $scope.LoadBySemestre=function(semestre,$index){

        $scope.semestre=semestre;
        $scope.semestreSelected=semestre.id;
        $scope.IndexSemestreSelected=$index;
        $scope.list();
    };

   $scope.others.loadescuelas=function(){
        var filter={
            'filter[facultad_id]':$scope.entidad.facultad_id,
            'count':10000
        }
        EscuelaService.get(filter,function(data){
            $scope.others.escuelas=data.data;
        });
       
   };
   $scope.loadDocente=function(){
        console.log($scope.docentes);
        console.log($scope.docenteSelected);
        $scope.others.docente=_.find($scope.docentes, function (item) {
            console.log( $scope.docenteSelected);
            return item.id == $scope.docenteSelected;
        });
        console.log($scope.others.docente);
        if($scope.IndexSemestreSelected!=-1){
            $scope.list();
        }
        
   };
   $scope.others.loadcursos=function(){
        var filter={
            'filter[escuela_id]':$scope.entidad.escuela_id,
            'count':10000
        }
        CursoService.get(filter,function(data){
            $scope.others.cursos=data.data;
        });
       
   };

   $scope.list=function(){
        
            try{
                var Api = $resource('./'+ENTITYNAME);
                $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                r:Math.random(),
                filter:{
                    semestre_id:$scope.semestre.id,
                    docente_id:$scope.docenteSelected
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
                                if(data.total==0){
                                    data.data={};
                                }
                                // update table params
                                params.total(data.total);
                                // set new data
                                $defer.resolve(data.data);
                                
                            }, 500);
                        });
                    }
                });
            }catch(e){
                console.log(e);
            }
        
    };
    $scope.new=function(){
        $('#winNew').modal('show')
        //esto es para que siempre este en blanco los campos cuando se crea unno nuevo
        var docente=$scope.others.docente.firstname+' '+$scope.others.docente.lastname;
        $scope.entidad={
            docente_name:docente,
            docente_id:$scope.others.docente.id,
            semestre_id:$scope.semestre.id,
            semestre_name:$scope.semestre.year+' - '+$scope.semestre.period
        };
    };

    $scope.save=function(){
        $http({
            url: './'+ENTITYNAME,
            method: "POST",
            data: $scope.entidad,
            
        }).success(function (data, status, headers, config) {
                noty({
                    text: data.message,
                    type: data.type,
                    layout:'bottomRight',
                    timeout:5000,
                });
                if(data.success){
                    $('#winNew').modal('hide');
                    $scope.list();
                }
              
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
                        $scope.list();
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


    $scope.alumnos=function(id){
       
        $location.url('/cursoasignado/'+id+'/alumnos');
    }
    $scope.autoevaluacion=function(id){
       
        $location.url('/cursoasignado/'+id+'/autoevaluacion');
    }
    $scope.carganolectiva=function(){
        $location.url('carganolectiva/'+$scope.semestre.id+'/docente/'+$scope.others.docente.id);
    }

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