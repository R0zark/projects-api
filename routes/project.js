'use strict'

const express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();


var multer = require('multer');


const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, './uploads');
    },
    filename(req,file,cb){
        cb(null,file.originalname);
    }
});

var mul_upload = multer({dest: './uploads',storage});

router.get('/home',ProjectController.home);
router.post('/save-project',ProjectController.saveProject);
router.get('/project/:id?',ProjectController.getProject);
router.get('/projects',ProjectController.getProjects);
router.put('/project/:id',ProjectController.updateProject);
router.post('/upload-image/:id',[mul_upload.single('image')],ProjectController.uploadImage);
router.delete('/project/:id',ProjectController.deleteProject)

module.exports = router;

