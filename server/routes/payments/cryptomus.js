const express = require('express');
const router = express.Router();
const { createCryptomusPayment, handleCryptomusCallback } = require('../../controllers/payments/cryptomusController');

// Create invoice
router.post('/pay', createCryptomusPayment);

module.exports = router;
