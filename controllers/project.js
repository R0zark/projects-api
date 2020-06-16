'use strict'

var Project = require('../models/project');
var fs = require('fs');

var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Hello there!'
        });

    },
    saveProject: function (req, res) {
        var project = new Project();
        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = project.langs;
        project.img = null

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({
                message: 'The file could not be saved'
            });
            if (!projectStored) return res.status(404).send({
                message: 'The file could not be saved'
            });
            return res.status(200).send({
                project: projectStored
            });
        })

    },
    getProject: function (req, res) {
        var projectId = req.params.id;

        if (projectId == null) {
            return res.status(404).send({
                message: 'Insert project ID'
            });
        }

        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({
                message: 'Error searching the project'
            });
            if (!project) return res.status(404).send({
                message: 'Project not found '
            });

            return res.status(200).send({
                project
            });
        });
    },
    getProjects: function (req, res) {
        Project.find({}).sort('year').exec((err, projects) => {
            if (err) return res.status(500).send({
                message: 'There is not any project'
            });

            if (!projects) return res.status(404).send({
                message: 'There is not any project'
            });

            return res.status(200).send({ projects });

        });
    },
    updateProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
            if (err) return res.status(500).send({
                message: 'The project could not be updated'
            });

            if (!projectUpdated) return res.status(404).send({
                message: 'Project not found '
            });

            return res.status(200).send({
                project: projectUpdated
            })

        })

    },
    deleteProject: function (req, res) {
        var projectId = req.params.id;

        Project.findByIdAndDelete(projectId, (err, projectDeleted) => {
            if (err) return res.status(500).send({
                message: 'The project could not be deleted'
            });

            if (!projectDeleted) return res.status(404).send({
                message: 'Project not found '
            });

            return res.status(200).send({
                project: projectDeleted
            })

        })

    },

    uploadImage: function (req, res) {
        var projectId = req.params.id;
        var fileName = 'Image not uploaded...';
        console.log(req.file);
        if (req.file) {

            var filePath = req.file.path;
            var fileName = filePath.split('/')[1];
            var extSlit = fileName.split('\.')
            var fileExt = extSlit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {

                Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated) => {
                    console.log(filePath);
                    if (err) return res.status(500).send({
                        message: 'Error updating the daata'
                    });

                    if (err) return res.status(404).send({
                        message: 'Project not found '
                    });
                    return res.status(200).send({
                        files: projectUpdated
                    });
                });
            }
            else {
                fs.unlink(filePath, (err) => {
                    return res.status(400).send({
                        message: 'Error, is not a valid extension.'
                    });
                });
            }
        }
        else {
            return res.status(200).send({
                message: fileName
            });
        }
    }

};

module.exports = controller;