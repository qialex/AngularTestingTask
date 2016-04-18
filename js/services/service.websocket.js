/**
 * AngularJS WebSocket
 * @author Alexander Ishchenko <http://qialex.me>
 * License: MIT 
 */

/**
 * AngularJS WebSocket Service
 */

app.service('WebSocket', function() {
	
	this.socket = {};
	this.ip = {};
	
	var self = this;
	
	this.SocketConnect = function (ip, onmessageFN) {
		if (!window.WebSocket) {
			return 'WebSocket в этом браузере не поддерживается.';
		}
		this.ip = ip;
		this.onmessageFN = onmessageFN;
		
		this.socket = new WebSocket(ip);
		this.socket.onmessage = onmessageFN;
		this.socket.onerror = function (event) {
			console.log (event);
			console.log (this.socket);
		};
		this.socket.onclose = function(event) {
			if (event.wasClean) {
				//console.log('Соединение закрыто чисто');
			} else {
				//console.log('Обрыв соединения');
			}
			
			self.SocketConnect(self.ip, self.onmessageFN);			
			
			//console.log('Код: ' + event.code + ' причина: ' + event.reason);		
		}
	}
	
	this.sendMessage = function (message) {
		
		self.message = message;
		
		if (!message || message.trim() == '') {
			return false;
		}
		
		if (this.socket.readyState === 1) {
			this.socket.send(message);
		}
		else {
			waitForSocketConnection(this.socket, function(){
				self.socket.send(self.message);
			});
		}
	}	
	
	this.SocketCheckMultiSocket = function (socket) {
		var cnt = 0;
		for(var any in socket) {
			cnt++;
			if(cnt>0) {
				continue;
			}
		}
		
		if (cnt>0) {
			socket.onclose = function () {};
			socket.close()
		}
	}
	
	var self = this;
	
	var waitForSocketConnection = function (socket, callback) {
		setTimeout(
			function () {
				if (socket.readyState === 1) {
					if(callback != null){
						callback();
					}
					return;

				} else {
					waitForSocketConnection(socket, callback);
				}

			}, 5);
	};
	

});