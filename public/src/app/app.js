
angular.module('uiRouterSample', [
    'ui.router', 
    'ui.bootstrap',
    'kohde'
])
.run(
  [        '$rootScope', '$state', '$stateParams', '$location', '$anchorScroll',
  function ($rootScope,   $state,   $stateParams, $location, $anchorScroll) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        
        $rootScope.noscroll = false;
      }]);

angular.module('uiRouterSample')
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

  $scope.latausModaali = false;

  $scope.openLataus = function () {
        $rootScope.noscroll = true;
        $scope.latausModaali = !$scope.latausModaali;
  };


}])
.controller('homeCtrl', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll){

}]);