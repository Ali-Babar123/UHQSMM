// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const {
  createMessage,
  getAllMessages,
  deleteMessage,
} = require('../../controllers/admin/message');
const {authMiddleware} = require('../../controllers/auth/auth-controller')


router.post('/addMessage', authMiddleware, createMessage);
router.get('/getAllMessages', authMiddleware, getAllMessages);
router.delete('/deleteMessage/:id', authMiddleware, deleteMessage);

module.exports = router;
