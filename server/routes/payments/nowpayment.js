const express = require('express');
const router = express.Router();
const controller = require('../../controllers/payments/nowPaymentController');

router.post('/create', controller.createInvoice);

module.exports = router;
