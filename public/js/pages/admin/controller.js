app.controller("appController", function appController($rootScope,$scope,$http){
    $scope.entidad={};
    $http.get('./admin/menu').success(function (data) {
        $scope.menu = data.data;
        $scope.selectedIndex=-1;
        $scope.itemclick=function(index){
        	
 			$scope.selectedIndex=index;
        }
    });

    $scope.updatePassword=function(){
    	$scope.entidad={
    		username:$rootScope.user.username
    	};
    }
    $scope.saveUpdatePassword=function(){
    	$http({
            url: './admin/updatepassword',
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
            $('#winUpdPassword').modal('hide')
            
              
        });
    };

})

