
// Utility functions for the laundry management backend

/**
 * Generate a unique order number
 * @returns {string} Unique order number
 */
const generateOrderNumber = () => {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `${Date.now()}${randomDigits}`.slice(-8);
};

/**
 * Validate phone number format
 * @param {string} phone Phone number to validate
 * @returns {boolean} Whether the phone number is valid
 */
const isValidPhoneNumber = (phone) => {
  // Regex for validating phone numbers (adjust as needed for your region)
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return phoneRegex.test(phone);
};

/**
 * Sanitize input string (remove extra spaces, trim)
 * @param {string} input Input string to sanitize
 * @returns {string} Sanitized string
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/\s+/g, ' ');
};

/**
 * Calculate total price for order items
 * @param {Array} items Array of order items
 * @returns {number} Total price
 */
const calculateOrderTotal = (items) => {
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * Format date to a consistent string format
 * @param {Date} date Date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

/**
 * Create a random password
 * @param {number} length Length of password (default 12)
 * @returns {string} Random password
 */
const generateRandomPassword = (length = 12) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  return Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => charset[x % charset.length])
    .join('');
};

/**
 * Mask sensitive information like phone numbers or emails
 * @param {string} value Value to mask
 * @returns {string} Masked value
 */
const maskSensitiveInfo = (value) => {
  if (!value) return value;
  
  if (value.includes('@')) {
    // Email masking
    const [name, domain] = value.split('@');
    return `${name.slice(0, 2)}****@${domain}`;
  }
  
  // Phone number masking
  return value.slice(0, 3) + '****' + value.slice(-2);
};

module.exports = {
  generateOrderNumber,
  isValidPhoneNumber,
  sanitizeInput,
  calculateOrderTotal,
  formatDate,
  generateRandomPassword,
  maskSensitiveInfo
};
