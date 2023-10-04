const express = require("express")
const router = express.Router()
const AuthController = require('../controllers/AuthController')

/**
 * Auth routes
 */
router.post('/request-service', AuthController.requestService)
router.post('/become-caregiver', AuthController.becomeCaregiver)
router.post('/client-login', AuthController.clientLogin)
router.post('/verify-client-otp', AuthController.verifyClientOTP)
router.post('/caregiver-login', AuthController.caregiverLogin)
router.post('/verify-caregiver-otp', AuthController.verifyCaregiverOTP)
router.post('/admin-login', AuthController.adminLogin)
router.post('/verify-admin-otp', AuthController.verifyAdminOTP)
router.get('/admin-logout', AuthController.adminLogout);

module.exports = router