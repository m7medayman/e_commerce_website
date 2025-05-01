$(document).ready(function () {
  if ($('#login_form').length) {
    AuthController.handleLogin('login_form');
    AuthController.handleLogout();
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(localStorage.getItem(currentUser));
      AuthView.updateLoginState(true, currentUser, userData.role);
    }
  }

  if ($('#signup_form').length) {
    AuthController.handleSignup('signup_form');
    $('#role').trigger('change');
  }
});