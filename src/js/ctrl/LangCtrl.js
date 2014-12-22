'use strcit';

var LangCtrl = function($scope, $translate) {
	$scope.lang = "de_DE";

    $scope.$watch('lang', function(newval, oldval){
      $translate.use($scope.lang);
    });
    $scope.changeLang = function (key) {
      $scope.lang = key;
    };
}

module.exports = LangCtrl;
