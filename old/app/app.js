(function (angular) {
	var app = angular.module('moviecat',['ui.router']);

// app.constant('name', value)


	app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('home_page');
		$stateProvider.state('home_page', {
			url:'/home_page',
			templateUrl: 'views/home_page/home_page.html'
		})
		.state('in_theaters',{
			url: '/in_theaters',
			templateUrl:'views/in_theaters/in_theaters.html'
		})
		.state('coming_soon',{
			url: '/coming_soon',
			templateUrl:'views/coming_soon/coming_soon.html'
		})
		.state('top250',{
			url: '/top250',
			templateUrl:'views/top250/top250.html'
		})
	}])

	app.controller('name', ['', function(){
		
	}])
    

    


})(angular);