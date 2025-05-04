import { AuthModel } from '../../core/models/auth_model.js';
import AuthController from './controller/auth_controller.js';
import AuthView from './view/auth_view.js';

$(document).ready(function () {
    if ($('#login_form').length) {
        AuthController.handleLogin('login_form');
        AuthController.handleLogout();
        const user = AuthModel.getUser();
        if (user) {
            AuthView.updateLoginState(true, user.email, user.role);
        }
    }

    if ($('#signup_form').length) {
        AuthController.handleSignup('signup_form');
        $('#role').trigger('change');
    }
});