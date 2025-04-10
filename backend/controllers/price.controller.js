
const { Price } = require('../models');
const { sanitizeInput } = require('../utils/helpers');

// Get all prices
exports.getAllPrices = async (req, res) => {
  try {
    const prices = await Price.findAll({
      where: { isActive: true },
      order: [['categoryId', 'ASC'], ['name', 'ASC']]
    });
    
    res.json({ prices });
  } catch (error) {
    console.error('Get prices error:', error);
    res.status(500).json({ message: 'Server error fetching prices' });
  }
};

// Get prices by category
exports.getPricesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    const prices = await Price.findAll({
      where: { categoryId, isActive: true },
      order: [['name', 'ASC']]
    });
    
    res.json({ prices });
  } catch (error) {
    console.error('Get prices by category error:', error);
    res.status(500).json({ message: 'Server error fetching prices by category' });
  }
};

// Create new price
exports.createPrice = async (req, res) => {
  try {
    const { categoryId, itemId, name, price } = req.body;
    
    // Validate required fields
    if (!categoryId || !itemId || !name || price === undefined) {
      return res.status(400).json({ message: 'Category ID, item ID, name, and price are required' });
    }
    
    // Check if price already exists for this item
    const priceExists = await Price.findOne({ where: { itemId } });
    if (priceExists) {
      return res.status(400).json({ message: 'Price for this item already exists' });
    }
    
    // Create price
    const newPrice = await Price.create({
      categoryId,
      itemId,
      name: sanitizeInput(name),
      price: parseFloat(price)
    });
    
    res.status(201).json({
      message: 'Price created successfully',
      price: newPrice
    });
  } catch (error) {
    console.error('Create price error:', error);
    res.status(500).json({ message: 'Server error creating price' });
  }
};

// Update price
exports.updatePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, isActive } = req.body;
    
    // Validate inputs
    if (price === undefined && isActive === undefined) {
      return res.status(400).json({ message: 'Price or active status is required for update' });
    }
    
    // Find price
    const priceItem = await Price.findByPk(id);
    if (!priceItem) {
      return res.status(404).json({ message: 'Price not found' });
    }
    
    // Update fields
    if (price !== undefined) {
      priceItem.price = parseFloat(price);
    }
    
    if (isActive !== undefined) {
      priceItem.isActive = isActive;
    }
    
    await priceItem.save();
    
    res.json({
      message: 'Price updated successfully',
      price: priceItem
    });
  } catch (error) {
    console.error('Update price error:', error);
    res.status(500).json({ message: 'Server error updating price' });
  }
};

// Bulk update or create prices
exports.bulkUpdatePrices = async (req, res) => {
  try {
    const { prices } = req.body;
    
    if (!Array.isArray(prices) || prices.length === 0) {
      return res.status(400).json({ message: 'Prices array is required' });
    }
    
    const results = await Promise.all(
      prices.map(async (item) => {
        const { itemId, price, categoryId, name } = item;
        
        if (!itemId || price === undefined) {
          return { success: false, message: 'Item ID and price are required', item };
        }
        
        // Find or create price
        const [priceItem, created] = await Price.findOrCreate({
          where: { itemId },
          defaults: {
            categoryId,
            name: sanitizeInput(name),
            price: parseFloat(price)
          }
        });
        
        // If found (not created), update it
        if (!created) {
          priceItem.price = parseFloat(price);
          if (categoryId) priceItem.categoryId = categoryId;
          if (name) priceItem.name = sanitizeInput(name);
          await priceItem.save();
        }
        
        return {
          success: true,
          created,
          price: priceItem
        };
      })
    );
    
    res.json({
      message: 'Prices updated successfully',
      results
    });
  } catch (error) {
    console.error('Bulk update prices error:', error);
    res.status(500).json({ message: 'Server error updating prices' });
  }
};
