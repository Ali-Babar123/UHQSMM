const express = require('express')
const { adminLogin } = require('../../controllers/admin/admin-controller')
const router = express.Router()

router.post('/login', adminLogin); 

module.exports = router