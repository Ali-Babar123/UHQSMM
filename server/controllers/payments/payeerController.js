const { generatePayeerForm } = require('../../helpers/PayeerPayment/payeerpayment');

exports.createPayeerPayment = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const orderId = Math.random().toString(36).substring(2, 12);
    const { url, data } = generatePayeerForm(amount, currency, orderId);

    res.status(200).json({
      success: true,
      paymentUrl: url,
      formData: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
