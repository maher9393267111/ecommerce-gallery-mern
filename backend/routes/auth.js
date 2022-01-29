const express = require('express');
const router = express.Router();



const  {signup} = require("../controllers/auth");


//register validation function with express validation

const { userSignupValidator } = require("../validator");


router.post("/signup",userSignupValidator ,  signup);





module.exports = router;