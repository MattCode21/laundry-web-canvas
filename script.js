
// Mock data
const CATEGORIES = [
  { id: "washing-drying", name: "Washing & Drying" },
  { id: "dry-cleaning", name: "Dry Cleaning" },
  { id: "ironing", name: "Ironing & Pressing" },
  { id: "specialty", name: "Specialty Items" }
];

const LAUNDRY_ITEMS = {
  "washing-drying": [
    { id: "wd1", name: "T-Shirt", price: 15.00, selected: false, quantity: 0 },
    { id: "wd2", name: "Pants/Jeans", price: 25.00, selected: false, quantity: 0 },
    { id: "wd3", name: "Dress", price: 30.00, selected: false, quantity: 0 },
    { id: "wd4", name: "Bedsheet", price: 35.00, selected: false, quantity: 0 },
    { id: "wd5", name: "Towel", price: 20.00, selected: false, quantity: 0 },
    { id: "wd6", name: "Underwear", price: 10.00, selected: false, quantity: 0 }
  ],
  "dry-cleaning": [
    { id: "dc1", name: "Suit", price: 100.00, selected: false, quantity: 0 },
    { id: "dc2", name: "Coat", price: 80.00, selected: false, quantity: 0 },
    { id: "dc3", name: "Formal Dress", price: 75.00, selected: false, quantity: 0 },
    { id: "dc4", name: "Jacket", price: 60.00, selected: false, quantity: 0 },
    { id: "dc5", name: "Tie", price: 15.00, selected: false, quantity: 0 },
    { id: "dc6", name: "Blanket", price: 70.00, selected: false, quantity: 0 }
  ],
  "ironing": [
    { id: "ir1", name: "Shirt", price: 10.00, selected: false, quantity: 0 },
    { id: "ir2", name: "Pants", price: 12.00, selected: false, quantity: 0 },
    { id: "ir3", name: "Dress", price: 15.00, selected: false, quantity: 0 },
    { id: "ir4", name: "Suit (2 pc)", price: 25.00, selected: false, quantity: 0 },
    { id: "ir5", name: "Bedsheet", price: 20.00, selected: false, quantity: 0 },
    { id: "ir6", name: "Curtain", price: 30.00, selected: false, quantity: 0 }
  ],
  "specialty": [
    { id: "sp1", name: "Wedding Dress", price: 150.00, selected: false, quantity: 0 },
    { id: "sp2", name: "Leather Jacket", price: 100.00, selected: false, quantity: 0 },
    { id: "sp3", name: "Silk Garment", price: 50.00, selected: false, quantity: 0 },
    { id: "sp4", name: "Large Comforter", price: 60.00, selected: false, quantity: 0 },
    { id: "sp5", name: "Area Rug", price: 120.00, selected: false, quantity: 0 },
    { id: "sp6", name: "Cushion", price: 25.00, selected: false, quantity: 0 }
  ]
};

// Mock delivery requests data
const DELIVERY_REQUESTS = [
  { id: "2340", status: "NOT READY" },
  { id: "2200", status: "READY FOR DELIVERY" },
  { id: "1837", status: "ASSIGNED TO DELIVERY PARTNER" },
  { id: "1840", status: "OUT FOR DELIVERY" },
  { id: "1245", status: "DELIVERED" }
];

// Mock laundry orders data
const LAUNDRY_ORDERS = [
  { id: "2341", status: "READY FOR COLLECTION" },
  { id: "2201", status: "READY FOR COLLECTION" },
  { id: "1838", status: "NOT READY" },
  { id: "1841", status: "COLLECTED" },
  { id: "1246", status: "COLLECTED" }
];

// Mock bill items data
const BILL_ITEMS = [
  { id: 1, name: "T-SHIRT WASH & DRY", quantity: 3, price: 15.00, total: 45.00 },
  { id: 2, name: "JEANS WASH & DRY", quantity: 2, price: 25.00, total: 50.00 },
  { id: 3, name: "PANT WASH & DRY", quantity: 2, price: 20.00, total: 40.00 },
  { id: 4, name: "SHIRT STEAM PRESS", quantity: 3, price: 10.00, total: 30.00 },
  { id: 5, name: "JACKET DRY CLEANING", quantity: 1, price: 45.00, total: 45.00 },
  { id: 6, name: "SINGLE BLANKET CLEANING", quantity: 2, price: 30.00, total: 60.00 },
  { id: 7, name: "SMALL CUSHION CLEANING", quantity: 1, price: 25.00, total: 25.00 },
  { id: 8, name: "JACKET DRY CLEANING", quantity: 1, price: 35.00, total: 35.00 }
];

