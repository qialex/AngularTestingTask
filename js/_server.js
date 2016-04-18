/**
 * AngularJS Testing Server
 * @author Alexander Ishchenko <http://qialex.me>
 * License: MIT 
 */

var phrazes = [
	'Вы ранее привлекались за хранение данных в глобальных переменных?',
	'Какой результат выполнения команды git push me and then just touch me till I can get my satisfaction, satisfaction?',
	'Найдите точку G бинарным поиском',
	'Назовите свою любимую позу для стендап митинга',
	'Вы когда-нибудь делали .Net за деньги?',
	'Вы способны довести девушку до оргазма языком программирования?',
	'Сформулируйте зависимость времени исправления критического бага от seniority присутствующего менеджера',
	'В своём резюме вы указали знание php. вам не стыдно?',
	'Почему люк скайуокер круглый?',
	'Какой из циклов быстрее, for, while или правило буравчика?',
	'Обоснуйте полноту Javascript по Тьюрингу с позиций фрейдистской школы программирования',
	'Перед вами кисть, холст и мольберт. напишите компилятор',
	'Расскажите что-нибудь про Pascal',
	'Расскажите о плюсах и минусах автокомплита в сексе',
	'Как часто вы говорите своему коду "ну пожалуйста.."?',
	'Перестаньте краснеть и хихикать! повторяем вопрос: "вы когда-нибудь ранее использовали LaTeX?"',
	'У кого был самый длинный код в вашей прошлой команде?',
	'Вы моете руки перед правкой кода на продакшне?',
	'Что вызывает у вас бóльшую улыбку: "I have read and agree to the terms and conditions" или подпись под соглашением о неразглашении?',
	'В резюме указано, что ваша последняя должность — delivery manager... вы пиццу что ли разносили?',
	'Вас раньше обвиняли в попытках программирования?',
	'Ну признайтесь уже — джаваскрипт алертами дебажили?',
	'Можете ли вы провести аналогию между работой на пятилетнем проекте и проктологией?',
	'Что, по-вашему мнению, более эффективно: скопипастить код из примеров или убедить заказчика, что ему не нужна эта фича?',
	'push —force, checkout — а какие еще способы разрешения конфликтов вы знаете?',
	'Если честно, то нас немного смущает тот факт, что вы искали работу программиста через биржу труда...',
	'Согласны ли вы что каждый девелопер должен посадить зрение, построить велосипед и вырастить репозиторий?',
	'В своем резюме вы указали, что хотели бы поработать на интересном проекте... вы этот проект с собой принесли?',
	'Правда ли, что смесь php, css, js, html и sql в одном файле имеет слабительный эффект?',
	'Согласны ли вы, что у админа должна быть борода, даже если админ — женщина?',
	'Скажите, вы когда-нибудь симулировали ООП?',
	'Умеете ли вы "договариваться" с QA накануне релиза?',
	'Каким вы видите свой код через пять лет?',
	'Раскройте геополитические предпосылки kernel panic с точки зрения теории струн.',
	'Xbox, PlayStation или Terminal — какую консоль предпочитаете?',
	'Вас когда-нибудь запирали в серверной? За что?',
	'Какие приемущества force push перед стандартной работой с репозиторием? сколько времени данная методика экономит лично вам?',
	'2048 или “Косынка” — в чём вы более успешны?',
	'Скажите честно, вы врёте в LinkedIn?',
	'По каким внешним признакам разработчика можно определить длину спринта?',
	'Вы толерантны к копипастам?',
	'"Семь раз update один раз commit" или "семь раз commit один раз revert" - какой методологии вы придерживаетесь?',
	'Цикл, условие, переменная — а какие еще термины из С++ вы знаете, чтобы отказать парню?',
	'Цой, Ленин, PHP — что между ними общего?',
	'Как объяснить джуниору что пинговать сервера в его возрасте – это нормально?',
	'Назовите самое экстремальное место в котором вы занимались багфиксингом',
	'Напишите простейшую операционную систему. уложитесь в 140 символов',
	'Как часто вы играете со шрифтами?',
	'В резюме сказано, что вы проработали 10 лет в отделе тестирования майкрософт. мы проверили - такого отдела не существует!',
	'Как вы относитесь к легализации курения мануалов?'
];

//console.log (phrazes);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_phrase(used_phrases){ 
	if (used_phrases.length == 49) {
		used_phrases.sort();
		console.log (used_phrases);
		return getRandomInt(0, 999999).toString();
	}
	
	var number = getRandomInt(0, 49);
	
	for (var i=0; i<used_phrases.length; i++) {
		if (number == used_phrases[i]) {
			number = false;
			break;
		}
	}
	
	var newid = true;
	if (number == false) {
		for (var i=0; i<phrazes.length; i++) {
			newid = true;
			
			for (var j=0; j<used_phrases.length; j++) {
				if (i == used_phrases[j]) {
					newid = false;
				}
			}
			
			if (newid == true) {
				number = i;
				break;
			}
		}
	}
	
	used_phrases.push(number);
	
	return phrazes[number];
}


//var http = require('http');
//var Static = require('node-static');
var WebSocketServer = new require('ws');

// подключенные клиенты
var clients = {};

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({port: 8081});
webSocketServer.on('connection', function(ws) {


	var id = Math.random();
	clients[id] = ws;
	ws.send((id.toString()).slice(2));
	//console.log("новое соединение " + id);
  
	var count = 0;
	for(var key in clients) {
		count++;
	}
	for(var key in clients) {
		clients[key].send("CHAT:count:" + count);
	}
	
	ws.on('message', function(message) {
		//console.log('получено сообщение ' + message);
		for(var key in clients) {
			clients[key].send("CHAT:" + message/*.split("").reverse().join("")*/);
		}
	});

	ws.on('close', function() {
		//console.log('соединение закрыто ' + id);
		delete clients[id];
	});

	ws.on('open', function() {
		//console.log('соединение установлено ' + id);
		delete clients[id];
	});  
  
	//Sending phrases
	//Отправляем фразы
	function sendMesages(used_phrases) {
		setTimeout(function () {
			ws.send(get_phrase(used_phrases));
			sendMesages(used_phrases);
		}, 5000);
	}
	var used_phrases = [];
	sendMesages(used_phrases);

});
