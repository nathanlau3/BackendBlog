const UserController = require('../controller/UserController');
const express = require('express');
//router
const router = require('express').Router();

//use routers
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));

//use routers
router.post('/register', UserController.addUser);
router.get('/getUser', UserController.getUser);
router.post('/login', UserController.createToken);
router.get('/verified', UserController.verified);

module.exports = router;