// State Management
let currentPage = 'login-page';
let selectedCategory = 'washing-drying';
let selectedPriceItem = null;
let isAuthenticated = false;
let currentBillId = null;
let laundryItems = JSON.parse(JSON.stringify(LAUNDRY_ITEMS)); // Deep copy

// User object
const user = {
  name: "Admin User",
  adminId: "A12345",
  role: "Administrator",
  avatar: "/profile-placeholder.png"
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Init Lucide icons
  lucide.createIcons();
  
  // Handle form submissions
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  
  // Navigation event listeners
  document.querySelectorAll('.back-to-dashboard').forEach(button => {
    button.addEventListener('click', () => navigateTo('dashboard-page'));
  });
  
  document.querySelectorAll('#logout-btn').forEach(button => {
    button.addEventListener('click', handleLogout);
  });
  
  document.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', (e) => {
      navigateTo(e.currentTarget.getAttribute('data-page') + '-page');
    });
  });
  
  // Initialize page-specific elements and event listeners
  initTakeOrderPage();
  initUpdatePricePage();
  initDeliveryRequestsPage();
  initLaundryStatusPage();
  initBillDetailPage();
  
  // Show toast functionality
  document.querySelectorAll('[data-bs-dismiss="toast"]').forEach(button => {
    button.addEventListener('click', () => {
      document.getElementById('toast').classList.remove('show');
    });
  });
});

// Page Navigation
function navigateTo(pageId) {
  if (!isAuthenticated && pageId !== 'login-page') {
    showToast('Please login first', 'danger');
    return;
  }
  
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  document.getElementById(pageId).classList.add('active');
  currentPage = pageId;
  
  // Handle page-specific initialization
  if (pageId === 'take-order-page') {
    renderCategoriesAndItems();
  } else if (pageId === 'update-price-list-page') {
    renderPriceCategories();
  } else if (pageId === 'delivery-requests-page') {
    renderDeliveryRequests();
  } else if (pageId === 'laundry-status-page') {
    renderLaundryOrders();
  }
}

// Authentication
function handleLogin(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (!username || !password) {
    showToast('Please enter both username and password', 'danger');
    return;
  }
  
  // Simple mock authentication - in a real app this would call an API
  if (username === 'admin' && password === 'password') {
    isAuthenticated = true;
    navigateTo('dashboard-page');
    showToast('Login successful', 'success');
  } else {
    showToast('Invalid username or password', 'danger');
  }
}

function handleLogout() {
  isAuthenticated = false;
  navigateTo('login-page');
  showToast('Logged out successfully', 'success');
}

// Take Order Page
function initTakeOrderPage() {
  document.getElementById('create-order-btn').addEventListener('click', handleCreateOrder);
}

function renderCategoriesAndItems() {
  // Render categories
  const categoriesContainer = document.getElementById('categories-container');
  categoriesContainer.innerHTML = '';
  
  CATEGORIES.forEach(category => {
    const button = document.createElement('button');
    button.className = `btn ${selectedCategory === category.id ? 'bg-laundry-blue text-white' : 'btn-outline-primary'} w-100 text-start`;
    button.textContent = category.name;
    button.addEventListener('click', () => {
      selectedCategory = category.id;
      renderCategoriesAndItems();
    });
    categoriesContainer.appendChild(button);
  });
  
  // Render items
  const itemsContainer = document.getElementById('items-container');
  itemsContainer.innerHTML = '';
  
  laundryItems[selectedCategory].forEach(item => {
    const col = document.createElement('div');
    col.className = 'col-sm-6 col-md-4';
    
    const card = document.createElement('div');
    card.className = `item-card ${item.selected ? 'selected' : ''}`;
    card.innerHTML = `
      <div class="item-info">
        <h3 class="fw-semibold">${item.name}</h3>
        <p class="small">Rs. ${item.price.toFixed(2)}</p>
      </div>
      <div class="quantity-control">
        <button class="quantity-btn decrease-btn">-</button>
        <span class="quantity-value mx-2">${item.quantity}</span>
        <button class="quantity-btn increase-btn">+</button>
      </div>
    `;
    
    // Toggle selection
    card.querySelector('.item-info').addEventListener('click', () => {
      toggleItemSelection(item.id);
    });
    
    // Quantity controls
    if (card.querySelector('.decrease-btn')) {
      card.querySelector('.decrease-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        updateItemQuantity(item.id, -1);
      });
    }
    
    if (card.querySelector('.increase-btn')) {
      card.querySelector('.increase-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        updateItemQuantity(item.id, 1);
      });
    }
    
    col.appendChild(card);
    itemsContainer.appendChild(col);
  });
  
  // Update total
  updateTotalAmount();
}

