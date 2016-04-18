/**
 * AngularJS Gallery
 * @author Alexander Ishchenko <http://qialex.me>
 * License: MIT 
 */

/**
 * AngularJS Gallery Directive
 */
app.directive('gallery', function() {  
	return {	
		restrict: 'E',
		transclude: true,
		templateUrl: '/test/templates/directives/directive.gallery.html',
		controller: ['$scope', '$timeout', function($scope, $timeout){
			$scope.slider = {
				img: [
					{
					  url: "1.jpg",
					  name : "Фон"
					},
					{
					  url : "2.jpg",
					  name : "Котик"
					},
					{
					  url: "3.jpg",
					  name : "Стекло"
					},
					{
					  url : "4.jpg",
					  name : "Попугай"
					}			
				],
				delay: 2500,
				currentKey: 0,
				currentSlide: {},
				timeoutID: false,
				
				//Changing slide by clicking on the thumbnail
				//Меняем слайд по клику на миниатюру
				changeSlideDirectly: function (v) {
					$scope.slider.restartTimeout();
					this.currentKey = v.$index;
					this.currentSlide = this.img[this.currentKey];
				},
				//Finding and changing slide
				//Находим и меняем слайд			
				nextSlide: function (direction) {
					if (direction == "next") {
						if (this.currentKey + 1 == this.img.length) {
							this.currentKey = 0;
						}
						else {
							this.currentKey++;
						}
					}
					if (direction == "previous") {
						if (this.currentKey == 0) {
							this.currentKey = this.img.length - 1;
						}
						else {
							this.currentKey--;
						}
					}
					
					this.currentSlide = this.img[this.currentKey];
				},
				//Changing slide by clicking on the left or right
				//Меняем слайд по клику на влево - вправо				
				moveSlideManually: function (direction) {
					$scope.slider.restartTimeout();
					$scope.slider.nextSlide(direction);
				},
				//Restarting timeout
				//Перезапускаем таймаут
				restartTimeout: function () {
					if (this.timeoutID) {
						$timeout.cancel( this.timeoutID );
						$scope.slider.startMoving();
					}
				},
				//Changing slide by the timeout
				//Меняем слайд по таймауту					
				startMoving: function () {
					this.timeoutID = $timeout (function () {
						$scope.slider.nextSlide("next");
						$scope.slider.startMoving ();
					}, this.delay);
				}		
			};
			
			//Starting the timeout
			//Инициируем вращение	
			$scope.slider.currentSlide = $scope.slider.img[0];
			$scope.slider.startMoving ();	

			//Settings
			//Настройка	
			$scope.settings = {
				show: false,
				change: function () {
					this.show = !this.show;
				}
			};
		}]		
	}
});