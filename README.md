# ui-grid-multiselect-filter

This is a ui-grid plugin to **filter** the grid's data.

## Getting Started

This is plug in for the [ui-grid](https://github.com/angular-ui/ui-grid) so we need to include file as per the library requirements.

### Prerequisities

```
    <link rel="stylesheet" type="text/css" href="bower_components/angular-ui-grid/ui-grid.min.css">
    <script src="bower_components/angular-ui-grid/ui-grid.min.js">
```

### Installing

```
    <link rel="stylesheet" href="dist/ui-grid-multiselect-filter.min.css" type="text/css">
    <script src="dist/ui-grid-multiselect-filter.min.js"></script>
```
Inject app **ui.grid.multiselect.filter**
```
    angular.module('app', ['ui.grid', 'ui.grid.selection', 'ui.grid.multiselect.filter'])
```
### Usage
Add directive **multi-select-filter** into ui-grid's header template 
```
    { field: 'name', filterHeaderTemplate: '<div multi-select-filter></div>' }
```
#### Events
This directive fires **on-filter** event on filter of grid's data and returns array list of terms as **$terms**

##### In header template
```
    filterHeaderTemplate: '<div multi-select-filter on-filter="grid.appScope.filtered($terms)"></div>'
```
##### Inside controller

```
    $scope.filtered = function($terms){
        // Write the code to execute after filter
        console.log($terms);
        alert("filtered");
    }
```
### Demo
**[ui-grid-multiselect-filter](http://www.sanjaynishad.com/ui-grid-multiselect-filter/)** 

## Angular Compatibility

This is currently compatible with Angular versions ranging from 1.2.x to 1.4.x.

## Authors

**[Sanjay Nishad](htttp://www.sanjaynishad.com/)**

See also the list of [contributors](https://github.com/sanjaynishad/ui-grid-multiselect-filter/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
