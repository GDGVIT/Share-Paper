/**
 * UploadController
 *
 * @description :: Server-side logic for managing Uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * @author 		:: Anurag Tiwari (github.com/t2013anurag || tiwari.anurag126@gmail.com)
 */

module.exports = {
	'upload' : function(req, res) {
		var regno = req.param('regno');
		var courseCode = req.param('courseCode');
		var slot = req.param('slot');
		var noOfImages = req.param('noOfImages');
		var sem = req.param('sem');
		var year = req.param('year');
		
		if(regno && courseCode && slot && noOfImages && sem && year) {
			req.file('image')
			.upload({
				dirname : '../../.tmp/public/uploads/' + courseCode + '/' + year + '/' + sem + '/' + slot + '/' + regno,
				maxBytes : 250000000
			}, function whenDone(err, uploadedFiles) {
				if(err || !uploadedFiles) {
					var reply = {
						'status' : 100,
						'message' : 'Please try again later.',
						'err' : err
					};
					console.log("error while uploading" + err);
					res.status(200).json(reply);
				} else {
					var paperArray = [];

					_.each(uploadedFiles, function(paperImage) {
						var image = paperImage;
						var fd = image.fd;
						var index = fd.lastIndexOf('/');
						paperArray.push('/uploads/' + courseCode + '/' + year + '/' + sem + '/' + slot + '/' + regno + '/' + fd.substring(index+1 , fd.length));
					});

					Upload.create({
						'courseCode' : courseCode,
						'slot' : slot,
						'noOfImages' : noOfImages,
						'sem' : sem,
						'year' : year,
						'regno' : regno,
						'imgArr' : paperArray
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
								'courseCode' : courseCode,
								'sem' : sem,
								'year' : year,
								'regno' : regno,
								'imgArray' : paperArray
	 						};
	 						console.log(reply);
	 						res.status(200).json(reply);
						}
					});
				}
			});
		} else {
			var reply = {
				'status' : 99,
				'message' : 'Invalid parameters'
			};
			res.status(200).json(reply);
		}
	},

	'view' : function(req, res) {
		if(req.param('courseCode') && req.param('sem') && req.param('year')) {
			var courseCode = req.param('courseCode');
			var year = req.param('year');
			var sem = req.param('sem');
			
			Upload.find({'courseCode' : courseCode, 'sem' : sem, 'year' : year}).limit(15).exec(function foundPaper(err, papers) {
				if(err) {
					var reply = {
						'status' : 103,
						'message' : 'Unable to load papers'
					};
					res.status(200).json(reply);
				}
				if(!papers || papers.length < 1) {
					var reply = {
						'status' : 104,
						'message' : 'Couldn\'t not find any papers'
					};
					res.status(200).json(reply);
				} else {
					var reply = {
						'status' : 105,
						'message' : 'All papers have been fetched successfully.',
						'papers' : papers
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

	'destroyPaper' : function(req, res) {
		Upload.findOne({'regno' : regno, 'courseCode' : courseCode, 'slot' : slot, 'sem' : sem, 'year' : year}).exec(function findPaper(err, paper) {
			if(err || !paper) {
				var reply = {
					'status'  : 110,
					'message' : 'Could not find the paper'
				};
				res.status(200).json(reply);
			} else {
				Upload.destroy({'id' : paper.id}).exec(function deletePaper(err, paperDeleted) {
					if(err || !paperDeleted) {
						var reply = {
							'status' : 111,
							'message' : 'An error occured while deleting the paper'
						};
						res.status(200).json(reply);
					} else {
						var reply = {
							'status' : 112,
							'message' : 'Successfully deleted the paper.'
						};
						res.status(200).json(reply)
					}
				});
			}
		});
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

