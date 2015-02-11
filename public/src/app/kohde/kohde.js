 angular.module('kohde', [
    'ui.router', 
    'ui.bootstrap'])
.config(
    [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

        $stateProvider
            .state("kohde", {
                abstract: true,
                url: "/kohde/:paikka",
                templateUrl: 'src/app/kohde/kohde.html',
                controller: 'KohdeCtrl'
            })
            .state("kohde.yleista", {
                url: "",
                templateUrl: function ($stateParams){
                    return 'src/app/kohde/' + $stateParams.paikka + '.html';
                },
            })
            .state("kohde.kuvat", {
                url: "/:nimi",
                templateUrl: 'src/app/kohde/kuvat.html',
                controller: "RyhmaCtrl"
            });
        }
    ]
)
.controller('KohdeCtrl', ['$rootScope', '$scope', '$http', '$stateParams', '$modal', '$log', '$location', '$anchorScroll', function($rootScope, $scope, $http, $stateParams, $modal, $log, $location, $anchorScroll){
    $scope.meneYlos = function() {

      $location.hash('ylanavi');
      $anchorScroll();
      $location.hash('');
    };



    data = {
        hongkong: {
            ryhmat:{
                'Kuvat': '72157647347434231'
            }, 
            heading: "Hong Kong",
            imgs: []
        },
        kualalumpur: {
            ryhmat:{
                'Kuvat': '72157646948130087'
            }, 
            heading: "Kuala Lumpur",
            imgs:[]
        },
        singapore: {
            ryhmat:{
                'Kuvat 1': '72157646955228660',
                'Kuvat 2': '72157649089973639',
                'Kuvat 3': '72157650042663762',

                
            }, 
            heading: "Singapore",
            imgs:[]
        },
        vietnam: {
            ryhmat:{
                'Hanoi': '72157648100774996',
                'Ha Long Bay': '72157648165379855',
                'Ho Chi Minh City': '72157647743687219',
            },
            heading: "Vietnam",
            imgs:[]
        },
        
        bali: {
            ryhmat:{
                'Kuvat': '72157649094733430',
            },
            heading: "Bali",
            imgs:[]
        },


        taiwan: {
            ryhmat:{
                'Kuvat': '72157649638332797',
            },
            heading: "Taiwan",
            imgs:[]
        },


        thaimaa: {
            ryhmat:{
                'Kuvat': '72157649644153710',
            },
            heading: "Thaimaa",
            imgs:[]
        }

    }

    $scope.nykyinen = data[$stateParams.paikka];

}])
.controller('RyhmaCtrl', ['$rootScope', '$scope', '$http', '$stateParams', '$modal', '$document', function($rootScope, $scope, $http, $stateParams, $modal, $document){

    $scope.nykyinen.imgs = [];
    
    $http.get('/api/kohde/' + $scope.nykyinen.ryhmat[$stateParams.nimi])
    .success(function(flickr_data){

        for (var i = 0; i < flickr_data.length; i+=4 ) {
            if (flickr_data.length-i > 3 ) {
                var med = (flickr_data[i].korkeus + flickr_data[i+1].korkeus + flickr_data[i+2].korkeus +flickr_data[i+3].korkeus)/4;
                var ul1 = flickr_data[i].leveys*med/flickr_data[i].korkeus;
                var ul2 = flickr_data[i+1].leveys*med/flickr_data[i+1].korkeus;
                var ul3 = flickr_data[i+2].leveys*med/flickr_data[i+2].korkeus;
                var ul4 = flickr_data[i+3].leveys*med/flickr_data[i+3].korkeus;

                var x = (99.2/(ul1+ul2+ul3+ul4))*1000;
                flickr_data[i].prosentti = Math.floor(ul1*x)/1000;
                flickr_data[i+1].prosentti = Math.floor(ul2*x)/1000;
                flickr_data[i+2].prosentti = Math.floor(ul3*x)/1000;
                flickr_data[i+3].prosentti = Math.floor(ul4*x)/1000;

            }
            else if (flickr_data.length-i > 2 ) {
                var med = (flickr_data[i].korkeus + flickr_data[i+1].korkeus + flickr_data[i+2].korkeus)/3;
                var ul1 = flickr_data[i].leveys*med/flickr_data[i].korkeus;
                var ul2 = flickr_data[i+1].leveys*med/flickr_data[i+1].korkeus;
                var ul3 = flickr_data[i+2].leveys*med/flickr_data[i+2].korkeus;

                var x = (99.4/(ul1+ul2+ul3))*1000;
                flickr_data[i].prosentti = Math.floor(ul1*x)/1000;
                flickr_data[i+1].prosentti = Math.floor(ul2*x)/1000;
                flickr_data[i+2].prosentti = Math.floor(ul3*x)/1000;
            }
            else if (flickr_data.length-i > 1 ) {
                var med = (flickr_data[i].korkeus + flickr_data[i+1].korkeus)/2;
                var ul1 = flickr_data[i].leveys*med/flickr_data[i].korkeus;
                var ul2 = flickr_data[i+1].leveys*med/flickr_data[i+1].korkeus;

                var x = (99.6/(ul1+ul2))*1000;
                flickr_data[i].prosentti = Math.floor(ul1*x)/1000;
                flickr_data[i+1].prosentti = Math.floor(ul2*x)/1000;
            }
            else if (flickr_data.length-i > 0 ) {
                flickr_data[i].prosentti = 30;
            }
        }

        $scope.nykyinen.imgs = flickr_data;
    });

    $scope.valittuKuva = 0;

    $scope.modalShown = false;

    $scope.open = function (valittuKuva) {
        $scope.valittuKuva = valittuKuva;
        $rootScope.noscroll = true;
        $scope.modalShown = !$scope.modalShown;
    };

    $scope.nextimg = function(){
        if( $scope.valittuKuva < ( $scope.nykyinen.imgs.length -1 )){
            $scope.valittuKuva += 1;
        }
    };

    $scope.previmg = function(){
        if($scope.valittuKuva > 0 ){
            $scope.valittuKuva -= 1;
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
    })

}]).directive('imgPreload', ['$rootScope', function($rootScope) {
    return {
      restrict: 'A',
      scope: {
        ngSrc: '@',
        showGif: '='
      },
      link: function(scope, element, attrs) {
        element.on('load', function() {
          element.removeClass('piilota');
          scope.showGif = false;
          scope.$apply();
        }).on('error', function() {
          //
        });

        scope.$watch('ngSrc', function(newVal) {          
          element.addClass('piilota');
          scope.showGif = true;
        });
      }
    };
}]);
