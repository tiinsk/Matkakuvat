angular.module('Home', [
    'ui.router', 
    'ui.bootstrap'] 
)
.config(
    [          '$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: 'src/app/home/home.html',
                controller: 'homeCtrl'
            })
        }
    ]
)
.controller('homeCtrl', ['$scope', '$location', '$anchorScroll', 'touchService', function($scope, $location, $anchorScroll, touchService){

    $scope.isTouchDevice = touchService.isTouchDevice;

    $scope.hover = {
        hongkong: false,
        taiwan: false,
        vietnam: false,
        kualalumpur: false,
        thaimaa: false,
        singapore: false,
        bali: false
    };

    $scope.hoverText = function(place){
        $scope.hover[place] = true;
    };

    $scope.unHoverText = function(place){
        $scope.hover[place] = false;
    };

}]);