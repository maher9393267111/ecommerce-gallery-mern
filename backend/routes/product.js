
const express = require("express");
const router = express.Router();



const {  create} = require("../controllers/product");


const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");



// create product route is admin and is login and userid 
// that logged same with id from database tokeid =databaseid
// is admin role =1
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);



router.param('userId', userById);


module.exports =router;