function toggleItemSelection(itemId) {
  const category = laundryItems[selectedCategory];
  const itemIndex = category.findIndex(item => item.id === itemId);
  
  if (itemIndex !== -1) {
    const item = category[itemIndex];
    item.selected = !item.selected;
    item.quantity = item.selected ? 1 : 0;
    renderCategoriesAndItems();
  }
}

function updateItemQuantity(itemId, change) {
  const category = laundryItems[selectedCategory];
  const itemIndex = category.findIndex(item => item.id === itemId);
  
  if (itemIndex !== -1) {
    const item = category[itemIndex];
    if (item.selected) {
      item.quantity = Math.max(0, item.quantity + change);
      item.selected = item.quantity > 0;
      renderCategoriesAndItems();
    }
  }
}

function updateTotalAmount() {
  let total = 0;
  
  Object.values(laundryItems).forEach(categoryItems => {
    categoryItems.forEach(item => {
      if (item.selected && item.quantity > 0) {
        total += item.price * item.quantity;
      }
    });
  });
  
  document.getElementById('total-amount').textContent = `Total: Rs. ${total.toFixed(2)}`;
}

function handleCreateOrder() {
  const selectedItems = [];
  
  Object.values(laundryItems).forEach(categoryItems => {
    categoryItems.forEach(item => {
      if (item.selected && item.quantity > 0) {
        selectedItems.push({...item});
      }
    });
  });
  
  if (selectedItems.length === 0) {
    showToast('Please select at least one item', 'danger');
    return;
  }
  
  showToast(`Order created successfully with ${selectedItems.length} items`, 'success');
  
  // Reset selections
  Object.keys(laundryItems).forEach(categoryId => {
    laundryItems[categoryId].forEach(item => {
      item.selected = false;
      item.quantity = 0;
    });
  });
  
  renderCategoriesAndItems();
  navigateTo('dashboard-page');
}

// Update Price List Page
function initUpdatePricePage() {
  document.getElementById('update-price-btn').addEventListener('click', handleUpdatePrice);
}

function renderPriceCategories() {
  // Render categories
  const categoriesContainer = document.getElementById('price-categories-container');
  categoriesContainer.innerHTML = '';
  
  CATEGORIES.forEach(category => {
    const button = document.createElement('button');
    button.className = `btn ${selectedCategory === category.id ? 'bg-laundry-blue text-white' : 'btn-outline-primary'} w-100 text-start`;
    button.textContent = category.name;
    button.addEventListener('click', () => {
      selectedCategory = category.id;
      selectedPriceItem = null;
      document.getElementById('price-update-form').classList.add('d-none');
      renderPriceItems();
      renderPriceCategories();
    });
    categoriesContainer.appendChild(button);
  });
  
  renderPriceItems();
}

