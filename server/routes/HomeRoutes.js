const express = require("express")
const router = express.Router()
const HomeController = require('../controllers/HomeController')
const { checkAuth } = require('../middleware/auth');

/**
 * home routes
 */
router.get('/', HomeController.homepage)
router.get('/about', HomeController.aboutpage)
router.get('/services', HomeController.servicespage)
router.get('/faq', HomeController.faqpage)
router.get('/contact', HomeController.contactpage)
router.get('/our-rates', HomeController.ratepage)
router.get('/get-started', checkAuth, HomeController.getstartedpage)
router.get('/client-login', checkAuth, HomeController.clientLogin)
router.get('/caregiver-login', checkAuth, HomeController.caregiverLogin)
router.get('/client-otp', checkAuth, HomeController.clientOtp)
router.get('/caregiver-otp', checkAuth, HomeController.caregiverOtp)
router.get('/admin-login', checkAuth, HomeController.adminLogin)
router.get('/admin-otp', checkAuth, HomeController.adminOtp)
router.get('/logout', checkAuth, HomeController.logout)

module.exports = router