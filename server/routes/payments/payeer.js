// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { createPayeerPayment } = require('../../controllers/payments/payeerController');

router.post('/payeer', createPayeerPayment);

module.exports = router;
