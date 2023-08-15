const express = require('express');
const router = require('express').Router();
const swagger = require('swagger-ui-express');
const buildSwaggerOptions = require('./index');

router.use(express.json());
router.use('/', swagger.serve, swagger.setup(buildSwaggerOptions()));

module.exports = router;