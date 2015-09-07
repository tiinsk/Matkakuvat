var flickrOptions = require("./../flickrauth");

module.exports = function(app, flickr){

	app.get('/api/kohde/:id', function(req, res) {

		flickr.photosets.getPhotos({
			 photoset_id: req.params.id,
			 extras: "url_c, description",
			 user_id: flickrOptions.user_id
		}, function(err, result) {
				if(err) { 
					throw new Error(err); 
				}
			
				var jsonData = result.photoset.photo;

				var imgs=[];
				jsonData.forEach( function(entry){

					var osoite = "https://farm"+entry.farm+".staticflickr.com/"+entry.server+"/"+entry.id+"_"+entry.secret;
					var data = {};
					data.leveys = parseInt(entry.width_c,10);
					data.korkeus = parseInt(entry.height_c,10);
					data.suunta = data.leveys < data.korkeus ? "pysty" : "vaaka";
					data.thumb = osoite+".jpg";
					data.img = osoite+"_b.jpg";
					data.kommentti = entry.description._content;

					imgs.push(data);
				});	
				res.json(imgs);
		});

	});
}

