/**
 * Created by khanh on 10/03/2017.
 */
'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var CategoryFood = new Schema({
    name: {
        type: String,
        require: true
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'Food' }]
},{
    timestamps: true
});


module.exports = mongoose.model('CategoryFood', CategoryFood);
