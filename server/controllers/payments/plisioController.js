const { createPlisioInvoice } = require('../../helpers/PlisioPayment/plisio');

exports.createInvoice = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const invoice = await createPlisioInvoice(
      amount,
      currency,
      'SMM Panel Order',
      'https://uhqsmm.com/payment/callback/plisio'
    );

    res.status(200).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Payment failed', error });
  }
};
