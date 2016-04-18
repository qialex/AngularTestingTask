/**
 * AngularJS Drag`N`Drop
 * @author Alexander Ishchenko <http://qialex.me>
 * License: MIT 
 */

/**
 * AngularJS Drag`N`Drop Service
 */

app.service('dragNdrop', function() {

	var dragElement;
	var dragParentElement;
	var coords, shiftX, shiftY;
	
	var self = this;
	
	this.iniciate = function (succcesFn, targetElementID) {

		self.succcesFn = succcesFn;
		self.targetElement = document.getElementById('#' + targetElementID);
		
		document.onmousedown = function(e) {

			dragElement = e.target;
		
			if (!dragElement.classList.contains('draggable')) return;

			if (e.which !== 1) return;
			
			if (!dragParentElement) {
				dragParentElement = dragElement.parentElement;
			}

			startDrag(e.clientX, e.clientY);

			document.onmousemove = function(e) {
				moveAt(e.clientX, e.clientY);
			};

			dragElement.onmouseup = function(e) {
				finishDragMoveBack();
			};
			
			return false;
		}
	}
	
	var startDrag = function(clientX, clientY) {

		//Changing background of the target Element and his Childrens
		//Меняем фон у таргет элемента и его детей	
		changeBackground (targetElement, '#DFF0D8');

		shiftX = clientX - dragElement.getBoundingClientRect().left;
		shiftY = clientY - dragElement.getBoundingClientRect().top;

		dragElement.style.position = 'fixed';

		document.body.appendChild(dragElement);
		
		moveAt(clientX, clientY);
	}
	
	var finishDragMoveBack = function() {
		  
		//Changing background of the target Element and his Childrens
		//Меняем фон у таргет элемента и его детей		  
		changeBackground (targetElement, 'white');

		//Removing styles and apping dragElement back
		//Удаляем стили и возращаем элемент обратно
		dragElement.removeAttribute("style");
		console.log (dragParentElement);
		dragParentElement.appendChild(dragElement);		

		//Removing listeners from the mouse
		//Удяляем события с мыши
		document.onmousemove = null;
		dragElement.onmouseup = null;
		dragParentElement = null;
	}
	  
	var finishDragToTarget = function () {
		
		
		//Changing background of the target Element and his Childrens
		//Меняем фон у таргет элемента и его детей		
		changeBackground (targetElement, 'white');
		
		//Removing the element
		//Удаляем летящий элемент	
		dragElement.remove();
		
		//Executing success function. We`ve got it on iniciation
		//Выполняем функцию на успех. Эту функцию мы получили при инициации
		self.succcesFn(dragElement);
		
		//Removing listeners from the mouse
		//Удяляем события с мыши		
		document.onmousemove = null;
		dragElement.onmouseup = null;
		dragParentElement = null;
	} 
	
	var moveAt = function(clientX, clientY) {
		// новые координаты
		var newX = clientX - shiftX;
		var newY = clientY - shiftY;
		
		

		// ------- обработаем вынос за нижнюю границу окна ------
		// новая нижняя граница элемента
		var newBottom = newY + dragElement.offsetHeight;

		// если новая нижняя граница вылезает вовне окна - проскроллим его
		if (newBottom > document.documentElement.clientHeight) {
		  // координата нижней границы документа относительно окна
		  var docBottom = document.documentElement.getBoundingClientRect().bottom;

		  // scrollBy, если его не ограничить - может заскроллить за текущую границу документа
		  // обычно скроллим на 10px
		  // но если расстояние от newBottom до docBottom меньше, то меньше
		  var scrollY = Math.min(newBottom - docBottom, 10);
		  // ошибки округления при полностью прокрученной странице
		  // могут привести к отрицательному scrollY, что будет означать прокрутку вверх
		  // поправим эту ошибку
		  if (scrollY < 0) scrollY = 0;
			window.scrollBy(0, scrollY);

		  // резким движением мыши элемент можно сдвинуть сильно вниз
		  // если он вышел за нижнюю границу документа -
		  // передвигаем на максимально возможную нижнюю позицию внутри документа
		  newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
		}


		// ------- обработаем вынос за верхнюю границу окна ------
		var topPadding = 51;
		if (newY < topPadding) {
		  // проскроллим вверх на 10px, либо меньше, если мы и так в самом верху
		  var scrollYtop = Math.min(-newY, 10);
		  if (scrollYtop < topPadding) scrollYtop = topPadding; // поправим ошибку округления

		  window.scrollBy(topPadding, -scrollYtop);
		  // при резком движении мыши элемент мог "вылететь" сильно вверх, поправим его
		  newY = Math.max(newY, topPadding);
		}

		// зажать в границах экрана по горизонтали
		// здесь прокрутки нет, всё просто
		if (newX < 0) newX = 0;
		if (newX > document.documentElement.clientWidth - dragElement.offsetHeight) {
		  newX = document.documentElement.clientWidth - dragElement.offsetHeight;
		}
		
		
		//Cathing dragElement on targetElement
		//Ловим dragElement над targetElement
		var isInside = {left:false, right: false, top: false, bottom:false};

		if ( targetElement.getBoundingClientRect().bottom > newY + (dragElement.offsetHeight)/2 ) {
		  isInside.bottom = true;
		}
		if ( targetElement.getBoundingClientRect().top < newY + (dragElement.offsetHeight)/2 ) {
		  isInside.top = true;
		}
		if ( targetElement.getBoundingClientRect().left < newX + 60 ) {
		  isInside.left = true;
		}
		if ( targetElement.getBoundingClientRect().right > newX + (dragElement.offsetWidth)/2 ) {
		  isInside.right = true;
		}
		if (isInside.left == true && isInside.right == true && isInside.top == true && isInside.bottom == true) {
			finishDragToTarget();
		}

		//Moving dragElement
		//Перемещаем dragElement
		dragElement.style.left = newX + 'px';
		dragElement.style.top = newY + 'px';
	}
	
	//Changing background of the Element and his Childrens
	//Меняем фон у элемента и его детей	
	var changeBackground = function (e, color) {
		e.style.background = color;
		for (var i = 0; i< e.children.length; i++) {
			e.children[i].style.background = color;
		}
	}
	
});