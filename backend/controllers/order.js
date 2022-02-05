const { Order, CartItem } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');
// sendgrid for email npm i @sendgrid/mail
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

exports.orderById = (req, res, next, id) => {
    Order.findById(id)   // find specefic order bu order id from request

    // populate to check name and price from product model by id when we pass product id that craeted from mongodb
        .populate('products.product', 'name price')  // {products}: [CartItemSchema], 
        // >>. cartItemSchema model >>     {product}: { type: ObjectId, ref: "Product" },  // product info
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        });
};

exports.create = (req, res) => {
    console.log('CREATE ORDER: ', req.body);

// user info in order === req.profile from userid {specefic user information}
// in front end req.body.order like this  body: JSON.stringify({ order: createOrderData }) 
    req.body.order.user = req.profile; 

    console.log(req.profile); // user info by id in user controller that make this order
    console.log('hello user');
    const order = new Order(req.body.order); // we only well save order details but
    order.save((error, data) => { // we well not save user info in order database 
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount


        // const emailData = {
        //     to: 'kaloraat@gmail.com',
        //     from: 'noreply@ecommerce.com',
        //     subject: `A new order is received`,
        //     html: `
        //     <p>Customer name:</p>
        //     <p>Total products: ${order.products.length}</p>
        //     <p>Total cost: ${order.amount}</p>
        //     <p>Login to dashboard to the order in detail.</p>
        // `
        // };
        // sgMail.send(emailData);
        res.json(data);
    });
};



//SHOW ALL ORDERS AND POPULATE USER TO SHOW USER DATA

exports.listOrders = (req, res) => {
    Order.find()  // find all order 
        .populate('user', '_id name address') // that related to user that make this order
        .sort('-created') // dont show user create date only show user _id name adress info
        .exec((err, orders) => { 
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(orders); // user orders in json data
        });
};



//status: {
//     type: String,
//     default: "Not processed",
//     enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
//   },

// to check the enum array from status from Order shema
//  Order.schema.path('status').enumValues)
// enumValues => enum: All values meaning 

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
};

exports.updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(order);
    });
};


// ORDER DATA WELL BE LIKE THIS IN MONGODB DATABASE

// {"_id":{"$oid":"61fcfde3bdae8fc3fa73e273"},"products":[{"name":"esofman takimi 3","price":{"$numberInt":"165"},"count":{"$numberInt":"1"},"_id":{"$oid":"61fab687272973843c3b31c9"},"updatedAt":{"$date":{"$numberLong":"1643820679093"}},"createdAt":{"$date":{"$numberLong":"1643820679093"}},"__v":{"$numberInt":"0"}}],"transaction_id":"6dwnr2ck","amount":{"$numberInt":"165"},"address":"kuwait","status":"Not processed","createdAt":{"$date":{"$numberLong":"1643970020010"}},"updatedAt":{"$date":{"$numberLong":"1643970020010"}},"__v":{"$numberInt":"0"}}