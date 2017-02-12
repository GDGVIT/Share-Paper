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
		var regno = req.param('regno');	
		
		req.file('image')
		.upload({
			dirname : '../../.tmp/public/uploads/' + c_cd + "_" + slot,
			maxBytes : 25000000 
		}, function whenDone(err, uploadedFiles) {
			if(err) {
				var reply = {
					'status' : 100,
					'message' : 'error while uploading'
				};
				console.log("error while uploading" + err)
				res.status(200).json(reply);
			} else {
				// console.log(uploadedFiles.length + " length of total no of images");
				var image_url = [];

				_.each(uploadedFiles, function(image_i) {
					var image = image_i;
					var fd = image.fd;
					var index = fd.lastIndexOf('/');
					image_url.push("/uploads/" + c_cd + "_" + slot + "/" + fd.substring(index+1 , fd.length));
					// console.log(image_url)
				});

				Upload.create({
					'c_cd' : c_cd,
					'slot' : slot,
					'no_of_images' : no_of_images,
					'sem' : sem,
					'year' : year,
					'regno' : regno,
					'img_arr' : image_url
				}, function uploadedPaper(err, paper) {
					if (err) {
						console.log("error in uploadedPaper");
						var reply = {
							'status' : 101,
							'message' : 'Error while updating db'
						};
						res.status(200).json(reply);
					} else {
						var reply = {
							'status' : 102,
							'message' : 'Successfully uploaded the files',
							'slot' : slot,
							'course_code' : c_cd,
							'sem' : sem,
							'year' : year,
							'regno' : regno,
							'images_url' : image_url
 						};
 						console.log(reply);
 						res.status(200).json(reply);
					}
				});
			}
		});
	},

	'view' : function(req, res) {
		if(req.param('c_cd') && req.param('sem') && req.param('year')) {
			var c_cd = req.param('c_cd');
			var year = req.param('year');
			var sem = req.param('sem');
			console.log('c_cd = ' + c_cd + "\nsem = " + sem + " year = " + year)
			
			Upload.find({'c_cd' : c_cd, 'sem' : sem, 'year' : year}).limit(15).exec(function foundPaper(err, paper) {
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
	},

	'viewByRegno' : function(req, res) {
		var regno = req.param('regno');
		Upload.find({'regno' : regno}).exec(function foundPapers(err, papers) {
			if(err || !papers) {
				var reply = {
					'status' : 107,
					'message' : 'Error occured while fetching the papers'
				};
				res.status(200).json(reply);
			} else if(papers.length < 1) {
				var reply = {
					'status' : 108,
					'message' : 'No papers have been uploaded by you yet.'
				};
				res.status(200).json(reply);
			} else {
				var reply = {
					'status' : 109,
					'message' : 'All papers fetched successfully',
					'papers' : papers
				};
				res.status(200).json(reply);
			}
		});
	}
};

