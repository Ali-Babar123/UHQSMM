const axios = require('axios');

const createNowPaymentsInvoice = async (amount, currency, orderId, callbackUrl) => {
  try {
    const response = await axios.post(
      'https://api.nowpayments.io/v1/invoice',
      {
        price_amount: parseFloat(amount),
        price_currency: currency.toUpperCase(),
        order_id: orderId,
        ipn_callback_url: callbackUrl
      },
      {
        headers: {
          'x-api-key': process.env.NOWPAYMENTS_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('❌ NowPayments error:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

module.exports = { createNowPaymentsInvoice };
