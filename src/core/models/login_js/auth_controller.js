const AuthController = {
    handleLogin(formId) {
      $(`#${formId}`).on('submit', function (e) {
        e.preventDefault();
  
        const email = $(this).find('#email').val();
        const password = $(this).find('#password').val();
  
        // Validate inputs
        const emailError = Auth.validateEmail(email);
        const authError = Auth.authenticateUser(email, password);
  
        // Clear previous errors
        AuthView.clearError('email');
        AuthView.clearError('password');
  
        // Show errors if any
        let isValid = true;
        if (emailError) {
          AuthView.showError('email', emailError);
          isValid = false;
        }
        if (authError) {
          AuthView.showError('password', authError);
          isValid = false;
        }
  
        // Proceed if valid
        if (isValid) {
          sessionStorage.setItem('currentUser', email);
          AuthView.showSuccess('Login successful!');
          AuthView.updateLoginState(true);
        }
      });
    },
  
    handleSignup(formId) {
      // Toggle business name field based on role
      $('#role').on('change', function () {
        const isSeller = $(this).val() === 'seller';
        AuthView.toggleBusinessNameField(isSeller);
        if (isSeller) {
          $('#business_name').attr('required', true);
        } else {
          $('#business_name').removeAttr('required');
        }
      });
  
      $(`#${formId}`).on('submit', function (e) {
        e.preventDefault();
  
        const role = $(this).find('#role').val();
        const email = $(this).find('#email').val();
        const password = $(this).find('#password').val();
        const businessName = role === 'seller' ? $(this).find('#business_name').val() : null;
  
        // Validate inputs
        const emailError = Auth.validateEmail(email);
        const passwordError = Auth.validatePassword(password, true);
        const businessNameError = role === 'seller' ? Auth.validateBusinessName(businessName) : null;
        const saveError = Auth.saveUser({ role, email, password, businessName });
  
        // Clear previous errors
        AuthView.clearError('email');
        AuthView.clearError('password');
        if (role === 'seller') AuthView.clearError('business_name');
  
        // Show errors if any
        let isValid = true;
        if (emailError) {
          AuthView.showError('email', emailError);
          isValid = false;
        }
        if (passwordError) {
          AuthView.showError('password', passwordError);
          isValid = false;
        }
        if (businessNameError) {
          AuthView.showError('business_name', businessNameError);
          isValid = false;
        }
        if (saveError) {
          AuthView.showError('email', saveError);
          isValid = false;
        }
  
        // Proceed if valid
        if (isValid) {
          AuthView.showSuccess('Signup successful!');
          AuthView.clearForm(formId);
        }
      });
    },
  
    handleLogout() {
      $('#logout_button').on('click', function () {
        const success = Auth.logoutUser();
        if (success) {
          AuthView.showSuccess('Logout successful!');
          AuthView.updateLoginState(false);
        }
      });
    },
  };