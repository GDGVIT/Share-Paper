/**
 * Upload.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    regno : {
      type : 'string'
    },
  	courseCode : {
  		type : 'string'
  	},
  	slot : {
  		type : 'string'
  	},
  	noOfImages : {
  		type : 'integer'
  	},
  	imgArr : {
  		type : 'array'
  	},
  	sem : {
  		type : 'string'
  	},
  	year : {
  		type : 'integer'
  	},
    examType : {
      type : 'string'
    }
  }
};

