const express = require("express")
const router = express.Router()
const AdminController = require('../controllers/AdminController')

/**
 * App routes
 */
router.get('/dashboard', AdminController.adminDashboard)
router.get('/clients', AdminController.viewAllClients)
router.get('/caregivers', AdminController.viewAllCaregivers)
router.get('/clients/:clientId', AdminController.viewClientById)
router.get('/caregivers/:caregiverId', AdminController.viewCaregiverById)

module.exports = router