// in_theaters.html中的控制器
// 需要注入数据请求及跨域服务
(function (angular) {
	var app = angular.module('app.movieController',[]);
	
	app.controller('movieController', ['$scope','jsonpService','host','$state','viewCount',function($scope,jsonpService,host,$state,viewCount){

		// 请求数据数据测试-----------------------
		// jsonpService.jsonp($scope.url,{},function (data) {
		// 	console.log(data);
		// })

		// 数据初始化-----------------------
		// 初始化查询的参数对象
		$scope.argObj = {count:viewCount};
		// 如果查询的页面是‘search’页面，获取参数
		if($state.params.movieType==='search'){
			$scope.argObj.q = $state.params.q;
		}
		// 拼接url
		$scope.url = host+= $state.params.movieType;

		// 挂载函数-----------------------
		
		// 分页请求数据，每次请求的是单页的数据
		// 默认加载第一页，在点击上一页/下一页按钮的时候调用jsonp
		
		$scope.showMovieByPage = function (page) {
			if( page < 1 || page > $scope.totalPages ) return;
			// 计算当前页的start：（当前页-1）* viewCount;
			$scope.argObj.start = (page-1)*viewCount;

			// 请求数据
			// 此时的argObj包括3个属性：
			// viewCount: 每次显示的电影数量，已经设置为全局的常量
			// q: 用户输入的搜索关键字，会拼接到url中去，用于搜索匹配
			// start: 当前页第一条电影数据是全部数据中的第几项，即当前页起始数据的索引
			jsonpService.jsonp($scope.url,$scope.argObj,function (data) {
				
				$scope.isShow = false;

				$scope.movies = data.subjects;//包含电影信息的一个数组
				$scope.totalMovies = data.total;//电影总数量

				// 计算总页数
				$scope.totalPages = Math.ceil($scope.totalMovies/viewCount);
				// 当前页数
				$scope.currentPage = page;

				// 只要不是angular的异步操作，就需要调用$apply函数通知更新
				// 否则导航栏需要点两下才会显示页面
				$scope.$apply();
			})
		}

		// 默认加载第一页
		$scope.showMovieByPage(1);
		
	}])

})(angular)