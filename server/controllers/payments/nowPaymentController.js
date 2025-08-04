const { createNowPaymentsInvoice } = require('../../helpers/NowPayment/nowpayment');

exports.createInvoice = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const invoice = await createNowPaymentsInvoice(
      amount,
      currency,
      'SMM-NOW-' + Date.now(), // unique order id
      'https://uhqsmm.com/payment/callback/nowpayments' // optional for webhook
    );

    res.status(200).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Payment failed', error });
  }
};
