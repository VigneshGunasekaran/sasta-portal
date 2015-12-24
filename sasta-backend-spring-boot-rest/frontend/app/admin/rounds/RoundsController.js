app.controller('RoundsController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','roundsfactory','exDialog',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,roundsfactory,exDialog){

		$scope.roundsfactory = roundsfactory;
		$scope.rounds = [];
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
	    //Action of clicking product name link.
	    $scope.callType = {};
	    $scope.modelDialogTitle = {
	    	add : "Add Rounds",
	    	edit : "Edit Rounds"
	    };

	    $scope.dateOptions = {
		    format: 'yyyy-MM-dd'
		};
	    $scope.AddDialog = function (id) {
	        $scope.callType.id = id;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/rounds/add.html',
	            controller: 'RoundsController',
	            width: '600px',
	            animation: true,
	            grayBackground: true            
	        });
	    };

		$scope.years = [];
		// default selected years
		$scope.defaultyears = {
		    "value": 0,
		    "text": "Select"
		};

	    $scope.round = 	{
	      "id": null,
	      "name": '',
	      "description": '',
	      "status": true,
	      "referenceId": null,
	      "financialYear": '',
	      "createdDate": null,
	      "modifiedDate": null,
	      "createdByName": "",
	      "modifiedByName": null,
	      "modifiedBy": $rootScope.sessionConfig.userId,
	      "createdBy": $rootScope.sessionConfig.userId,
	      "startDate": null,
	      "endDate": null
	    };

        $scope.startChange = function() {
            var startDate = $scope.startDateObject.value(),
            endDate = $scope.endDateObject.value();

            if (startDate) {
                startDate = new Date(startDate);
                startDate.setDate(startDate.getDate());
                $scope.endDateObject.min(startDate);
            } else if (endDate) {
                $scope.startDateObject.max(new Date(endDate));
            } else {
                endDate = new Date();
                $scope.startDateObject.max(endDate);
                $scope.endDateObject.min(endDate);
            }
        }

        $scope.endChange = function() {
            var endDate = $scope.endDateObject.value(),
            startDate = $scope.startDateObject.value();

            if (endDate) {
                endDate = new Date(endDate);
                endDate.setDate(endDate.getDate());
                $scope.startDateObject.max(endDate);
            } else if (startDate) {
                $scope.endDateObject.min(new Date(startDate));
            } else {
                endDate = new Date();
                $scope.startDateObject.max(endDate);
                $scope.endDateObject.min(endDate);
            }
        }       

	    $scope.Submit = function(){
	    	$scope.round.referenceId = $scope.defaultyears.value;
	    	$scope.round.financialYear = $scope.defaultyears.text;
	    	var responseText = roundsfactory.doSubmitData($scope.round);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to add round!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to add round!");
			});	    	
	    }

	    $scope.Update = function(){
	    	$scope.editround.referenceId = $scope.editdefaultOptions.value;
	    	var responseText = roundsfactory.doUpdateData($scope.editround);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to update round!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to update round!");
			});	    	
	    }

	    $scope.EditData = function(data){
	    	var s = jQuery.map( $scope.years, function( n, i ) {
				if(data.referenceId === n.value)
			  		return n;
			});	  
			if(s instanceof Array){
				$scope.editdefaultOptions =  s[0];
			}else{
				$scope.editdefaultOptions = $scope.defaultyears;
			}	    	
	    	$scope.editround = {
	    		id : data.id,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				name : data.name,
				referenceId : data.referenceId,
			    startDate: data.startDate,
			    endDate: data.endDate,				
				status: true
	    	};
	    	$scope.callType.id = 1;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/rounds/edit.html',
	            controller: 'RoundsController',
	            width: '600px',
	            animation: true,
	            grayBackground: true            
	        });
	    }

	    $scope.Cancel = function() {
	      $scope.closeThisDialog("close");
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "id", title:'Rounds ID', hidden: true, editable : false },
		        		{ field: "name", title:'Name'  },
		        		{ field: "description", title:'Description'  },
		        		{ field: "financialYear", title:'Financial Year'  },
		        		{ field: "startDate", title : "Start Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(startDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
		        		{ field: "endDate", title : "End Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(endDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
		        		{ field: "createdDate", title : "Created Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(createdDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
		        		{ field: "modifiedDate", title : "Modified Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(modifiedDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
		        		{ title : "", template: "<button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"EditData(dataItem);\">Edit</button>&nbsp;<button type=\"button\" class=\"btn btn-danger btn-sm\" ng-click=\"Delet(dataItem);\">Delete</button>" }
		        	],
	        pageable: true,
	        filterable :true,
	        groupable : true,
	        dataSource: {
	            pageSize: 5,
	            transport: {
	                read: function (e) {
	                  $http({
				         method: 'GET',
				         url: $scope.crudServiceBaseUrl + '/rounds/getlist'
				      }).
	                  success(function(data, status, headers, config) {
	                  	if(data.status)
	                      e.success(data.data)
	                  }).
	                  error(function(data, status, headers, config) {
	                  });
	              }
	           }
	        }
	    }

	    function GetLookupValues(type){
	    	roundsfactory.getLookupValues(type).success(function(result){
	    		var defaultOptions = {
				    "value": 0,
				    "text": "Select"
				};
				if(result instanceof Array){
					$scope.years.push(defaultOptions);
					for (var i=0; i<result.length; i++){
					    $scope.years.push(result[i]);
					}						
		  		}else{
		  			notify({
			            messageTemplate: '<span>Unable to read look up values!!!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
		        	});
		  		}
			}).error(function(error,status){
	  			notify({
		            messageTemplate: '<span>Unable to read look up values!!!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
	        	});
			})
		}

		GetLookupValues(9); // Look up for financial years

}]);

app.factory('roundsfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createroundsUrl = '/rounds/create';

	service.getLookupValues = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id
        });
	}


	service.doTestSubmission = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + createroundsUrl,
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}

	service.doSubmitData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + createroundsUrl,
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}

	service.doUpdateData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/rounds/update',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});