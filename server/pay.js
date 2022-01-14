const LiqPay = require('./server/liqpay');


const liqpay = new LiqPay(process.env.test_key, process.env.test_private_key);