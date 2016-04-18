/**
 * AngularJS Header
 * @author Alexander Ishchenko <http://qialex.me>
 * License: MIT 
 */

/**
 * AngularJS Header
 */
app.directive('headerDirective', function() { 
	return {	
		restrict: 'E',
		templateUrl: '/test/templates/directives/_header.html',
		controller: ['$scope', '$location', function($scope, $location) {

			$scope.location = $location;
		}]
	}
});