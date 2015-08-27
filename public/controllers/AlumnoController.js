app.controller("AlumnoController", function AlumnoController($q,$fileUploader,SemestreService,FacultadService,EscuelaService,$scope,$timeout,$http,$route,$location, $resource,ngTableParams){
    $scope.others={};
    $scope.entidad={};
    var messageLoadData="Espere un momento mientras se valida la información que desea importar.";
    var messageSaveData="Espere un momento mientras se realiza la carga de información a su servidor";
    var ENTITYNAME='alumno';
    $scope.location = $location;
   FacultadService.get({},function(data){ $scope.others.facultades=data.data;})
   //UPLOAD
    $scope.dataUpload={"total":0,"data":[]};
    $scope.others.data = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        filter:{

        },
        sorting: {
            name: 'asc'     // initial sorting
        }
        }, {
            total: $scope.dataUpload.total,           // length of data
            getData: function($defer, params) {
                var datapaginate = angular.copy($scope.dataUpload.data);
                params.total($scope.dataUpload.total);
                var obj=params.url();
                var ini=(obj.page-1)*obj.count;
                var recordsToShow = datapaginate.splice(ini,obj.count);
                $defer.resolve(recordsToShow);
            },
            $scope: { $data: {} }
    });
    var uploader = $scope.others.uploader = $fileUploader.create({
            scope: $scope,                          // to automatically update the html. Default: $rootScope
            url: './import/alumno',
            formData: [
                { key: 'value' }
            ],
            filters: [
                function (item) {                    // first user filter

                    return true;
                }
            ]
    });
    $scope.others.showLoading=false;
    uploader.bind('beforeupload',function(event, item){
        console.log("ini upload...");
        $scope.others.messageProcess=messageLoadData;
        $scope.others.showLoading=true;
    });
    uploader.bind('complete', function (event, xhr, item, response) {
            $scope.dataUpload=response;
            $scope.others.showLoading=false;
            $scope.others.data.reload();
    });
    $scope.newUpload=function(){
        $('#fileExcel').val('');
        uploader.clearQueue();
        $scope.dataUpload={"total":0,"data":[]};
        $scope.others.data.reload();
    };
    $scope.others.clearFiles=function(){
            $('#fileExcel').val('');
            uploader.clearQueue();

    }

    $scope.others.loadData=function(data){
        var myData=data;
        $scope.dataUpload=myData.data;
        $scope.others.data = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        filter:{

        },
        sorting: {
            name: 'asc'     // initial sorting
        }
        }, {
            total: 0,           // length of data
            getData: function($defer, params) {
                var datapaginate = angular.copy(myData.data);
                var obj=params.url();
                var ini=(obj.page-1)*obj.count;
                params.total(myData.total);
                var recordsToShow = datapaginate.splice(ini,obj.count);
                $defer.resolve(recordsToShow);
            }
        });
    };

    $scope.upload=function(){
        $scope.others.messageProcess=messageSaveData;
        $scope.others.showLoading=true;
        $http({
            url: './import/alumnosave',
            method: "POST",
            data: $scope.dataUpload.data,

        }).success(function (data) {
             var msg='Se importaron '+data.valid+' registros validos';
             $scope.others.showLoading=false;
            var n = noty({
                    text: msg,
                    type: 'success',
                    modal:false,
                    timeout:5000,
                    layout: 'bottomRight',
                    theme: 'defaultTheme'
            });
            $('#winUpload').modal('hide')
            $route.reload()

        });
    };

//END UPLOAD
   $scope.others.loadescuelas=function(){
        var filter={
            'filter[facultad_id]':$scope.entidad.facultad_id,
            'count':10000
        }
        EscuelaService.get(filter,function(data){
            $scope.others.escuelas=data.data;
        });

   };
   $scope.list=function(){
        var Api = $resource('./'+ENTITYNAME);
        $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
            year: 'asc'     // initial sorting
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
            $scope.entidad=data.data;

            $http({
                url: './facultad/'+$scope.entidad.escuela.facultad_id,
                method: "GET"
            }).success(function (data) {
                $scope.entidad.facultad_id=data.data.id;
                $scope.others.loadescuelas();
            });
        });
    };
    $scope.ChangePassword=function(item){
      $scope.entidad=item.usuario;
    }
    $scope.HabilitarConstancia=function(item){
      $scope.entidad={
        alumno_id:item.id
      };
      SemestreService.get({},function(data){
        $scope.others={
          semestres:data.data
        }
        console.log($scope.others.semestres);
      });
    }

    $scope.SaveHabilitarConstancia=function(){
      $http({
            url: './print/habilitar-constancia',
            method: "POST",
            data: $scope.entidad,

        }).success(function (data) {
            var n = noty({
                    text: data.message,
                    type: (data.success)?'success':'warning',
                    modal:false,
                    timeout:5000,
                    layout: 'bottomRight',
                    theme: 'defaultTheme'
            });
            $('#winHabilitarConstancia').modal('hide')


        });
    }

    $scope.SaveUpdatePassword=function(){
      $http({
            url: './admin/updatepassword-for-users',
            method: "POST",
            data: $scope.entidad,

        }).success(function (data) {
            var n = noty({
                    text: data.message,
                    type: (data.success)?'success':'warning',
                    modal:false,
                    timeout:5000,
                    layout: 'bottomRight',
                    theme: 'defaultTheme'
            });
            $('#winChangePassword').modal('hide')


        });
    }
    $scope.save=function(){
        $http({
            url: './'+ENTITYNAME,
            method: "POST",
            data: $scope.entidad,

        }).success(function (data, status, headers, config) {
                noty({
                    text: 'Alumno registrado satisfactoriamente',
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

    $scope.listescuelas=function(column){
        var def = $q.defer();
        var escuelas=[];
        EscuelaService.get({facultad_id:0},function(data){
            angular.forEach(data.data, function(item){
                    escuelas.push({
                        'id': item.id,
                        'title': item.name
                    });
            });
            def.resolve(escuelas);

        });
        return def;
    };
});
