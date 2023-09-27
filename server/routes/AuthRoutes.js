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
router.post('/verify-client-otp', AuthController.verifyCaregiverOTP)

module.exports = router