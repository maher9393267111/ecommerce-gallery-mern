const express = require('express');
const router = express.Router();



const  {signup,signin,signout,requireSignin} = require("../controllers/auth");


//register validation function with express validation

const { userSignupValidator } = require("../validator");


router.post("/signup",userSignupValidator ,  signup);

router.post("/signin", signin);



router.get("/signout", signout);

//protected rote use middlwware 

router.get('/hello',requireSignin.apply, function (req, res) {
    res.send('hello world')
  })




module.exports = router;