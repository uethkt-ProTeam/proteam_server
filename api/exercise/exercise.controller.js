/**
 * Created by khanh on 10/03/2017.
 */
'use strict';

var Category = require('./categoryExercise.model');
var Excersie = require('./exercise.model');

module.exports = {
    // delete: function(req, res){
    //     if(req.params._id){
    //         Event.findById(req.params._id, function(err, data){
    //             if(err) { // err function of mongoose
    //                 console.error(err);
    //                 res.json({code : 0, message: err});
    //             }
    //             else {
    //                 if (data){
    //                     data.remove(function(err){
    //                         if (err){
    //                             console.error(err);
    //                             res.json({code : 0, message: err});
    //                         }else{
    //                             res.json({code: 1, message:'delete succeed!!!'});
    //                         }
    //                     })
    //                 }
    //                 else{
    //                     res.json({code: 0, message: 'No data'})
    //                 }
    //             }
    //         });
    //     } else {
    //         res.json({code: 0, message: 'No id'})
    //     }
    // },
    //
    // edit: function(req,res){
    //     if(req.body){
    //         Event.findById(req.body._id, function(err, data){
    //             if(err) { // err function of mongoose
    //                 console.error(err);
    //                 res.json({code : 0, message: err});
    //             }
    //             else {
    //                 if (data){ //check find a obj by id
    //                     if(req.body.name) data.name = req.body.name;
    //                     if(req.body.img) data.img = req.body.img;
    //                     if(req.body.content) data.content = req.body.content;
    //                     if(req.body.time) data.time = req.body.time;
    //                     data.save(function(err, newData){
    //                         if (err){
    //                             console.error(err);
    //                             res.json({code : 0, message: err});
    //                         }
    //                         else{
    //                             res.json({code : 1, result: data._id});
    //                         }
    //                     });
    //
    //                 }
    //             }
    //         });
    //     }
    //     else {
    //         res.json({code: 0, message: 'No data'})
    //     }
    // },

    createCategory: function(req, res) {
        if (req.body) {
            var newCategory = {
                name : req.body.name,
                items: []
            };
            Category.create(newCategory , function(err, data) {
                if(err) {
                    console.error(err);
                    res.json({code : 0, message: err});
                }
                res.json({code : 1, result: data._id, message: 'Create successful'});
            });
        }
        else {
            res.json({code: 0, message: 'No data'})
        }
    },

    createExercise: function (req, res) {
        if (req.body) {
            var newExcersie = {
                name : req.body.name,
                img: req.body.img,
                describe: req.body.describe,
                category: req.body.category
            };
            Excersie.create(newExcersie , function(err, data) {
                if(err) {
                    console.error(err);
                    res.json({code : 0, message: err});
                }
                else {
                    Category.findOneAndUpdate(
                        { _id : newExcersie.category._id},
                        {$push: {items: data._id}},
                        {upsert: true},
                        function (err, ok) {
                            if(err) res.json({code : 0, message: err});
                            res.json({code : 1, result: data._id, message: 'Create successful'});
                        }
                    )
                }
            });
        }
        else {
            res.json({code: 0, message: 'No data'})
        }
    },

    getAllCategory : function(req, res){
        Category
            .find()
            .populate({
                path: 'items',
                    options: {
                    limit: 3
                }
            })
            .exec(function(err, data){
                if(err) {
                    console.error(err);
                    res.json({code : 0, message: err});
                }
                res.json({code : 1, result: data});
            });
    },

    getExByCategory : function(req, res){
        if (req.params._id) {
            Category
                .find({_id:  req.params._id})
                .populate({
                    path: 'items'
                })
                .exec(function(err, data){
                    if(err) {
                        console.error(err);
                        res.json({code : 0, message: err});
                    }
                    res.json({code : 1, result: data});
                });
        } else {
            res.json({code : 0, message: 'Not found'});
        }

    },

    findExById : function(req, res){
        if (req.params._id) {
            Excersie
                .find({_id:  req.params._id})
                .exec(function(err, data){
                    if(err) {
                        console.error(err);
                        res.json({code : 0, message: err});
                    }
                    res.json({code : 1, result: data});
                });
        } else {
            res.json({code : 0, message: 'Not found'});
        }

    }
};
