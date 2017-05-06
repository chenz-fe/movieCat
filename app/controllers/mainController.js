// main控制器，也就是主页的搜索按钮
(function (angular) {
	var app = angular.module('app.mainController',[]);

	app.controller('mainController', ['$scope', '$state', function ($scope,$state) {
		$scope.search = function (q) {
			$state.go('in_theaters', {movieType: 'search', q:q})
		}
	}])

})(angular)