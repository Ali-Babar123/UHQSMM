const crypto = require('crypto');

const generatePayeerForm = (amount, currency, orderId) => {
  const m_shop = process.env.PAYEER_MERCHANT_ID;
  const m_orderid = orderId;
  const m_amount = parseFloat(amount).toFixed(2);
  const m_curr = currency.toUpperCase();
  const m_desc = Buffer.from("SMM Panel Payment").toString('base64');

  const secret = process.env.PAYEER_SECRET_KEY;
  const signData = `${m_shop}:${m_orderid}:${m_amount}:${m_curr}:${m_desc}:${secret}`;

  const m_sign = crypto
    .createHash('sha256')
    .update(signData)
    .digest('hex')
    .toUpperCase();

  const payeerUrl = 'https://payeer.com/merchant/';

  return {
    url: payeerUrl,
    data: {
      m_shop,
      m_orderid,
      m_amount,
      m_curr,
      m_desc,
      m_sign,
      m_success_url: 'https://uhqsmm.com/payment/payeer',
      m_fail_url: 'https://uhqsmm.com/addfunds',
      m_status_url: 'https://uhqsmm.com/status',
    },
  };
};

module.exports = { generatePayeerForm };
