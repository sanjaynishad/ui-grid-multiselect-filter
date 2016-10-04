
var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.multiselect.filter']);

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  var today = new Date();
  var nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  $scope.filtered = function(terms){
	  console.log(terms);
	  alert("filtered");
  }
  
  $scope.gridOptions = {
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    columnDefs: [
      { field: 'name', filterHeaderTemplate: '<div multi-select-filter on-filter="grid.appScope.filtered($terms)"></div>' },
      { field: 'gender', filterHeaderTemplate: '<div multi-select-filter on-filter="grid.appScope.filtered($terms)"></div>' },                               
      { field: 'company', filterHeaderTemplate: '<div multi-select-filter on-filter="grid.appScope.filtered($terms)"></div>' },
      { field: 'email', filterHeaderTemplate: '<div multi-select-filter on-filter="grid.appScope.filtered($terms)"></div>' },
      { field: 'phone', enableFiltering: false },
      { field: 'age',
        filterHeaderTemplate: '<div multi-select-filter on-filter="grid.appScope.filtered($terms)"></div>' 
      },
      { field: 'mixedDate', cellFilter: 'date:"MM/dd/yyyy"',type: 'date', width: '15%', enableFiltering: false }
    ]
  };

  $http.get('500_complex.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
      $scope.gridOptions.data[0].age = -5;

      /*data.forEach( function addDates( row, index ){
        row.mixedDate = new Date();
        row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
        row.gender = row.gender==='male' ? '1' : '2';
      });*/
    }).error(function(err){
      console.log(err);
    });
}]);