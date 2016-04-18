/**
 * AngularJS WebSocket
 * @author Alexander Ishchenko <http://qialex.me>
 * License: MIT
 */

/**
 * AngularJS WebSocket Directive
 */
app.directive('websocket', function() { 
	return {	
		restrict: 'E',
		transclude: true,
		templateUrl: '/test/templates/directives/directive.websocket.html',
		controller: ['$scope', '$rootScope', 'WebSocket', function($scope, $rootScope, WebSocket){
			
			$scope.chat = {message: ''};
						
			$scope.WS = WebSocket;
		
			$scope.WS.messageBox = angular.element(document.querySelector("#messagesFromServer"));
			$scope.WS.chatBox = angular.element(document.querySelector("#chat"));
			$scope.WS.numberBox = angular.element(document.querySelector("#numberBox"));
			$scope.WS.chatCount = 0;

			$scope.WS.gettingMessage = function (event) {
				var incomingMessage = event.data;
				$scope.WS.showMessage(incomingMessage); 
			}
			
			$scope.WS.showMessage = function (message) {
				//console.log ("mesage: " + message);
				
				var dateString = new Date().getHours() + ':' + new Date().getMinutes() ;
				
				//console.log('h ' + WebSocket.socket.readyState);
				if (~message.indexOf("CHAT")) {
					//console.log ("CHAT: " + message);
					if (~message.indexOf("count")) {
						this.chatCount = message[11];
						
						//Iniciation of the digest circle 
						//Запускаем digest circle
						if (!$rootScope.$$phase) {
							$rootScope.$digest();
						}
					}
					else {
						var msgElement = angular.element('<div><span class="chatDate">' + dateString + ':</span> ' + message.slice(5) + '</div>');
						this.chatBox.append(msgElement);
						$("#chat").animate({scrollTop: $("#chat").offset().top}, "slow");
					}
				}
				else if ( $scope.isNumeric(message) ) {
					//console.log ("NUMBER: " + +message, typeof (+message));
					var msgElement = angular.element('<li class="list-group-item">' + dateString + ' ' + message + '</div>');
					this.numberBox.prepend(msgElement);
				} 
				else {
					//console.log ("else: " + message);
					var msgElement = angular.element('<li>' + message + '</li>');
					this.messageBox.prepend(msgElement);
				}
			}
			
			$scope.WS.send = function () {
				if($scope.chat.message !== undefined && $scope.chat.message.trim() !== '') {
					$scope.WS.sendMessage($scope.chat.message.trim());
					$scope.chat.message = '';
					if (!$rootScope.$$phase) {
						$rootScope.$digest();
					}
				}
			}
			
			$scope.isNumeric = function (n) {
				return !isNaN(parseFloat(n)) && isFinite(n);
			}
			
			function PopUpCloseByEnter (event){
				if(event.which === 13) { // 13 = Enter key
					$scope.WS.send($scope.chat.message);
				}
			}
			angular.element(document.querySelector("body")).bind('keydown', PopUpCloseByEnter);
			
			$scope.WS.SocketCheckMultiSocket($scope.WS.socket);
			$scope.WS.SocketConnect("ws://82.146.45.144:8081", $scope.WS.gettingMessage);
		}]		
	}
});			