const express = require('express');

const tokenRouter = require('./token');
const lotteryRouter = require('./lottery');

const router = express.Router();

router.use('/token', tokenRouter);
router.use('/lottery', lotteryRouter);

module.exports = router;
