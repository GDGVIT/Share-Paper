/**
 * ServerAnalyticsController
 *
 * @description :: Server-side logic for managing Serveranalytics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	'countUniqueUsers' : function(req, res) {
		Upload.native(function(err, collection){
			if(err || !collection) {
				var reply = {
					'status' : 1400,
					'message' : 'Could not find the collection'
				};
				res.status(200).json(reply);
			} else {			
				collection.distinct('regno', function(err, users){
					if(err || !users) {
						var reply = {
							'status' : 1401,
							'message' : 'An error ocurred while fetching the users'
						};
						res.status(200).json(reply);
					} else {
						var reply = {
							'status' : 1402,
							'message' : 'All users fetched',
							'users' : users
						};
						res.status(200).json(reply);
					}
				});
			}
		});
	}
};

