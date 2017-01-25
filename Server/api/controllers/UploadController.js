/**
 * UploadController
 *
 * @description :: Server-side logic for managing Uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'upload' : function(req, res) {
		console.log("Hetre");
		if(req.param('c_cd') && req.param('slot') && req.param('no_of_images') && req.param('img_arr')) {
			var c_cd = req.param('c_cd');
			var slot = req.param('slot');
			var no_of_images = req.param('no_of_images');
			var img_arr = req.param('img_arr');
			console.log( c_cd + slot + no_of_images + img_arr);
			Upload.create({
				'c_cd' : c_cd,
				'slot' : slot,
				'no_of_images' : no_of_images,
				'img_arr' : img_arr
			}, function uploadedPaper(err, paper) {
					if(err) {
						var reply = {
							'status' : 100,
							'message' : 'An error occured while uploading the paper' 
						};
						res.status(200).json(reply);
						return;
					} else {
						var token = req.session.id;
						var reply = {
							'status' : 101,
							'message' : 'Successfully uploaded',
							'c_cd' : paper.c_cd,
							'slot' : paper.slot,
							'no_of_images' : paper.no_of_images,
							'img_arr' : img_arr
						};
						res.status(200).json(reply);
						return;
					}
				});
		} else {
			var reply = {
				'status' : 102,
				'message' : 'All the parameters were not received'
			};
			res.status(200).json(reply);
		}
	}
};

