/**
 * Upload.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	c_cd : {
  		type : 'string'
  	},
  	slot : {
  		type : 'string'
  	},
  	no_of_images : {
  		type : 'int'
  	},
  	img_arr : {
  		type : 'array'
  	}
  }
};

