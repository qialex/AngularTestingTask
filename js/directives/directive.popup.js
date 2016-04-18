/**
 * AngularJS Popup
 * @author Alexander Ishchenko <http://qialex.me>
 * License: MIT
 */

/**
 * AngularJS Popup Directive
 */
app.directive('popup', function() { 
	return {	
		restrict: 'E',
		templateUrl: '/test/templates/directives/directive.popup.html',
		controller: ['$scope', '$rootScope', function($scope, $rootScope){
			$scope.popup = {
				title: '',
				text: '',
				counter: 0,
				openPopUp: function () {
					var self = this;
					
					//Wrapping a background	
					//Сдедали затемненный фон
					var body = angular.element(document.querySelector("body"));
					var wrapper = angular.element('<div id="popup-wallpaper"></div>');
					var secondWrapper = angular.element('<div class="popup-wrapper"></div>');
					body.prepend(wrapper);
					wrapper.append(secondWrapper);
					
					//Creating a popup
					//Создаем попап
					var popup = angular.element('<div class="popup"></div>');
					secondWrapper.append(popup);
					
					//Creating a title, text and closing spot
					//Создаем заголовок, текст и закрывашку
					var title = angular.element('<h3 class="popup-header">' + ($scope.popup.title.length > 0 ? $scope.popup.title : "Заголовок") + '</h3>');
					var text = angular.element('<div>' + ($scope.popup.text.length > 0 ? $scope.popup.text : "Текст") + '</div>');
					var closingSpot = angular.element('<div class="popup-close-wrapper"><i class="fa fa-close popup-close"></i></div>');
					popup.append(closingSpot).append(title).append(text);
					
					
					//Binding a click to close
					//Привязываем событие закрытия к крестику
					closingSpot.bind('click', function () {
						self.PopUpClose(wrapper);
					});
					
					//Binding a ESC to close
					//Привязываем событие закрытия к ESC			
					function PopUpCloseByEsc (event){
						if(event.which === 27) { // 27 = esc key
							self.PopUpClose(wrapper);
							body.unbind('keydown keypress', PopUpCloseByEsc);
						}
					}
					body.bind('keydown keypress', PopUpCloseByEsc);
					
					//Binding a click outside to close
					//Привязываем событие клика на фон для закрытия						
					function PopUpCloseByClickOutside (event){
						if (event.target.id == "popup-wallpaper") {
							self.PopUpClose(wrapper);
							wrapper.unbind('click', PopUpCloseByClickOutside);
						}
					}
					wrapper.bind('click', PopUpCloseByClickOutside);
					
				},
				//Closing popup
				//Закрываем попап
				PopUpClose: function (wrapper){
					this.callback();
					wrapper.remove();
					//Iniciation of the digest circle 
					//Запускаем digest circle
					if (!$rootScope.$$phase) {
						$rootScope.$digest();
					}
				},
				//Callback action
				//Коллбек функция				
				callback: function (){
					this.counter++;
				}
			}				
		}]		
	}
});			