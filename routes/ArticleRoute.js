const ArticleController = require('../controller/ArticleController');
const express = require('express');

//router
const router = require('express').Router();

//use routers
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));

//use routers
router.post('/addArticle', ArticleController.addArticle);
router.get('/getArticle', ArticleController.getAllArticle);
router.put('/updateArticle', ArticleController.updateArtcile);
router.delete('/deleteArticle', ArticleController.deleteArticle);

module.exports = router;


