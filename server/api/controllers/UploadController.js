/**
 * UploadController
 *
 * @description :: Server-side logic for managing Uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'upload' : function(req, res) {

		var c_cd = req.param('c_cd');
		var slot = req.param('slot');
		var no_of_images = req.param('no_of_images');
		var sem = req.param('sem');
		var year = req.param('year');
		console.log( "c_cd =" + c_cd + "\nslot = " + slot + "\nno_of_images = " + no_of_images);

		// res.setTimeout(0);
		
		req.file('image')
		.upload({
			dirname : '../../.tmp/public/uploads/' + c_cd + "_" + slot,
			// saveAs : 'avatar',
			maxBytes : 1000000 
		}, function whenDone(err, uploadedFiles) {
			// console.log("inside upload method")
			if(err) {
				var reply = {
					'status' : 100,
					'message' : 'error while uploading'
				};
				console.log("error while uploading" + err)
				res.status(200).json(reply);
				// return;
			} else {
				// console.log("Inside method create");
				// console.log("img_arr = " + avatar_url);
				// console.log(uploadedFiles);
				var image = uploadedFiles[0];
				console.log(uploadedFiles.length + " length of total no of images");
				var fd = image.fd;
				var index = fd.lastIndexOf('/');
				var image_url = "/uploads/" + c_cd + "_" + slot + "/" + fd.substring(index+1 , fd.length);
				Upload.create({
					'c_cd' : c_cd,
					'slot' : slot,
					'no_of_images' : no_of_images,
					'sem' : sem,
					'year' : year,
					'img_arr' : image_url
				}, function uploadedPaper(err, paper) {
					// console.log("inside uploadedPaper")
					if (err) {
						console.log("error in uploadedPaper");
						var reply = {
							'status' : 101,
							'message' : 'Error while updating db'
						};
						res.status(200).json(reply);
						// return;
					} else {
						// console.log("La st in here");
						var reply = {
							'status' : 102,
							'message' : 'Successfully uploaded the files',
							'slot' : slot,
							'course_code' : c_cd,
							'sem' : sem,
							'year' : year,
							'images_url' : image_url
 						};
 						console.log(reply);
 						res.status(200).json(reply);
 						// return;
					}
				});
			}
		});

		// req.file('image1').upload(function (err, uploadedFiles){
		// if (err) {
		// 	console.log(err);
		// }
		//   // return res.json({
		//   //   message: files.length + ' file(s) uploaded successfully!',
		//   //   files: files
		//   // });
		//  else {
		//  	console.log(uploadedFiles);
		// 	var reply = {
		// 		'status' : 100,
		// 		'message' : 'Sent'
		// 	}; 
		// 	// res.status(200).json(reply);
		//  }
		// });
	},

	'view' : function(req, res) {
		if(req.param('c_cd') && req.param('slot') && req.param('sem')) {
			var c_cd = req.param('c_cd');
			var slot = req.param('slot');
			var sem = req.param('sem');
			console.log('c_cd = ' + c_cd + "\nslot = " + slot)
			Upload.find({'c_cd' : c_cd, 'slot' : slot, 'sem' : sem}).limit(5).exec(function foundPaper(err, paper) {
				if(err) {
					var reply = {
						'status' : 103,
						'message' : 'Unable to load papers'
					};
					res.status(200).json(reply);
				}
				if(!paper || paper.length < 1) {
					var reply = {
						'status' : 104,
						'message' : 'Couldn\'t not find any paper'
					};
					res.status(200).json(reply);
				} else {
					var reply = {
						'status' : 105,
						'message' : 'All papers have been fetched successfully.',
						'paper' : paper
					};
					res.status(200).json(reply);
				}
			});
		} else {
			var reply = {
				'status' : 106,
				'message' : 'All parameters were not received.'
			};
			res.status(200).json(reply);
		}
	}
};

