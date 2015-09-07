
angular.module('Matkakuvia', [
    'ngResource',
    'ui.router', 
    'ui.bootstrap',
    'kohde',
    'kohde.services'
])
.run(
  [        '$rootScope', '$state', '$stateParams', '$location', '$anchorScroll',
  function ($rootScope,   $state,   $stateParams, $location, $anchorScroll) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        
        $rootScope.noscroll = false;
      }]);

angular.module('Matkakuvia')
.config(
    [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: 'src/app/home/home.html',
                controller: 'homeCtrl'
            })
        }
    ]
)

.directive('modalDialog', function($rootScope) {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true,
        transclude: true,
        link: function(scope, element, attrs) {
            scope.dialogStyle = {};
            if (attrs.width)
                scope.dialogStyle.width = attrs.width;
            if (attrs.height)
                scope.dialogStyle.height = attrs.height;
            scope.hideModal = function() {
                scope.show = false;
                $rootScope.noscroll = false;
            };

        },
        templateUrl: 'src/assets/templates/modaltemplate.html' 
    };
})
.controller('appCtrl', ['$scope', '$rootScope', '$location', '$anchorScroll', function($scope, $rootScope, $location, $anchorScroll){

  $scope.loadModal = false;

  $scope.openloading = function () {
        $rootScope.noscroll = true;
        $scope.loadModal = !$scope.loadModal;
  };


}])
.controller('homeCtrl', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll){
    
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