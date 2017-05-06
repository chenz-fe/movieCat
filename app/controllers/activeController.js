// 该控制器用于激活导航样式
(function (angular) {
	var app = angular.module('app.activeController',[]);
	app.controller('activeController',['$scope', '$location', function ($scope, $location) {
		// 由于监视范围只能是$scope的属性，所以需要声明一个属性，
		// 将这个$scope的属性指针指向$location对象的内存空间
		$scope.location = $location;
		// 默认激活导航样式为首页
		$scope.selectedNum = 1;
		// 监视导航url变化，来进行样式的变化
		$scope.$watch('location.url()', function (newV, oldV) {
			switch(newV){
				case '/home_page':
				$scope.selectedNum = 1;
				break;
				case '/in_theaters/':
				$scope.selectedNum = 2;
				break;
				case '/coming_soon/':
				$scope.selectedNum = 3;
				break;
				case '/top250/':
				$scope.selectedNum = 4;
				break;
			}
		})
	
	}])

})(angular)