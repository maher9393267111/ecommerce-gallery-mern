const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const {
    create,
    listOrders,
    getStatusValues,
    orderById,
    updateOrderStatus
} = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.post(
    "/order/create/:userId",
    requireSignin,
    isAuth,
     addOrderToUserHistory, // send array of user is buy to his database history field
     decreaseQuantity,  // change sold of product and product quantity when user buy 
    create
);


// find user byId then show his orders

router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders);




//show all status value from order model
router.get(
    "/order/status-values/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    getStatusValues // all values in status in order
);


// to update status in order

router.put(
    "/order/:orderId/status/:userId",  // order id well fetch order with name and price from product model database
    requireSignin, // sign in
    isAuth, // signin userid token == userid in database
    isAdmin, // must be admin
    updateOrderStatus 
);

router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;