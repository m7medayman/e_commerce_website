const AuthView = {
  showError(fieldId, message) {
    $(`#${fieldId}`).addClass('is-invalid').removeClass('is-valid');
    $(`#${fieldId}_error`).text(message);
  },

  clearError(fieldId) {
    $(`#${fieldId}`).removeClass('is-invalid');
    $(`#${fieldId}_error`).text('');
  },

  showValid(fieldId) {
    $(`#${fieldId}`).addClass('is-valid').removeClass('is-invalid');
    $(`#${fieldId}_error`).text('');
  },

  clearValidation(fieldId) {
    $(`#${fieldId}`).removeClass('is-invalid is-valid');
    $(`#${fieldId}_error`).text('');
  },

  clearForm(formId) {
    $(`#${formId}`)[0].reset();
    $(`#${formId} .form-control`).removeClass('is-invalid is-valid');
    $(`#${formId} .invalid-feedback`).text('');
  },

  showSuccess(message) {
    alert(message);
  },

  toggleBusinessNameField(show) {
    $('#business_name_field').css('display', show ? 'block' : 'none');
  },

  updateLoginState(isLoggedIn, email, role) {
    if (isLoggedIn) {
      $('#login_form').hide();
      $('#logout_button').show();
      this.showWelcomeMessage(email, role);
    } else {
      $('#login_form').show();
      $('#logout_button').hide();
      $('#welcome_message').hide();
    }
  },

  showWelcomeMessage(email, role) {
    $('#welcome_message').text(`Welcome, ${role.charAt(0).toUpperCase() + role.slice(1)} ${email}!`);
    $('#welcome_message').show();
  },

  togglePassword(fieldId) {
    const $field = $(`#${fieldId}`);
    const $icon = $('#toggle_icon');
    const type = $field.attr('type') === 'password' ? 'text' : 'password';
    $field.attr('type', type);
    $icon.toggleClass('bi-eye-slash bi-eye');
  },
};