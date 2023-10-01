const express = require("express")
const router = express.Router()
const HomeController = require('../controllers/HomeController')

/**
 * home routes
 */
router.get('/', HomeController.homepage)
router.get('/about', HomeController.aboutpage)
router.get('/services', HomeController.servicespage)
router.get('/faq', HomeController.faqpage)
router.get('/contact', HomeController.contactpage)
router.get('/our-rates', HomeController.ratepage)
router.get('/get-started', HomeController.getstartedpage)
router.get('/client-login', HomeController.clientLogin)
router.get('/caregiver-login', HomeController.caregiverLogin)
router.get('/client-otp', HomeController.clientOtp)
router.get('/caregiver-otp', HomeController.caregiverOtp)
router.get('/admin-login', HomeController.adminLogin)
router.get('/admin-otp', HomeController.adminOtp)

module.exports = router