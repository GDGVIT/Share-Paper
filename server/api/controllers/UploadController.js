/**
 * UploadController
 *
 * @description :: Server-side logic for managing Uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'upload' : function(req, res) {
		// var image = req.file('image');
		// console.log(image);
		// var reply = {
		// 	'status' : 100,
		// 	'message' : 'Sent'
		// };
		console.log(req.file('image'));
		req.file('image').upload(function (err, uploadedFiles){
		if (err) {
			console.log(err);
		}
		  // return res.json({
		  //   message: files.length + ' file(s) uploaded successfully!',
		  //   files: files
		  // });
		 else {
		 	console.log(uploadedFiles);
			var reply = {
				'status' : 100,
				'message' : 'Sent'
			}; 
			res.status(200).json(reply);
		 }
		});
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

