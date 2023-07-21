'use strict';

const express = require('express');
const ProjectController = require('../controllers/project');

const router = express.Router();

//Middleware subir imágen
const multipart = require('connect-multiparty');
const multiparMiddleware = multipart({ uploadDir: './uploads' });


router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multiparMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);


module.exports = router;