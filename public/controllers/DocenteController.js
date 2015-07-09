app.controller("DocenteController", function DocenteController($q,DocenteService,$fileUploader,$rootScope,FacultadService,EscuelaService,CategoriaDocenteService,TipoDedicacionService,GradoService,TituloService,$scope,$location,$timeout,$http, $resource,$route,ngTableParams){
    $scope.others={};
    $scope.entidad={};
    $scope.master = {};
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
                var obj=params.url();
                var ini=(obj.page-1)*obj.count;
                var recordsToShow = datapaginate.splice(ini,obj.count);
                $defer.resolve(recordsToShow);
            },
            $scope: { $data: {} }
    });
    var uploader = $scope.others.uploader = $fileUploader.create({
            scope: $scope,                          // to automatically update the html. Default: $rootScope
            url: './import/docente',
            formData: [
                { key: 'value' }
            ],
            filters: [
                function (item) {                    // first user filter
                    console.info('filter1');
                    return true;
                }
            ]
    });
    uploader.bind('complete', function (event, xhr, item, response) {
            $scope.dataUpload=response;
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
        $http({
            url: './import/docentesave',
            method: "POST",
            data: $scope.dataUpload.data,

        }).success(function (data) {
            var n = noty({
                    text: 'data cargada satisfactoriamente',
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

    /*$scope.$watch("entidad.firstname.substring(0,1).toLowerCase()+'.'+entidad.lastname.substring(0,6).trim().toLowerCase()",function(text){
        $scope.entidad.username=text;
    });
    */

    GradoService.get({},function(data){ $scope.others.grados=data.data; });
    TituloService.get({},function(data){ $scope.others.titulos=data.data; });
    CategoriaDocenteService.get({},function(data){ $scope.others.categorias=data.data; });
    TipoDedicacionService.get({},function(data){ $scope.others.tiposdedicacion=data.data; });

    $scope.list=function(){
        var Api = $resource('./docente');
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

    }
    $scope.new=function(id){
        $scope.entidad = angular.copy($scope.master);

    }

    $scope.edit=function(id){

        $scope.entidad={};
        DocenteService.get({id:id},function(data){
            $scope.entidad=data.data;
            $scope.entidad.facultad_id=$scope.entidad.escuela.facultad_id;
            $scope.entidad.username=$scope.entidad.usuario.username;
            $scope.others.loadescuelas();
        });


    }

    $scope.save=function(){
        $http({
            url: './docente',
            method: "POST",
            data: $scope.entidad,

        }).success(function (data, status, headers, config) {
                noty({
                    text: 'Docente registrado satisfactoriamente',
                    type: 'success',
                    layout:'bottomRight',
                    timeout:5000,
                });
               $('#winNew').modal('hide');
               $scope.tableParams.reload();

        });
    };

    $scope.update=function(){
        $http({
            url: './docente/'+$scope.entidad.id,
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
            $scope.tableParams.reload()

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
                        url: './docente/'+id,
                        method: "DELETE"
                    }).success(function (data) {
                        $scope.tableParams.reload();
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
    $scope.jefeDpto=function(id){
        $scope.entidad={
            id:id
        }
        DocenteService.updateJefeDpto($scope.entidad,function(data){
            var n = noty({
                    text: data.message,
                    type: 'success',
                    modal:false,
                    timeout:5000,
                    layout: 'bottomRight',
                    theme: 'defaultTheme'
            });
            $('#winUpd').modal('hide')
            $scope.tableParams.reload();
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
