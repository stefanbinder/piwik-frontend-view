'use strcit';

var Settings = {allSegments: 'test', allPiwikPages: [3,4,5]};

var SettingsCtrl = function($scope) {
    $scope.allSegments 		= Settings.allSegments;
    $scope.allPiwikPages 	= Settings.allPiwikPages;

}

module.exports = SettingsCtrl;