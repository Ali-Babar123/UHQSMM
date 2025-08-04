const axios = require('axios');
const crypto = require('crypto');

const createCryptomusInvoice = async (amount, currency) => {
  const apiKey = process.env.CRYPTOMUS_API_KEY;      // The secret key
  const merchant = process.env.CRYPTOMUS_MERCHANT;   // The UUID

  const payload = {
    amount: amount.toString(),
    currency: currency.toUpperCase(),
    order_id: Math.random().toString(36).substring(2, 10),
    url_callback: 'https://uhqsmm.com/payment/callback/cryptomus'
  };

  const jsonData = JSON.stringify(payload);
  console.log('🔐 Cryptomus Payload:', jsonData);


  const sign = crypto
    .createHmac('sha256', apiKey)
    .update(jsonData)
    .digest('hex');

    console.log('🔐 Sign:', sign);

  try {
    const response = await axios.post('https://api.cryptomus.com/v1/payment', jsonData, {
      headers: {
        merchant: merchant,
        sign: sign,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('❌ Cryptomus error:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = { createCryptomusInvoice };
