app.controller("CargaNoLectivaController", function (ActividadService,CargaNoLectivaService,SemestreService,DocenteService,$scope,$timeout,$routeParams,$http,$route,$location, $resource,ngTableParams){
	'use strict';
	$scope.others={};
    $scope.entidad={};
    $http({url: './admin/type',method: "GET"}).success(function (data) {
            $scope.showEdit=false;
            if(data.type=='docente')
                $scope.showEdit=true;
            
    });
    ActividadService.get({},function(data){ 
        $scope.others.actividades=data.data;
       
    });
	SemestreService.get({id:$routeParams.idsemestre},function(data){ 
        $scope.others.semestre=data.data;
       
    });
 	DocenteService.get({id:$routeParams.iddocente},function(data){ 
        	$scope.others.docente=data.data;
    });
    $scope.list=function(){
		$scope.tableParams = new ngTableParams(
		{
        	page: 1,            // show first page
        	count: 10,          // count per page
        	r:Math.random(),
        	filter:
        	{
	            docente_id:$routeParams.iddocente,
	            semestre_id:$routeParams.idsemestre
    	    },
        	sorting: 
        	{
            	name: 'asc'     // initial sorting
        	}
        }, 
        {
            total: 0,           // length of data
            getData: function($defer, params) {
                CargaNoLectivaService.get(params.url(),function(data){
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

    $scope.new=function(){
        $scope.entidad={};
	};
    $scope.save=function(){
        $scope.entidad.semestre_id=$routeParams.idsemestre;
        $scope.entidad.docente_id=$routeParams.iddocente;
        CargaNoLectivaService.save($scope.entidad,function(data){
            noty({
                    text: 'Carga registrada satisfactoriamente', 
                    type: 'success',
                    layout:'bottomRight',
                    timeout:5000,
            });
            $('#winNew').modal('hide');
            $route.reload();
        });
    };

    $scope.edit=function (id) {
		CargaNoLectivaService.get({id:id},function(data){
            $scope.entidad=data.data;
        })
	};

    $scope.update=function(){
        $scope.entidad.cursoasignado_id=$routeParams.id;
        CargaNoLectivaService.update($scope.entidad,function(data){
            noty({
                    text: 'Carga No Lectiva actualizada satisfactoriamente', 
                    type: 'success',
                    layout:'bottomRight',
                    timeout:5000,
            });
            $('#winUpd').modal('hide');
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
                CargaNoLectivaService.delete({id:id},function(data){
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
    $scope.list();
    
});
