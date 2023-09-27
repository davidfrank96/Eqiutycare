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

module.exports = router