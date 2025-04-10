
const express = require('express');
const router = express.Router();
const priceController = require('../controllers/price.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes - anyone can view prices
router.get('/', priceController.getAllPrices);
router.get('/category/:categoryId', priceController.getPricesByCategory);

// Protected routes - only staff can manage prices
router.use(authMiddleware);

router.post('/', priceController.createPrice);
router.put('/:id', priceController.updatePrice);
router.post('/bulk', priceController.bulkUpdatePrices);

module.exports = router;
