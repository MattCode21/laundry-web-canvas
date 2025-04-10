
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const loginForm = document.getElementById('login-form');
  const logoutButtons = document.querySelectorAll('[id^="logout-button"]');
  const allPages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('[data-page]');
  const placeOrderBtn = document.getElementById('place-order-btn');
  const saveAllPricesBtn = document.getElementById('save-all-prices');
  const addItemButtons = document.querySelectorAll('.add-item');
  const requireDelivery = document.getElementById('require-delivery');
  
  // Mock user data (in a real app, this would come from a server)
  const mockUser = {
    name: 'Admin User',
    adminId: 'A12345',
    role: 'Administrator',
    avatar: '/profile-placeholder.png'
  };

  // Initialize Charts for Dashboard
  if (document.getElementById('revenueChart')) {
    initializeCharts();
  }

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      // Simple validation
      if (!username || !password) {
        alert('Please enter both username and password');
        return;
      }
      
      // Mock authentication (in a real app, this would be a server request)
      if (username === 'admin' && password === 'password') {
        // Save authentication state
        localStorage.setItem('isAuthenticated', 'true');
        
        // Navigate to dashboard
        navigateToPage('dashboard');
      } else {
        alert('Invalid username or password');
      }
    });
  }
  
  // Handle logout
  logoutButtons.forEach(button => {
    if (button) {
      button.addEventListener('click', function() {
        localStorage.removeItem('isAuthenticated');
        navigateToPage('login');
      });
    }
  });
  
  // Handle navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const targetPage = this.getAttribute('data-page');
      navigateToPage(targetPage);
    });
  });

  // Handle adding items to order
  if (addItemButtons) {
    addItemButtons.forEach(button => {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        const itemName = row.cells[0].textContent;
        const quantity = parseInt(row.querySelector('.item-qty').value);
        const price = parseFloat(row.cells[2].textContent.replace('$', ''));
        
        if (quantity > 0) {
          addToOrderSummary(itemName, quantity, price);
          updateOrderTotals();
          row.querySelector('.item-qty').value = 0;
        }
      });
    });
  }

  // Handle delivery checkbox
  if (requireDelivery) {
    requireDelivery.addEventListener('change', function() {
      updateOrderTotals();
    });
  }

  // Handle place order button
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', function() {
      const customerName = document.getElementById('customer-name').value;
      if (!customerName) {
        alert('Please enter customer name before placing order.');
        return;
      }
      
      const orderSummary = document.getElementById('order-summary');
      if (orderSummary.querySelector('.no-items')) {
        alert('Please add at least one item to the order.');
        return;
      }
      
      alert('Order placed successfully!');
      // In a real app, this would send the order to the server
      // and then redirect to a confirmation page or back to dashboard
      navigateToPage('dashboard');
    });
  }

  // Handle save all prices button
  if (saveAllPricesBtn) {
    saveAllPricesBtn.addEventListener('click', function() {
      alert('Price list updated successfully!');
      // In a real app, this would send the updated prices to the server
    });
  }
  
  // Add item to order summary
  function addToOrderSummary(name, quantity, price) {
    const orderSummary = document.getElementById('order-summary');
    const tbody = orderSummary.querySelector('tbody');
    const noItemsRow = tbody.querySelector('.no-items');
    
    if (noItemsRow) {
      noItemsRow.remove();
    }
    
    // Check if item already exists in the order
    const existingRow = Array.from(tbody.querySelectorAll('tr')).find(
      row => row.cells[0].textContent === name
    );
    
    if (existingRow) {
      const currentQty = parseInt(existingRow.cells[1].textContent);
      const newQty = currentQty + quantity;
      existingRow.cells[1].textContent = newQty;
      existingRow.cells[3].textContent = '$' + (newQty * price).toFixed(2);
    } else {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${name}</td>
        <td>${quantity}</td>
        <td>$${price.toFixed(2)}</td>
        <td>$${(quantity * price).toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger remove-item">
            <i class="fas fa-times"></i>
          </button>
        </td>
      `;
      
      tbody.appendChild(newRow);
      
      // Add event listener to the remove button
      newRow.querySelector('.remove-item').addEventListener('click', function() {
        newRow.remove();
        
        if (tbody.children.length === 0) {
          const noItemsRow = document.createElement('tr');
          noItemsRow.className = 'no-items';
          noItemsRow.innerHTML = '<td colspan="5" class="text-center">No items added to order</td>';
          tbody.appendChild(noItemsRow);
        }
        
        updateOrderTotals();
      });
    }
  }
  
  // Update order totals
  function updateOrderTotals() {
    const orderSummary = document.getElementById('order-summary');
    const tbody = orderSummary.querySelector('tbody');
    const noItems = tbody.querySelector('.no-items');
    
    let subtotal = 0;
    
    if (!noItems) {
      Array.from(tbody.querySelectorAll('tr')).forEach(row => {
        const totalStr = row.cells[3].textContent.replace('$', '');
        subtotal += parseFloat(totalStr);
      });
    }
    
    const tax = subtotal * 0.1;
    const deliveryFee = requireDelivery && requireDelivery.checked ? 5.00 : 0.00;
    const total = subtotal + tax + deliveryFee;
    
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('delivery-fee').textContent = '$' + deliveryFee.toFixed(2);
    document.getElementById('total-amount').textContent = '$' + total.toFixed(2);
  }
  
  // Initialize Dashboard Charts
  function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Revenue',
          data: [1500, 1800, 2200, 1900, 2500, 2800, 3200, 3600, 3100, 3400, 3800, 4200],
          borderColor: '#1976d2',
          backgroundColor: 'rgba(25, 118, 210, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value;
              }
            }
          }
        }
      }
    });
    
    // Service Distribution Chart
    const serviceCtx = document.getElementById('serviceChart').getContext('2d');
    const serviceChart = new Chart(serviceCtx, {
      type: 'doughnut',
      data: {
        labels: ['Wash & Fold', 'Dry Cleaning', 'Wash & Iron', 'Stain Removal', 'Others'],
        datasets: [{
          data: [45, 25, 20, 5, 5],
          backgroundColor: [
            '#1976d2',
            '#ff9800',
            '#4caf50',
            '#f44336',
            '#9c27b0'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
  
  // Navigate to a specific page
  function navigateToPage(pageId) {
    // Hide all pages
    allPages.forEach(page => {
      page.classList.remove('active');
    });
    
    // Show the target page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
      targetPage.classList.add('active');
    }
    
    // Update active nav link
    navLinks.forEach(link => {
      if (link.getAttribute('data-page') === pageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  // Check authentication status on page load
  function checkAuth() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (isAuthenticated) {
      navigateToPage('dashboard');
    } else {
      navigateToPage('login');
    }
  }
  
  // Initialize the app
  checkAuth();
});
