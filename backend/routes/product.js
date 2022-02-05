
const express = require("express");
const router = express.Router();



const { listSearch,listBySearch,photo, productById,read,create,remove,update,list,listRelated,listCategories} = require("../controllers/product");


const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");



// all products read

router.get("/products", list);




// create product route is admin and is login and userid 
// that logged same with id from database tokeid =databaseid
// is admin role =1
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);


// product page to show product details

router.get("/product/:productId", read);


// show in product detail page in frontend

router.get("/products/related/:productId", listRelated);



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


//  search to find product in home page frontend by search input field
 router.get("/products/search", listSearch);




 router.get("/products/categories", listCategories);
 router.post("/products/by/search", listBySearch);
 router.get("/product/photo/:productId", photo);




router.param('userId', userById);

router.param("productId", productById);




module.exports =router;