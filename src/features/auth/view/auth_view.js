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
        console.log('Showing success message:', message);
        $('#welcome_message').text(message).show();
        setTimeout(() => $('#welcome_message').fadeOut(500), 2500);
    },

    updateLoginState(isLoggedIn, name, role) {
        if (isLoggedIn) {
            // $('#login_form').hide(); // تم تعليقه عشان الـ Form تظل مرئية
            $('#logout_button').show();
            this.showWelcomeMessage(name);
        } else {
            $('#login_form').show();
            $('#logout_button').hide();
            $('#welcome_message').hide();
        }
    },

    showWelcomeMessage(name) {
        if (!name) {
            $('#welcome_message').text('Welcome, User!').show();
            setTimeout(() => $('#welcome_message').fadeOut(500), 2500);
            return;
        }
        $('#welcome_message').text(`Welcome, ${name}!`).show();
        setTimeout(() => $('#welcome_message').fadeOut(500), 2500);
    },

    togglePassword(fieldId) {
        const $field = $(`#${fieldId}`);
        const $icon = $('#toggle_icon');
        const type = $field.attr('type') === 'password' ? 'text' : 'password';
        $field.attr('type', type);
        $icon.toggleClass('bi-eye-slash bi-eye');
    },
};

export default AuthView;