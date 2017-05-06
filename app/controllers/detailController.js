(function (angular) {
	var app = angular.module('app.detailController', []);
	app.controller('detailController', ['$scope','$state','jsonpService', 'host',function ($scope,$state,jsonpService,host) {
		var id = $state.params.id;
		$scope.url = host + 'subject/'+ id;
		jsonpService.jsonp($scope.url,{},function(data){
			$scope.movie = data;
			
			// function getData(dataArr, attr) {
			// 	var dataStr = '';
			// 	dataStr += dataArr.map(function (v) {
			// 		return v[attr];
			// 	})
			// 	// dataStr = dataStr.slice(0, -1);
			// 	return dataStr;	
			// }

			// $scope.directors = getData(data.directors, 'name');
			// $scope.casts = getData(data.casts,'name');
			// console.log(data.casts);
			$scope.directors = data.directors;
			$scope.casts = data.casts;

			$scope.$apply();
		})
	}])

	})(angular)