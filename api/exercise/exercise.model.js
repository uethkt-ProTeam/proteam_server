/**
 * Created by khanh on 10/03/2017.
 */
'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var Exercise = new Schema({
    name: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    describe: {
        type: String
    },
    category: { type: Schema.Types.ObjectId, ref: 'CategoryExercise' }
},{
    timestamps: true
});


module.exports = mongoose.model('Exercise', Exercise);