function renderPriceItems() {
  const itemsContainer = document.getElementById('price-items-container');
  itemsContainer.innerHTML = '';
  
  LAUNDRY_ITEMS[selectedCategory].forEach(item => {
    const col = document.createElement('div');
    col.className = 'col-sm-6 col-md-4';
    
    const card = document.createElement('div');
    card.className = `item-card ${selectedPriceItem === item.id ? 'selected' : ''}`;
    card.innerHTML = `
      <div class="item-info">
        <h3 class="fw-semibold">${item.name}</h3>
        <p class="small">Rs. ${item.price.toFixed(2)}</p>
      </div>
    `;
    
    card.addEventListener('click', () => {
      selectedPriceItem = item.id;
      document.getElementById('current-price').textContent = `Rs. ${item.price.toFixed(2)}/piece`;
      document.getElementById('price-update-form').classList.remove('d-none');
      document.getElementById('new-price').value = '';
      renderPriceItems();
    });
    
    col.appendChild(card);
    itemsContainer.appendChild(col);
  });
}

function handleUpdatePrice() {
  if (!selectedPriceItem) {
    showToast('Please select an item first', 'danger');
    return;
  }
  
  const newPriceInput = document.getElementById('new-price');
  const newPrice = parseFloat(newPriceInput.value);
  
  if (isNaN(newPrice) || newPrice <= 0) {
    showToast('Please enter a valid price', 'danger');
    return;
  }
  
  // In a real app, this would update the price in an API
  // Here we just update our local data
  const item = LAUNDRY_ITEMS[selectedCategory].find(item => item.id === selectedPriceItem);
  if (item) {
    item.price = newPrice;
    document.getElementById('current-price').textContent = `Rs. ${newPrice.toFixed(2)}/piece`;
    renderPriceItems();
    showToast(`Price updated to Rs. ${newPrice.toFixed(2)}`, 'success');
    newPriceInput.value = '';
  }
}

// Delivery Requests Page
function initDeliveryRequestsPage() {
  // No specific initialization needed for this page as everything is handled in render
}

function renderDeliveryRequests() {
  const tableBody = document.getElementById('delivery-requests-table');
  tableBody.innerHTML = '';
  
  DELIVERY_REQUESTS.forEach(request => {
    const row = document.createElement('tr');
    row.className = 'border-bottom';
    
    const statusClass = getStatusClass(request.status);
    
    row.innerHTML = `
      <td class="p-3 fw-semibold">#${request.id}</td>
      <td class="p-3">
        <span class="status-badge ${statusClass}">${request.status}</span>
      </td>
      <td class="p-3">
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-secondary manage-btn" data-id="${request.id}">MANAGE</button>
          <button class="btn btn-sm btn-danger remove-btn" data-id="${request.id}">REMOVE</button>
        </div>
      </td>
    `;
    
    row.querySelector('.manage-btn').addEventListener('click', () => {
      // In a real app, this would navigate to the delivery request detail page
      showToast(`Managing delivery request #${request.id}`, 'info');
    });
    
    row.querySelector('.remove-btn').addEventListener('click', () => {
      removeDeliveryRequest(request.id);
    });
    
    tableBody.appendChild(row);
  });
}

function removeDeliveryRequest(id) {
  const index = DELIVERY_REQUESTS.findIndex(request => request.id === id);
  if (index !== -1) {
    DELIVERY_REQUESTS.splice(index, 1);
    renderDeliveryRequests();
    showToast(`Delivery request #${id} has been removed`, 'success');
  }
}

// Laundry Status Page
function initLaundryStatusPage() {
  document.getElementById('status-filter').addEventListener('change', renderLaundryOrders);
}

function renderLaundryOrders() {
  const tableBody = document.getElementById('laundry-status-table');
  tableBody.innerHTML = '';
  
  const filter = document.getElementById('status-filter').value;
  
  const filteredOrders = filter === 'all'
    ? LAUNDRY_ORDERS
    : LAUNDRY_ORDERS.filter(order => {
        if (filter === 'ready') return order.status === 'READY FOR COLLECTION';
        if (filter === 'notReady') return order.status === 'NOT READY';
        if (filter === 'collected') return order.status === 'COLLECTED';
        return true;
      });
  
  filteredOrders.forEach(order => {
    const row = document.createElement('tr');
    row.className = 'border-bottom';
    
    const statusClass = getStatusClass(order.status);
    
    row.innerHTML = `
      <td class="p-3 fw-semibold">#${order.id}</td>
      <td class="p-3">
        <span class="status-badge ${statusClass}">${order.status}</span>
      </td>
      <td class="p-3">
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-secondary change-status-btn" data-id="${order.id}">CHANGE STATUS</button>
          <button class="btn btn-sm btn-outline-primary view-bill-btn" data-id="${order.id}">VIEW BILL</button>
          ${order.status === 'COLLECTED' ? `<button class="btn btn-sm btn-danger remove-btn" data-id="${order.id}">REMOVE</button>` : ''}
        </div>
      </td>
    `;
    
    row.querySelector('.change-status-btn').addEventListener('click', () => {
      changeOrderStatus(order.id);
    });
    
    row.querySelector('.view-bill-btn').addEventListener('click', () => {
      viewBill(order.id);
    });
    
    if (order.status === 'COLLECTED') {
      row.querySelector('.remove-btn').addEventListener('click', () => {
        removeOrder(order.id);
      });
    }
    
    tableBody.appendChild(row);
  });
}

