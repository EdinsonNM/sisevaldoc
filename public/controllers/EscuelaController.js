app.controller("EscuelaController", function EscuelaController($fileUploader,FacultadService,$scope,$routeParams,$timeout,$http,$location,$resource,$route,ngTableParams){   
    
    $scope.others={};
    $scope.entidad={};
    $scope.location = $location;
    var ENTITYNAME='escuela'
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
            url: './import/escuela',
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
            url: './import/escuelasave',
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
    FacultadService.get({id:$routeParams.id},function(data){ $scope.others.facultad=data.data;})
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
                    text: 'Escuela registrada satisfactoriamente', 
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