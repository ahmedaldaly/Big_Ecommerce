
const router = require('express').Router();
const {register,Login,googleAuth,googleCallback ,  sendResetCode,
    verifyResetCode,
    setNewPassword}  = require('../controller/authController')
router.post('/register',register)
router.post('/login',Login)
// google
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
// reset password
// نسيت كلمة المرور - OTP
router.post('/forgot-password/send-code', sendResetCode);
router.post('/forgot-password/verify-code', verifyResetCode);
router.post('/forgot-password/reset', setNewPassword);

module.exports =router