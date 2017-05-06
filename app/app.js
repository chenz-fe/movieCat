(function (angular) {
	var app = angular.module('moviecat',['ui.router', 'app.jsonp','app.movieController','app.mainController','app.activeController','app.detailController']);

	// 声明全局变量----------
	// 声明全局变量的两种方式：app.constant('name', value) || app.value('name', value);

	// url通用部分
	app.value('host','http://api.douban.com/v2/movie/')

	// 每页显示条数
	app.constant('viewCount', 20)

	// 配置路由----------
	app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('home_page');

		$stateProvider.state('home_page', {
			url:'/home_page',
			templateUrl: 'views/home_page/home_page.html'
		})
		// .state('in_theaters',{
		// 	url: '/in_theaters',
		// 	templateUrl:'views/in_theaters/in_theaters.html',
		// 	controller: 'movieController'
		// })
		// .state('coming_soon',{
		// 	url: '/coming_soon',
		// 	templateUrl:'views/coming_soon/coming_soon.html'
		// })
		// .state('top250',{
		// 	url: '/top250',
		// 	templateUrl:'views/top250/top250.html'
		// })
		// 完成路由通配与代码合并
		.state('in_theaters',{
			url: '/:movieType/:q',
			templateUrl:'views/in_theaters/in_theaters.html',
			controller: 'movieController'
		})
		// 电影详情页
		.state('detail',{
			url: '/subject/:id',
			templateUrl: 'views/detail/detail.html',
			controller: 'detailController'
		})
	}])

	// 自定义指令
	app.directive('appProcess', function () {
		return {
			templateUrl:'views/common/process.html',
			link: function (scope,ele,attrs) {
				scope.isShow = true;
			}
		}
	})

})(angular);