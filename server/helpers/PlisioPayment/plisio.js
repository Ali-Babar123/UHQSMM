
const axios = require('axios');

const createPlisioInvoice = async (amount, currency, orderName, callbackUrl) => {
  const apiKey = process.env.PLISIO_API_KEY;

  const payload = {
    api_key: apiKey,
    amount: parseFloat(amount).toFixed(2),  // Ensure it's a float string like "20.00"
    currency: currency.toUpperCase(),       // Must be in uppercase e.g., "USD"
    order_name: orderName,
    callback_url: callbackUrl
  };
console.log('📦 Plisio Payload:', payload);
  try {
    const response = await axios.post('https://plisio.net/api/v1/invoices', payload);
    return response.data;
  } catch (error) {
    console.error('❌ Plisio error:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = { createPlisioInvoice };
