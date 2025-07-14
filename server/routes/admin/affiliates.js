const router = require('express').Router();
const {
  createAffiliate,
  getAllAffiliates,
  updateAffiliate,
  deleteAffiliate
} = require('../../controllers/admin/affiliates');
const {authMiddleware} = require('../../controllers/auth/auth-controller')

router.post('/addAffiliate', authMiddleware, createAffiliate);
router.get('/getAllAffiliates', authMiddleware, getAllAffiliates);
router.put('/updateAffiliate/:id', authMiddleware, updateAffiliate);
router.delete('/deleteAffiliate/:id', authMiddleware, deleteAffiliate);

module.exports = router;
