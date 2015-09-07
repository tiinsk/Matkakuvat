 angular.module('kohde', [
    'ui.router', 
    'ui.bootstrap'])
.config(
    [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

        $stateProvider
            .state("kohde", {
                abstract: true,
                url: "/kohde/:place",
                templateUrl: 'src/app/kohde/kohde.html',
                controller: 'KohdeCtrl'
            })
            .state("kohde.yleista", {
                url: "",
                templateUrl: function ($stateParams){
                    return 'src/app/kohde/' + $stateParams.place + '.html';
                },
            });
    }]
)
.controller('KohdeCtrl', ['$rootScope', '$scope', '$stateParams', '$modal', '$location', '$anchorScroll', '$document', 'KohdeData', 'SizeCalculator', '$window',
    function($rootScope, $scope, $stateParams, $modal, $location, $anchorScroll, $document, KohdeData, SizeCalculator, $window){
    
    (function() {
      $location.hash('ylanavi');
      $anchorScroll();
      $location.hash('');
    }());    

    $scope.toggleShowPhotos = function(index) {
        $scope.isCollapsed = !$scope.isCollapsed;
        $scope.currentImageTab = index;
    };

    $scope.currentImg = KohdeData.data[$stateParams.place];
    $scope.currentImageTab = undefined;
    $scope.numOfColumns = function() {
        return new Array(SizeCalculator.giveColumns());
    };
    $scope.selectedImg = 0;
    $scope.modalShown = false;
    $scope.isCollapsed = true;

    $scope.$watch('currentImageTab', function(newVal, oldVal) {
        if(newVal !== oldVal) {
            KohdeData.initKohde($scope.currentImg.tabs[newVal]);
        }
    });

    angular.element($window).bind('resize', function() {
        if($scope.currentImageTab !== undefined) {
            KohdeData.recalculateSizes($scope.currentImg.tabs[$scope.currentImageTab]);
            $scope.$apply();
        }
    });

    $scope.open = function (selectedImg) {
        $scope.selectedImg = selectedImg;
        $rootScope.noscroll = true;
        $scope.modalShown = !$scope.modalShown;
    };

    $scope.nextimg = function(){
        if( $scope.selectedImg < ( $scope.currentImg.tabs[$scope.currentImageTab].imgs.length -1 )){
            $scope.selectedImg ++;
        }
    };

    $scope.previmg = function(){
        if($scope.selectedImg > 0 ){
            $scope.selectedImg --;
        }
    };

    $scope.showGif = true;

    $document.on('keydown', function(event){
        if (event.which == 39) {
            $scope.nextimg();
            $scope.$apply();
        }
        else if(event.which == 37){
            $scope.previmg();
            $scope.$apply();
        }
        else if(event.which == 27){
            $scope.modalShown = false;
            $rootScope.noscroll = false;
            $scope.$apply();
        }
    });

    $scope.$on('$destroy', function(){
        $document.off('keydown');
    });
}])

.directive('imgPreload', ['$rootScope', function($rootScope) {
    return {
      restrict: 'A',
      scope: {
        ngSrc: '@',
        showGif: '='
      },
      link: function(scope, element, attrs) {
        element.on('load', function() {
          element.removeClass('hide-this');
          scope.showGif = false;
          scope.$apply();
        }).on('error', function() {
          //
        });

        scope.$watch('ngSrc', function(newVal) {          
          element.addClass('hide-this');
          scope.showGif = true;
        });
      }
    };
}]);
