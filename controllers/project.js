'use strict'
const Project = require('../models/project');
const fs = require('fs');
const path = require('path');
const controller = {

    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            message: 'Soy el test del controlador de project'
        });
    },

    saveProject: function (req, res) {
        const project = new Project();

        // const { name, description, category, langs, year } = req.body;
        const params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar el proyecto' });

            if (!projectStored) return res.status(404).send({ message: 'No se ha podido guardar el proyecto' });

            return res.status(200).send({ project: projectStored });
        })
    },

    getProject: function (req, res) {
        const projectId = req.params.id;

        if (projectId == null) return res.status(404).send({ message: 'El proyecto no existe' });

        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if (!project) return res.status(404).send({ message: 'El proyecto no existe' });

            return res.status(200).send({ project });
        })

    },
    getProjects: function (req, res) {
        Project.find({}, (err, projects) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if (!projects) return res.status(404).send({ message: 'No hay proyectos que mostrar' });

            return res.status(200).send({ projects });
        }).sort('year');
    },
    updateProject: function (req, res) {
        const projectId = req.params.id;
        const update = req.body;
        Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar' });

            if (!projectUpdated) return res.status(404).send({ message: 'No se ha podido actualizar' });

            return res.status(200).send({
                project: projectUpdated
            })
        })

    },
    deleteProject: function (req, res) {
        const projectId = req.params.id;
        Project.findByIdAndRemove(projectId, (err, projectRemoved) => {

            if (err) return res.status(500).send({ message: 'Error al borrar' });

            if (!projectRemoved) return res.status(404).send({ message: 'No se ha podido borrar' });

            return res.status(200).send({
                project: projectRemoved
            })

        });
    },
    uploadImage: function (req, res) {
        const projectId = req.params.id;
        const fileName = 'Imagen no subida...';
        if (req.files) {

            const filePath = req.files.image.path;
            const fileSplit = filePath.split('\\');
            const fileName = fileSplit[1];
            const extSplit = fileName.split('\.');
            const fileExt = extSplit[1];

            if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif') {
                Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated) => {

                    if (err) return res.status(500).send({ message: 'La imágen no se ha subido' });

                    if (!projectUpdated) return res.status(404).send({ message: 'El proyecto no existe' });

                    return res.status(200).send({
                        project: projectUpdated
                    });
                })
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ message: 'La extensión no es válida' });
                })

            }



        } else {
            return res.status(404).send({
                message: fileName
            });
        }
    },
    getImageFile: function (req, res) {
        let file = req.params.image;
        let pathFile = './uploads/' + file;

        fs.access(pathFile, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).send({ message: 'La imágen no existe' });
            } else {
                return res.sendFile(path.resolve(pathFile));
            }
        })

    }

}

module.exports = controller
