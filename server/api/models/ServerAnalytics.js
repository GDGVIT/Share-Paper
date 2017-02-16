/**
 * ServerAnalytics.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	totalServerCalls : {
      type : 'integer',
      defaultsTo : 0
    },
  	validServerCalls : {
  		type : 'integer',
  		defaultsTo : 0
  	},
  	invalidServerCalls : {
  		type : 'integer',
  		defaultsTo : 0
  	},
  	serverCrashesCount : {
  		type : 'integer',
  		defaultsTo : 0
  	},
  	uploadRequests : {
  		type : 'integer',
  		defaultsTo : 0
  	},
  	downloadRequests : {
  		type : 'integer',
  		defaultsTo : 0
  	},
  	noOfUsers : {
  		type : 'integer',
  		defaultsTo : 0
  	}
  }
};

