const { createCryptomusInvoice } = require('../../helpers/CryptomusPayment/cryptomuspayment');

exports.createCryptomusPayment = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const invoice = await createCryptomusInvoice(amount, currency);
    res.status(200).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
