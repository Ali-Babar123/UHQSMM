const express = require('express');
const router = express.Router();

const { createPaymentIntent } = require('../helpers/StripePayment/paymentController')

router.post('/create-payment-intent', createPaymentIntent);

module.exports = router