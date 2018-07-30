if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector;
if (!Element.prototype.closest) Element.prototype.closest = function (selector) {
    var el = this;
    while (el) {
        if (el.matches(selector)) {
            return el;
        }
        el = el.parentElement;
    }
};

angular.module('ui.grid.multiselect.filter', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection'])
.controller('multiSelectCtrl', ["$scope", "$compile", "$timeout", "$element", "$attrs", "$parse", function($scope, $compile, $timeout, $element, $attrs, $parse) {
  var elementScope;
  var $elm;
  var col = $scope.col;
  $scope.colFilter = $scope.col.filters[0];
  $scope.title = col.field;
  $scope.showModal = function() {
    if (elementScope) elementScope.$destroy();
    elementScope = $scope.$new();
    $scope.listOfTerms = [];
    $scope.col.grid.rows.forEach( function ( row ) {
      if ( $scope.listOfTerms.indexOf( row.entity[col.field] ) === -1 ) {
        $scope.listOfTerms.push( row.entity[col.field] );
      }
    });
    $scope.listOfTerms.sort();
    $scope.gridOptions = { 
      data: [],
      enableColumnMenus: false,
      onRegisterApi: function( gridApi) {
        $scope.gridApi = gridApi;
        
        if ( $scope.colFilter && $scope.colFilter.listTerm ){
          $timeout(function() {
            $scope.colFilter.listTerm.forEach( function( cellData ) {
              var entities = $scope.gridOptions.data.filter( function( row ) {
                return row[col.field] === cellData;
              }); 
              
              if( entities.length > 0 ) {
                $scope.gridApi.selection.selectRow(entities[0]);
              }
            });
          });
        }
      } 
    };
    
    $scope.listOfTerms.forEach(function( cellData ) {
    	var r = {};
    	r[col.field] = cellData;
    	$scope.gridOptions.data.push(r);
    });
    
    var html = '<div class="ui-grid-multi-select-filter"><div class="header">Filter {{title}}</div><div class="modal-body"><div class="multi-select-grid" ui-grid="gridOptions" ui-grid-selection></div></div><div class="footer"><button class="btn-close" ng-click="close()">Filter</button><button class="btn-close" ng-click="cancel()">Cancel</button></div></div>';
    $elm = angular.element(html);
    angular.element($element[0].closest('div[ui-grid]')).append($elm);
    
    $compile($elm)(elementScope);
  };
  
  $scope.cancel = function() {
	  if ($elm) {
		  $elm.remove();
	  }
  }
  
  $scope.close = function() {
    var trems = $scope.gridApi.selection.getSelectedRows();
    $scope.colFilter.listTerm = [];
    
    trems.forEach( function( row ) {
    	var t = row[col.field];
    	if(typeof t === "string") {
    		t = t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
    	}
    	$scope.colFilter.listTerm.push(t);
    });
    
    $scope.colFilter.term = $scope.colFilter.listTerm.join(', ');
    $scope.colFilter.condition = new RegExp($scope.colFilter.listTerm.join('|'));
    
    if (elementScope) {
        elementScope.$destroy();
        elementScope = null;
    }
    if ($elm) {
      $elm.remove();
      $elm = null;
    }
    
    $parse($attrs.onFilter)($scope, { $terms: $scope.colFilter.listTerm });
  };
}])


.directive('multiSelectFilter', function() {
  return {
    template: '<button class="ui-grid-multiselect-btn" ng-class="{filtered: colFilter.listTerm.length > 0}" ng-click="showModal()">...</button>',
    controller: 'multiSelectCtrl'
  };
});
