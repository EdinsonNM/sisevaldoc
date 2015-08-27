app.controller("CursoAsignadoController", function CursoAsignadoController(CursoAsignadoService,FacultadService,EscuelaService,CursoService,SemestreService,$scope,$timeout,$routeParams,$http,$route,$location, $resource,ngTableParams){
    $scope.others={};
    $scope.entidad={};
    $scope.IndexSemestreSelected=0;
    $scope.showLoading=true;
    $scope.location = $location;

    $scope.others.types=[
        {text:"Obligatorio"},
        {text:"Electivo"}
    ];
    var ENTITYNAME='cursoasignado?x='+Math.random();
    FacultadService.get({r:Math.random()},function(data){ $scope.others.facultades=data.data;})


    $http({url: './admin/docente',method: "GET"}).success(function (data) {
            $scope.others.docente=data.data;
            SemestreService.get({},function(data){
                $scope.others.semestres=data.data;
                $scope.showLoading=false;
                if(data.total>0){
                    $scope.LoadBySemestre(data.data[0],0);
                }
            });
    });
    $scope.LoadBySemestre=function(semestre,$index){
        $scope.semestre=semestre;
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
        if(!$scope.tableParams){
          console.log('load tableParams');
            var Api = $resource('./'+ENTITYNAME);
            $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            r:Math.random(),
            filter:{
                semestre_id:$scope.semestre.id,
                docente_id:$scope.others.docente.id
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
        }else{
          console.log('load tableParams reload');
          $scope.tableParams.$params.filter={
            semestre_id:$scope.semestre.id,
            docente_id:$scope.others.docente.id
          }
          $scope.tableParams.reload();
        }
    };
    $scope.new=function(){
        //esto es para que siempre este en blanco los campos cuando se crea unno nuevo
        var docente=$scope.others.docente.firstname+' '+$scope.others.docente.lastname;
        $scope.entidad={
            docente_name:docente,
            docente_id:$scope.others.docente.id,
            semestre_id:$scope.semestre.id,
            semestre_name:$scope.semestre.year+' - '+$scope.semestre.period
        };
    };
    $scope.edit=function(id){
        $scope.entidad={};

        CursoAsignadoService.get({id:id},function(data){
            $scope.entidad=data.data;
        });
    };
    $scope.save=function(){
        $http({
            url: './'+ENTITYNAME,
            method: "POST",
            data: $scope.entidad,

        }).success(function (data, status, headers, config) {
                noty({
                    text: 'Curso asignado satisfactoriamente',
                    type: 'success',
                    layout:'bottomRight',
                    timeout:5000,
                });
               $('#winNew').modal('hide');
               $scope.list();

        });
    };
    $scope.update=function(){

        CursoAsignadoService.update($scope.entidad,function(data){
            var n = noty({
                    text: data.message,
                    type: 'success',
                    modal:false,
                    timeout:5000,
                    layout: 'bottomRight',
                    theme: 'defaultTheme'
            });
            $('#winUpd').modal('hide')
            $scope.list();
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
    //$scope.list();


});
