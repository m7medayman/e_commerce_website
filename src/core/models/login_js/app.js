$(document).ready(function () {
    // Initialize login form
    if ($('#login_form').length) {
      AuthController.handleLogin('login_form');
      AuthController.handleLogout();
      // Check if user is logged in
      const currentUser = sessionStorage.getItem('currentUser');
      AuthView.updateLoginState(!!currentUser);
    }
  
    // Initialize signup form
    if ($('#signup_form').length) {
      AuthController.handleSignup('signup_form');
      // Trigger role change to set initial state
      $('#role').trigger('change');
    }
  });