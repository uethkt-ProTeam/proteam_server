/**
 * Created by khanh on 10/03/2017.
 */
'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var CategoryExercise = new Schema({
    name: {
        type: String,
        require: true
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
},{
    timestamps: true
});


module.exports = mongoose.model('CategoryExercise', CategoryExercise);
