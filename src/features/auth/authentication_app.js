import { AuthModel } from '../../../core/models/auth_model'; // أضيفي السطر ده

$(document).ready(function () {
    if ($('#login_form').length) {
        AuthController.handleLogin('login_form');
        AuthController.handleLogout();
        const user = AuthModel.getUser(); // استخدام AuthModel
        if (user) {
            AuthView.updateLoginState(true, user.email, user.role);
        }
    }

    if ($('#signup_form').length) {
        AuthController.handleSignup('signup_form');
        $('#role').trigger('change');
    }
});