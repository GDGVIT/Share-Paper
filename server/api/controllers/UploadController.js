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
		// var img_arr = req.param('img_arr');
		var sem = req.param('sem');
		var year = req.param('year');
		var avatar_url = require('util').format("%s/%s/%s/%s/%s", sails.getBaseUrl(), c_cd, slot, sem, year);
		
		console.log( "c_cd =" + c_cd + "\nslot = " + slot + "\nno_of_images = " + no_of_images);
		console.log(avatar_url);
		
		// res.setTimeout(0);
		
		req.file('image1')
		.upload({
			dirname : '../../assets/images/' + c_cd + "_" + slot,
			// saveAs : 'avatar',
			// maxBytes : 1000000 
		}, function whenDone(err, uploadedFiles) {
			console.log("inside upload method")
			if(err) {
				var reply = {
					'status' : 100,
					'message' : 'error while uploading'
				};
				res.status(200).json(reply);
			} else {
				Upload.create({
					'c_cd' : c_cd,
					'slot' : slot,
					'no_of_images' : no_of_images,
					'sem' : sem,
					'year' : year,
					'image_arr' : avatar_url
				}, function uploadedPaper(err, paper) {
					if (err) {
						var reply = {
							'status' : 101,
							'message' : 'Error while updating db'
						};
						res.status(200).json(reply);
						return;
					} else {
						var reply = {
							'status' : 102,
							'message' : 'Successfully uploaded the files',
							'slot' : slot,
							'course_code' : c_cd,
							'sem' : sem,
							'year' : year,
							'images_url' : avatar_url
 						};
 						console.log(reply);
 						res.status(200).json(reply);
 						return;
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

		// req.file('image2').upload(function (err, uploadedFiles){
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
			
		//  }
		// });
		// res.status(200).json(reply);
		// res.status(200).json(reply);
		// if(req.param('c_cd') && req.param('slot') && req.param('no_of_images') && req.param('img_arr') && req.param('sem') && req.param('year')) {
		// 	var c_cd = req.param('c_cd');
		// 	var slot = req.param('slot');
		// 	var no_of_images = req.param('no_of_images');
		// 	var img_arr = req.param('img_arr');
		// 	var sem = req.param('sem');
		// 	var year = req.param('year');
		// 	console.log( "c_cd =" + c_cd + "\nslot = " + slot + "\nno_of_images = " + no_of_images + "\nimg_arr = " + img_arr);
		// 	Upload.create({
		// 		'c_cd' : c_cd,
		// 		'slot' : slot,
		// 		'no_of_images' : no_of_images,
		// 		'img_arr' : img_arr,
		// 		'sem' : sem,
		// 		'year' : year
		// 	}, function uploadedPaper(err, paper) {
		// 			if(err) {
		// 				var reply = {
		// 					'status' : 100,
		// 					'message' : 'An error occured while uploading the paper' 
		// 				};
		// 				res.status(200).json(reply);
		// 				return;
		// 			} else {
		// 				var token = req.session.id;
		// 				var reply = {
		// 					'status' : 101,
		// 					'message' : 'Successfully uploaded',
		// 					'c_cd' : paper.c_cd,
		// 					'slot' : paper.slot,
		// 					'no_of_images' : paper.no_of_images,
		// 					'img_arr' : img_arr,
		// 					'sem' : sem,
		// 					'year' : year
		// 				};
		// 				res.status(200).json(reply);
		// 				return;
		// 			}
		// 		});
		// } else {
		// 	var reply = {
		// 		'status' : 102,
		// 		'message' : 'All the parameters were not received'
		// 	};
		// 	res.status(200).json(reply);
		// }
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

