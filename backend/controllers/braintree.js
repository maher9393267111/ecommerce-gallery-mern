
const User = require('../models/user');
const braintree = require('braintree');
require('dotenv').config();



const gateway =  new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox, // Production
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});



// method from backend to generate clienttoken for use it in payment and make order

exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, function(err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
};



// post method 
// 


exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;  // selected payment method from user
    let amountFromTheClient = req.body.amount; // total products in cart
    // charge
    let newTransaction = gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
            }
        },
        (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result); // payment info that come from frontend
            }
        }
    );
};