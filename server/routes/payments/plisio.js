const express = require('express');
const router = express.Router();
const plisioController = require('../../controllers/payments/plisioController');

router.post('/create', plisioController.createInvoice);

module.exports = router;
