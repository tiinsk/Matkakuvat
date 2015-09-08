angular.module('kohde.services', [])
	.service('KohdeService', ['$resource', function($resource) {
		return $resource('/api/kohde/:id', {
			id: 'id'
		});
	}])
	.service('KohdeData', ['KohdeService', 'SizeCalculator', 
		function(KohdeService, SizeCalculator) {
		this.data = {
	        hongkong: {
	            tabs:[
	                {   'name': 'Kuvat',
	                    'id': '72157647347434231',
	                    'thumbnailcss': {
	                        'background-image': 'url(https://farm4.staticflickr.com/3846/14988689380_d57ed3cd85_b.jpg)',
	                        'background-size': '200% auto',
	                        'background-position-x': '68%',
	                        'background-position-y': '0%'
	                    },
	                    'color': 'blue',
	                    'imgs': []
	                }
	            ], 
	            heading: "Hong Kong"
	        },

	        kualalumpur: {
	            tabs:[
	                {   'name': 'Kuvat',
	                    'id': '72157646948130087',
	                    'thumbnailcss': {
	                        'background-image': 'url(https://farm6.staticflickr.com/5592/14988894947_bf8e14759a_b.jpg)',
	                        'background-size': '150% auto',
	                        'background-position': '74% 0%'
	                    },
	                    'color': 'yellow',
	                    'imgs': []
	                }
	            ], 
	            heading: "Kuala Lumpur"
	        },
	        singapore: {
	            tabs:[
	                {   'name': 'Kuvat 1',
	                    'id': '72157646955228660',
	                    'thumbnailcss': {
	                        'background-image': 'url(https://farm6.staticflickr.com/5591/14990233510_c9dfd43e37_b.jpg)',
	                        'background-size': '100% auto',
	                        'background-position': '0% 0%'
	                    },
	                    'color': 'blue',
	                    'imgs': []
	                },
	                {   'name': 'Kuvat 2',
	                    'id': '72157649089973639',
	                    'thumbnailcss': {
	                        'background-image': 'url(https://farm8.staticflickr.com/7463/15896891805_87c9159442_b.jpg)',
	                        'background-size': '150% auto',
	                        'background-position': '86% 0%'
	                    },
	                    'color': 'yellow',
	                    'imgs': []
	                },
	                {   'name': 'Kuvat 3',
	                    'id': '72157650042663762',
	                    'thumbnailcss': {
	                        'background-image': 'url(https://farm8.staticflickr.com/7520/15979276849_6ca83072c9_b.jpg)',
	                        'background-size': '180% auto',
	                        'background-position': '41% 0%'
	                    },
	                    'color': 'red',
	                    'imgs': []
	                }
	            ], 

	            heading: "Singapore"
	        },
	        vietnam: {
	            tabs:[
	                {   'name': 'Hanoi',
	                    'id': '72157648100774996',
	                    'thumbnailcss': {
	                        'background-image': 'url(https://farm4.staticflickr.com/3926/15388186665_982c4f79bb_b.jpg)',
	                        'background-size': '170% auto',
	                        'background-position': '61% 0%'
	                    },
	                    'color': 'red',
	                    'imgs': []
	                },
	                {   'name': 'Ha Long Bay',
	                    'id': '72157648165379855',
	                    'thumbnailcss': {
	                        'background-image': 'url(https://farm3.staticflickr.com/2945/15201539428_8f9c9d7579_b.jpg)',
	                        'background-size': '150% auto',
	                        'background-position': '0% 0%'
	                    },
	                    'color': 'blue',
	                    'imgs': []
	                },
	                {   'name': 'Ho Chi Minh City',
	                    'id': '72157647743687219',
	                    'thumbnailcss': {
	                        'background-image': 'url(https://farm3.staticflickr.com/2950/15365239806_f720ab3ac1_b.jpg)',
	                        'background-size': '150% auto',
	                        'background-position': '78% 0%'
	                    },
	                    'color': 'yellow',
	                    'imgs': []
	                }
	            ], 
	            heading: "Vietnam"
	        },
	        
	        bali: {
	            tabs:[
	                {   'name': 'Kuvat',
	                    'id': '72157649094733430',
	                    'thumbnailcss': {
	                        'background-image': 'url(https://farm9.staticflickr.com/8665/15894939141_d42f74e697_b.jpg)',
	                        'background-size': '150% auto',
	                        'background-position': '38% 0%'
	                    },
	                    'color': 'yellow',
	                    'imgs': []
	                }
	            ], 
	            heading: "Bali"
	        },


	        taiwan: {
	            tabs:[
	                {   'name': 'Kuvat',
	                    'id': '72157649638332797',
	                    'thumbnailcss': {
	                        'background-image': 'url(https://farm8.staticflickr.com/7542/15979276437_e5cb8aac97_b.jpg)',
	                        'background-size': '150% auto',
	                        'background-position': '23% 0%',
	                    },
	                    'color': 'yellow',
	                    'imgs': []
	                }
	            ], 
	            heading: "Taiwan"
	        },


	        thaimaa: {
	            tabs:[
	                {   'name': 'Kuvat',
	                    'id': '72157649644153710',
	                    'thumbnailcss': {
	                        'background-image': 'url(https://farm8.staticflickr.com/7566/15543191594_4aa86807be_b.jpg)',
	                        'background-size': '180% auto',
	                        'background-position': '0% 50%'
	                    },
	                    'color': 'yellow',
	                    'imgs': []
	                }
	            ], 
	            heading: "Thaimaa"
	        }
	    };

	    this.initKohde = function(group) {
	    	KohdeService.query({id: group.id}, function(imgs) {
	    		group.imgs = SizeCalculator.calculateSizes(imgs);
	    	});
	    }
	    this.recalculateSizes = function(group){
	    	group.imgs = SizeCalculator.calculateSizes(group.imgs);
	    }
	}])
	.factory('SizeCalculator', ['$window', function($window) {
		function giveColumns() {
			var wWidth = $window.innerWidth;
			return wWidth > 1300 ? 4 : wWidth > 900 ? 3 : 2;
		}


		function calculateSizes(images){
			var wWidth = $window.innerWidth;

		    var numOfColumns = giveColumns();
		    for (var i = 0; i < images.length; i+= numOfColumns) {
		            if (images.length-i >= numOfColumns ) {

		                var med = 0;
		                for (var j = 0; j < numOfColumns; j++) {
		                    med += images[i+j].korkeus;
		                };
		                med /= numOfColumns;
		                var sumWidth = 0;

		                for (var j = 0; j < numOfColumns; j++) {
		                    var width = images[i+j].leveys*med/images[i+j].korkeus;
		                    images[i+j].newWidth = width;
		                    sumWidth += width;
		                    //images[i+j].newHeight = med;
		                };

		                //var scaleFactor = (wWidth * 0.65)/sumWidth;
		                var x = (98.4/(sumWidth))*1000;
		                for (var j = 0; j < numOfColumns; j++) {
		                    //images[i+j].scaledWidth = images[i+j].newWidth*scaleFactor;
		                    //images[i+j].scaledHeight = images[i+j].newHeight*scaleFactor;
		                    images[i+j].percentageWidth = Math.floor(images[i+j].newWidth*x)/1000;
		                };

		            } else {

		                var med = 0;

		                for (var j = 0; j < images.length-i; j++) {
		                    med += images[i+j].korkeus;
		                };
		                med /= images.length-i;
		                var sumWidth = 0;
		               
		                for (var j = 0; j < images.length-i; j++) {
		                    var width = images[i+j].leveys*med/images[i+j].korkeus;
		                    images[i+j].newWidth = width;
		                    sumWidth += width;
		                    //images[i+j].newHeight = med;
		                };

		                //scaleFactor = (((wWidth * 0.65)/(images.length-i))*(images.length-i))/sumWidth;
						var x = ((98.4/numOfColumns)*(images.length-i)/sumWidth)*1000;
		                for (var j = 0; j < images.length-i; j++) {
		                    //images[i+j].scaledWidth = images[i+j].newWidth*scaleFactor;
		                    //images[i+j].scaledHeight = images[i+j].newHeight*scaleFactor;
		                    images[i+j].percentageWidth = Math.floor(images[i+j].newWidth*x)/1000;
		                };
		            }
		        }
		        
		        return images;
		};

		return	{
			calculateSizes: calculateSizes,
			giveColumns: giveColumns
		};
	}]);