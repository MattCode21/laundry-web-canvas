
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const loginForm = document.getElementById('login-form');
  const logoutButton = document.getElementById('logout-button');
  const allPages = document.querySelectorAll('.page');
  const navButtons = document.querySelectorAll('[data-page]');
  
  // Mock user data (in a real app, this would come from a server)
  const mockUser = {
    name: 'Admin User',
    adminId: 'A12345',
    role: 'Administrator',
    avatar: '/profile-placeholder.png'
  };

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
        navigateToPage('dashboard-page');
      } else {
        alert('Invalid username or password');
      }
    });
  }
  
  // Handle logout
  if (logoutButton) {
    logoutButton.addEventListener('click', function() {
      localStorage.removeItem('isAuthenticated');
      navigateToPage('login-page');
    });
  }
  
  // Handle navigation buttons
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetPage = this.getAttribute('data-page');
      navigateToPage(targetPage + '-page');
    });
  });
  
  // Check authentication status on page load
  function checkAuth() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (isAuthenticated) {
      navigateToPage('dashboard-page');
    } else {
      navigateToPage('login-page');
    }
  }
  
  // Navigate to a specific page
  function navigateToPage(pageId) {
    // Hide all pages
    allPages.forEach(page => {
      page.classList.remove('active');
    });
    
    // Show the target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
    }
  }
  
  // Initialize the app
  checkAuth();
});
