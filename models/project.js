'use strict';
const { Schema, model } = require('mongoose');

const ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
})
module.exports = model('Project', ProjectSchema);