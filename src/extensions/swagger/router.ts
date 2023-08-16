import express from 'express';
const router = require('express').Router();
import swagger from 'swagger-ui-express';
import buildSwaggerOptions from './index';

router.use(express.json());
router.use('/', swagger.serve, swagger.setup(buildSwaggerOptions()));

export default router;