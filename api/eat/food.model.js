/**
 * Created by khanh on 10/03/2017.
 */
'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var Food = new Schema({
    name: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    guide: {
        type: String,
        require: true
    },
    category: { type: Schema.Types.ObjectId, ref: 'CategoryFood' }
},{
    timestamps: true
});


module.exports = mongoose.model('Food', Food);