function changeOrderStatus(id) {
  const order = LAUNDRY_ORDERS.find(order => order.id === id);
  if (order) {
    // Rotate status
    if (order.status === 'NOT READY') {
      order.status = 'READY FOR COLLECTION';
    } else if (order.status === 'READY FOR COLLECTION') {
      order.status = 'COLLECTED';
    } else {
      order.status = 'NOT READY';
    }
    
    renderLaundryOrders();
    showToast(`Status updated for order #${id}`, 'success');
  }
}

function removeOrder(id) {
  const index = LAUNDRY_ORDERS.findIndex(order => order.id === id);
  if (index !== -1) {
    LAUNDRY_ORDERS.splice(index, 1);
    renderLaundryOrders();
    showToast(`Order #${id} has been removed`, 'success');
  }
}

function viewBill(id) {
  currentBillId = id;
  document.getElementById('bill-id').textContent = id;
  document.getElementById('bill-header-id').textContent = id;
  renderBillItems();
  navigateTo('bill-detail-page');
}

// Bill Detail Page
function initBillDetailPage() {
  document.getElementById('print-bill-btn').addEventListener('click', printBill);
}

function renderBillItems() {
  const tableBody = document.getElementById('bill-items');
  tableBody.innerHTML = '';
  
  let subtotal = 0;
  
  BILL_ITEMS.forEach(item => {
    const row = document.createElement('tr');
    row.className = 'border-bottom';
    
    row.innerHTML = `
      <td class="p-3">${item.name}</td>
      <td class="p-3 text-center">${item.quantity}</td>
      <td class="p-3 text-end">${item.price.toFixed(2)}</td>
      <td class="p-3 text-end">${item.total.toFixed(2)}</td>
    `;
    
    subtotal += item.total;
    tableBody.appendChild(row);
  });
  
  // Add total row
  const totalRow = document.createElement('tr');
  totalRow.className = 'fw-bold';
  totalRow.innerHTML = `
    <td colspan="3" class="p-3 text-end">TOTAL:</td>
    <td class="p-3 text-end">${subtotal.toFixed(2)}</td>
  `;
  tableBody.appendChild(totalRow);
}

function printBill() {
  showToast('Bill has been sent to the printer', 'success');
  window.print();
}

// Utility Functions
function getStatusClass(status) {
  switch (status) {
    case 'READY FOR DELIVERY':
    case 'READY FOR COLLECTION':
      return 'status-ready';
    case 'ASSIGNED TO DELIVERY PARTNER':
      return 'status-assigned';
    case 'OUT FOR DELIVERY':
      return 'status-out';
    case 'DELIVERED':
    case 'COLLECTED':
      return 'status-collected';
    default:
      return 'status-not-ready';
  }
}

function showToast(message, type = 'primary') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  
  // Set toast styling based on type
  toast.className = 'toast align-items-center border-0';
  toast.classList.add('show');
  
  switch (type) {
    case 'success':
      toast.classList.add('bg-success', 'text-white');
      break;
    case 'danger':
      toast.classList.add('bg-danger', 'text-white');
      break;
    case 'warning':
      toast.classList.add('bg-warning', 'text-dark');
      break;
    case 'info':
      toast.classList.add('bg-info', 'text-dark');
      break;
    default:
      toast.classList.add('bg-primary', 'text-white');
  }
  
  toastMessage.textContent = message;
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
