const AuthView = {
    showError(fieldId, message) {
      $(`#${fieldId}`).addClass('is-invalid');
      $(`#${fieldId}_error`).text(message);
    },
  
    clearError(fieldId) {
      $(`#${fieldId}`).removeClass('is-invalid');
      $(`#${fieldId}_error`).text('');
    },
  
    clearForm(formId) {
      $(`#${formId}`)[0].reset();
      $(`#${formId} .form-control`).removeClass('is-invalid');
      $(`#${formId} .invalid-feedback`).text('');
    },
  
    showSuccess(message) {
      alert(message); // Replace with Bootstrap toast for production
    },
  
    toggleBusinessNameField(show) {
      $('#business_name_field').css('display', show ? 'block' : 'none');
    },
  
    updateLoginState(isLoggedIn) {
      if (isLoggedIn) {
        $('#login_form').hide();
        $('#logout_button').show();
      } else {
        $('#login_form').show();
        $('#logout_button').hide();
      }
    },
  };