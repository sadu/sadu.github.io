var app = angular.module('hsrcoin', []);
app.controller('root', function($scope) {
    $scope.heading = "hsr.co.in";
	$scope.time = function () {
		return new Date();
	}
});