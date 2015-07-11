app.controller("AlumnoCursoController", function AlumnoCursoController(AlumnoCursoService,FacultadService,EscuelaService,CursoService,SemestreService,$scope,$timeout,$routeParams,$http,$route,$location, $resource,ngTableParams){
    $scope.others={};
    $scope.entidad={};
    $scope.IndexSemestreSelected=0;
    $scope.showLoading=true;
    $scope.location = $location;
    var ENTITYNAME='alumnocurso?x='+Math.random();
    FacultadService.get({r:Math.random()},function(data){ $scope.others.facultades=data.data;})


    $http({url: './admin/alumno',method: "GET"}).success(function (data) {
            $scope.others.alumno=data.data;

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
        console.log("list....");
        if(!$scope.tableParams){

            $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            r:Math.random(),
            filter:{
                semestre_id:$scope.semestre.id,
                alumno_id:$scope.others.alumno.id

            },
            sorting: {
                name: 'asc'     // initial sorting
            }
            }, {
                total: 0,           // length of data
                getData: function($defer, params) {
                    // ajax request to api
                    AlumnoCursoService.get(params.url(), function(data) {

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
            $scope.tableParams.$params.filter={
              semestre_id:$scope.semestre.id,
              alumno_id:$scope.others.alumno.id
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

        $http({
            url: './'+ENTITYNAME+'/'+id,
            method: "GET"
        }).success(function (data) {
            console.log(data)
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
                    text: 'Facultad registrada satisfactoriamente',
                    type: 'success',
                    layout:'bottomRight',
                    timeout:5000,
                });
               $('#winNew').modal('hide');
               $scope.list();

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

    $scope.evaluacion=function(id){

        $location.url('/alumnocurso/'+id+'/evaluacion');
    }
    //$scope.list();

    $scope.ImprimirFicha=function(){

          $http({url:"./print/valida-constancia-alumno?semestre_id="+$scope.semestre.id+"&alumno_id="+$scope.others.alumno.id,method: "GET"}).success(function (data) {
            if(data.success){
              document.location.href="./print/constancia-evaluacion-alumno?semestre_id="+$scope.semestre.id+"&alumno_id="+$scope.others.alumno.id;
            }else{
              type="warning";
              var n = noty({
                      text: data.message,
                      type: type,
                      modal:false,
                      timeout:5000,
                      layout: 'bottomRight',
                      theme: 'defaultTheme'
              });
            }

          });

    }


});
