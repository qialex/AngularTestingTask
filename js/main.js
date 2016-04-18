/**
 * AngularJS Testing Task
 * @author Alexander Ishchenko <http://qialex.me>
 * License: MIT 
 */

/**
 * Main AngularJS APP
 */
var app = angular.module('angularTestingApp', [
  'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "templates/partials/home.html", controller: "PageCtrl"})
    // Pages
	.when("/gallery", {templateUrl: "templates/partials/gallery.html"})
    .when("/popup", {templateUrl: "templates/partials/popup.html"})
	.when("/dragNdrop", {templateUrl: "templates/partials/dragndrop.html"})
    .when("/notifications", {templateUrl: "templates/partials/notifications.html"})

    // Else
    .otherwise("/", {templateUrl: "partials/home.html"});

}]);

/**
 * Controller for the main page
 * Контроллер для главной страницы
 */
app.controller('PageCtrl', function(){
	console.log("Расходитесь, тут не на что смотреть");
	
	//All operations are made in Services, Directives and their Controllers
	//Все операции происходят в сервисах, директивах и их контроллерах.
});
