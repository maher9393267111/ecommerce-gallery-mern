
const express = require("express");
const router = express.Router();



const {  productById,read,create,remove,update,list,listRelated} = require("../controllers/product");


const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");



// all products read

router.get("/products", list);




// create product route is admin and is login and userid 
// that logged same with id from database tokeid =databaseid
// is admin role =1
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);


router.get("/product/:productId", read);


//  Delete specefic product id 

router.delete(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);


//  update the product by his id and by admin

router.put(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);



// router.get("/products/search", listSearch);
router.get("/products/related/:productId", listRelated);
// router.get("/products/categories", listCategories);
// router.post("/products/by/search", listBySearch);
// router.get("/product/photo/:productId", photo);




router.param('userId', userById);

router.param("productId", productById);




module.exports =router;