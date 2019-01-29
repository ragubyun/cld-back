const express = require('express');

const tokenRouter = require('./token');

const router = express.Router();

router.use('/token', tokenRouter);

module.exports = router;
