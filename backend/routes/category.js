const express = require('express');
const router = express.Router();

const { list,create,read ,categoryById,remove,update} = require('../controllers/category');

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

//list route 

router.get('/categories', list);

// create product route is admin and is login and userid 
// that logged same with id from database tokeid =databaseid
// is admin role =1
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);



router.get('/category/:categoryId', read);





router.param('categoryId', categoryById);


router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
// router.put('/category/:categoryUpdateId/:userId', requireSignin, isAuth, isAdmin, update);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);

router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);




router.param('userId', userById);


module.exports = router;