'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../auth/auth.service');

var router = express.Router();

// router.get('/account/:account', controller.findByAccount);
// router.get('/name/:name', controller.findByName);
router.put('/edit',  auth.hasRole('admin'), controller.edit);
router.delete('/delete/:username', auth.hasRole('admin'),controller.deleteUser);
router.post('/create',controller.addUser);
router.post('/login',controller.login);
router.get('/confirm', auth.hasRole('admin'), controller.confirm);
router.post('/upload', auth.hasRole('admin'), controller.upload);


module.exports = router;
