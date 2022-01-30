const express = require('express');
const router = express.Router();



const  {signup,signin,signout,requireSignin,isAuth} = require("../controllers/auth");


//register validation function with express validation

const { userSignupValidator } = require("../validator");


router.post("/signup",userSignupValidator ,  signup);

router.post("/signin", signin);



router.get("/signout", signout);

//protected rote use middlwware 

// >>>>>> لازم كتابة الرمز في الراس لاستطيع الزهاب لهزا المسار

// router.get('/hello',requireSignin, function (req, res) {
//     res.send('hello world')
//   })








module.exports = router;