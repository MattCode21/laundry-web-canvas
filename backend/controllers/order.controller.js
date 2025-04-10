
const { Order, OrderItem, User, Price } = require('../models');
const { generateOrderNumber, calculateOrderTotal } = require('../utils/helpers');
const { Op } = require('sequelize');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, pickupDate, deliveryDate, notes } = req.body;
    
    // Validate required fields
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'User ID and at least one item are required' });
    }
    
    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get all price IDs to fetch them in one query
    const priceIds = items.map(item => item.priceId);
    const prices = await Price.findAll({ where: { id: { [Op.in]: priceIds } } });
    
    // Create a map for quick price lookups
    const priceMap = {};
    prices.forEach(price => {
      priceMap[price.id] = price;
    });
    
    // Validate all items and calculate total
    let totalAmount = 0;
    const validatedItems = [];
    
    for (const item of items) {
      const { priceId, quantity } = item;
      
      if (!priceId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Each item must have a valid price ID and quantity' });
      }
      
      const price = priceMap[priceId];
      if (!price) {
        return res.status(404).json({ message: `Price with ID ${priceId} not found` });
      }
      
      const subtotal = parseFloat(price.price) * quantity;
      totalAmount += subtotal;
      
      validatedItems.push({
        priceId,
        quantity,
        price: parseFloat(price.price),
        subtotal,
        category: price.categoryId,
        itemName: price.name
      });
    }
    
    // Create order
    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      userId,
      totalAmount,
      pickupDate: pickupDate ? new Date(pickupDate) : null,
      deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
      notes
    });
    
    // Create order items
    const orderItems = await Promise.all(
      validatedItems.map(item => OrderItem.create({
        ...item,
        orderId: order.id
      }))
    );
    
    res.status(201).json({
      message: 'Order created successfully',
      order: {
        ...order.toJSON(),
        items: orderItems
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error creating order' });
  }
};

// Get all orders with pagination
exports.getOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, userId } = req.query;
    const offset = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (userId) filter.userId = userId;
    
    // Get orders with count
    const { count, rows: orders } = await Order.findAndCountAll({
      where: filter,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'phone']
        }
      ]
    });
    
    res.json({
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalOrders: count
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: OrderItem,
          as: 'items'
        }
      ]
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error fetching order' });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Update status
    order.status = status;
    await order.save();
    
    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error updating order status' });
  }
};

// Update order payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, paymentMethod } = req.body;
    
    if (!paymentStatus) {
      return res.status(400).json({ message: 'Payment status is required' });
    }
    
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Update payment info
    order.paymentStatus = paymentStatus;
    if (paymentMethod) {
      order.paymentMethod = paymentMethod;
    }
    await order.save();
    
    res.json({
      message: 'Payment status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(500).json({ message: 'Server error updating payment status' });
  }
};
