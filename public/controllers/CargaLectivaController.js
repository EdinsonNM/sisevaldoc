app.controller('CargaLectivaController', function(CargaLectivaService,CursoAsignadoService,$filter,$routeParams,$scope,$timeout,$http,$route,$location, $resource,ngTableParams) {
	'use strict';
	$scope.others={};
    $scope.entidad={};
    $scope.others.places=[{value:1,label:'Pabellón'},{value:2,label:'Laboratorio'}];
    $scope.others.labelplace="Nombre";
    $scope.$watch("entidad.typeplace",function(value){
        value=value||'';
        $scope.others.labelplace="Nombre "+value;
        
    });
    $http({url: './admin/type',method: "GET"}).success(function (data) {
            $scope.showEdit=false;
            if(data.type=='docente')
                $scope.showEdit=true;
            
    });
	CursoAsignadoService.get({id:$routeParams.id},function(data){ 
        $scope.others.cursoasignado=data.data;
        $scope.others.weeks=weeks();
    });
	console.log("HOLA ALVITA");
    $scope.others.open = function($event) {
        //$event.preventDefault();
        //$event.stopPropagation();

        $scope.others.opened = true;
    };
    var weeks = function(max){
            var input = [];
            var max=$scope.others.cursoasignado.semestre.numberweeks||0;
            for (var i = 1; i <= max; i ++) 
                input.push(i);
            return input;
    };
	$scope.list=function(){
		$scope.tableParams = new ngTableParams(
		{
        	page: 1,            // show first page
        	count: 10,          // count per page
        	r:Math.random(),
        	filter:
        	{
	            cursoasignado_id:$routeParams.id
    	    },
        	sorting: 
        	{
            	name: 'asc'     // initial sorting
        	}
        }, 
        {
            groupBy: 'week',
            total: 0,           // length of data
            getData: function($defer, params) {
                CargaLectivaService.get(params.url(),function(data){
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
        $scope.entidad.cursoasignado_id=$routeParams.id;
        CargaLectivaService.save($scope.entidad,function(data){
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
		CargaLectivaService.get({id:id},function(data){
            //data.data.date_start=$filter('date')(data.data.date_start,'MM/dd/yyyy');
            //data.data.date_end=$filter('date')(data.data.date_end,'MM/dd/yyyy');
            console.log(data.data)
            $scope.entidad=data.data;
        })
	};

    $scope.update=function(){
        $scope.entidad.cursoasignado_id=$routeParams.id;
        CargaLectivaService.update($scope.entidad,function(data){
            noty({
                    text: 'registro actualizado satisfactoriamente', 
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
                CargaLectivaService.delete({id:id},function(data){
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
    }
    $scope.list();
});