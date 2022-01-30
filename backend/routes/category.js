const express = require('express');
const router = express.Router();

const { list,create } = require('../controllers/category');

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

//list route 

router.get('/categories', list);

// create product route is admin and is login and userid 
// that logged same with id from database tokeid =databaseid
// is admin role =1
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);



router.param('userId', userById);


module.exports = router;