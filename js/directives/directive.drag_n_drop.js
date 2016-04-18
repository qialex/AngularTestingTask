/**
 * AngularJS Drag`N`Drop
 * @author Alexander Ishchenko <http://qialex.me>
 * License: MIT 
 */

/**
 * AngularJS Drag`N`Drop Directive
 */
app.directive('dragndrop', function () {
	return {	
		restrict: 'E',
		transclude: true,
		templateUrl: '/test/templates/directives/directive.drag_n_drop.html',
		controller: ['$scope', 'dragNdrop', '$rootScope', function ($scope, dragNdrop, $rootScope) {
			$scope.goods = {
				items: [
					{
					  url: "1.jpg",
					  title : "Фон",
					  descrition : "Описание"
					},
					{
					  url : "2.jpg",
					  title : "Котик",
					  descrition : "Описание"
					},
					{
					  url: "3.jpg",
					  title : "Стекло",
					  descrition : "Описание"
					},
					{
					  url : "4.jpg",
					  title : "Попугай",
					  descrition : "Описание"
					}			
			]};
			
			$scope.shoppingCart = {
				items: []		
			};	
			
			//When Item is Dropped in the right spot
			//В случае успешного переноса
			$scope.cuccessfulDrop = function (e) {
				
				//Finding and url of the iamge
				//Находим урл картинки
				var url_array = e.src.split('/');
				var url = url_array[url_array.length-1];

				//Moving item goods to the shoppingCart
				//Переносим элемент из goods в shoppingCart
				for (var i in $scope.goods.items) {
					if ($scope.goods.items[i].url == url) {
						$scope.shoppingCart.items.push($scope.goods.items[i]);
						$scope.goods.items.splice(i, 1);
					}
				}
				
				//Iniciation of the digest circle 
				//Запускаем digest circle
				if (!$rootScope.$$phase) {
					$rootScope.$digest();
				}
			}
			
			
			$scope.deleteFromCart = function (url) {
				
				//Moving item goods to the shoppingCart
				//Переносим элемент из goods в shoppingCart
				for (var i in $scope.shoppingCart.items) {
					if ($scope.shoppingCart.items[i].url == url) {
						$scope.goods.items.push($scope.shoppingCart.items[i]);
						$scope.shoppingCart.items.splice(i, 1);
					}
				}
				
				//Iniciation of the digest circle 
				//Запускаем digest circle
				if (!$rootScope.$$phase) {
					$rootScope.$digest();
				}
			}
			
			dragNdrop.iniciate($scope.cuccessfulDrop, 'targetElement');
		}]
	}
});