const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../controllers/auth/auth-controller')
const {addFund, updateFund, deleteFund, fund, getAllFunds} = require('../controllers/fundsAddHistory')

router.post('/addFund', authMiddleware,  addFund);
router.put('/updateFund/:id', updateFund);
router.delete('/deleteFund/:id', deleteFund);
router.get('/singleFund/:id', fund);
router.get('/getAllFunds',authMiddleware, getAllFunds);



module.exports = router;