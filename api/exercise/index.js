/**
 * Created by khanh on 10/03/2017.
 */
'use strict';

var express = require('express');
var controller = require('./exercise.controller.js');
var auth = require('../auth/auth.service');

var router = express.Router();

router.get('/category/all', controller.getAllCategory);
router.get('/category/:_id', controller.getExByCategory);
router.get('/exercise/:id', controller.findExById);
router.post('/createCategory', controller.createCategory);
router.post('/createExercise', controller.createExercise);
// router.put('/editFood', auth.hasRole('admin'), controller.editFood);
// router.delete('/deleteFood/:_id', auth.hasRole('admin'),  controller.deleteFood);

module.exports = router;
