const router = require('express').Router();
const Controllers = require('../Controllers/AuthController')

router.post("/auth/sign-up", Controllers.SignUp);
router.post('/auth/sign-in', Controllers.SignIn);

module.exports = router;