const Auth = {
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) ? null : 'Invalid email format';
    },
  
    validatePassword(password, isSignup = false) {
      if (password.length < 8) {
        return 'Password must be at least 8 characters';
      }
      if (isSignup) {
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        return passwordRegex.test(password)
          ? null
          : 'Password must include a number and special character';
      }
      return null;
    },
  
    validateBusinessName(businessName) {
      return businessName.trim() === '' ? 'Business name is required' : null;
    },
  
    authenticateUser(email, password) {
      // Simulate backend authentication using localStorage
      const storedUser = localStorage.getItem(email);
      if (!storedUser) return 'User not found';
      const user = JSON.parse(storedUser);
      return user.password === password ? null : 'Incorrect password';
    },
  
    saveUser(data) {
      // Simulate backend signup by storing in localStorage
      if (localStorage.getItem(data.email)) {
        return 'Email already exists';
      }
      localStorage.setItem(data.email, JSON.stringify(data));
      return null;
    },
  
    logoutUser() {
      // Simulate logout by clearing session
      sessionStorage.removeItem('currentUser');
      return true;
    },
  };