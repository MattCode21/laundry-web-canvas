
const { User, Order } = require('../models');
const { sanitizeInput, generateRandomPassword, maskSensitiveInfo } = require('../utils/helpers');
const { Op } = require('sequelize');

// Get all users with pagination
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const offset = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    if (role) filter.role = role;
    if (search) {
      filter[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } }
      ];
    }
    
    // Get users with count
    const { count, rows: users } = await User.findAndCountAll({
      where: filter,
      attributes: { exclude: ['password'] },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });
    
    // Mask sensitive information
    const maskedUsers = users.map(user => {
      const userData = user.toJSON();
      if (userData.phone) {
        userData.phone = maskSensitiveInfo(userData.phone);
      }
      return userData;
    });
    
    res.json({
      users: maskedUsers,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalUsers: count
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Order,
          as: 'orders',
          limit: 5,
          order: [['createdAt', 'DESC']]
        }
      ]
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Mask sensitive information for non-admins or if not the user themselves
    const userData = user.toJSON();
    if (req.user.role !== 'admin' && req.user.id !== user.id) {
      if (userData.phone) {
        userData.phone = maskSensitiveInfo(userData.phone);
      }
      if (userData.email) {
        userData.email = maskSensitiveInfo(userData.email);
      }
    }
    
    res.json({ user: userData });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error fetching user' });
  }
};

// Create new user (admin only)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    
    // Validate required fields
    if (!name || !email || !role) {
      return res.status(400).json({ message: 'Name, email, and role are required' });
    }
    
    // Check if user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Generate password if not provided
    const userPassword = password || generateRandomPassword();
    
    // Create user
    const user = await User.create({
      name: sanitizeInput(name),
      email: email.toLowerCase(),
      password: userPassword,
      phone: phone ? sanitizeInput(phone) : null,
      address: address ? sanitizeInput(address) : null,
      role
    });
    
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address
      },
      generatedPassword: password ? undefined : userPassword
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Server error creating user' });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, address, role, isActive } = req.body;
    
    // Find user
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check authorization - users can update their own info
    // Admins can update anyone
    if (req.user.role !== 'admin' && req.user.id !== user.id) {
      return res.status(403).json({ message: 'Not authorized to update this user' });
    }
    
    // Update fields
    if (name) user.name = sanitizeInput(name);
    if (phone !== undefined) user.phone = phone ? sanitizeInput(phone) : null;
    if (address !== undefined) user.address = address ? sanitizeInput(address) : null;
    
    // Only admins can update role and active status
    if (req.user.role === 'admin') {
      if (role) user.role = role;
      if (isActive !== undefined) user.isActive = isActive;
    }
    
    await user.save();
    
    res.json({
      message: 'User updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error updating user' });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    
    // Validate request
    if (!newPassword) {
      return res.status(400).json({ message: 'New password is required' });
    }
    
    // Find user
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Admins can change any password without verification
    // Users must provide current password
    if (req.user.role !== 'admin' && req.user.id === user.id) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required' });
      }
      
      const isMatch = await user.isValidPassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }
    } else if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to change this password' });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error changing password' });
  }
};
