import { AuthModel } from '../../../core/models/auth_model.js';
import Auth from '../model/auth.js';
import AuthView from '../view/auth_view.js';

const AuthController = {
    handleLogin(formId) {
        $('#email').on('input', function () {
            AuthView.clearValidation('email');
            const email = $(this).val();
            const emailError = Auth.validateEmail(email);
            if (emailError) {
                AuthView.showError('email', emailError);
            } else if (email) {
                AuthView.showValid('email');
            }
        });

        $('#password').on('input', function () {
            AuthView.clearValidation('password');
            const password = $(this).val();
            const passwordError = Auth.validatePassword(password);
            if (passwordError) {
                AuthView.showError('password', passwordError);
            } else if (password) {
                AuthView.showValid('password');
            }
        });

        $(`#${formId}`).on('submit', function (e) {
            e.preventDefault();

            const email = $(this).find('#email').val();
            const password = $(this).find('#password').val();

            const emailError = Auth.validateEmail(email);
            const authError = Auth.authenticateUser(email, password);

            AuthView.clearError('email');
            AuthView.clearError('password');

            let isValid = true;
            if (emailError) {
                AuthView.showError('email', emailError);
                isValid = false;
            }
            if (authError) {
                AuthView.showError('password', authError);
                isValid = false;
            }

            if (isValid) {
                const user = AuthModel.getUser();
                if (!user || !user.name) {
                    AuthView.showError('email', 'Failed to retrieve user data');
                    return;
                }
                AuthView.showSuccess(`Welcome, ${user.name}!`);
                AuthView.updateLoginState(true, user.name, user.role);
                switch (user.role) {
                    case 'customer':
                        setTimeout(() => window.location.href = 'home.html', 2000);
                        break;
                    case 'admin':
                     setTimeout(() => window.location.href = 'admin_panel.html', 2000);
                        break;
                    case 'seller':
                        setTimeout(() => window.location.href = 'seller/dashboard.html', 2000);
                        break;

                }
                // setTimeout(() => window.location.href = 'home.html', 3000);
            }
        });
    },

    handleSignup(formId) {
        $('#name').on('input', function () {
            AuthView.clearValidation('name');
            const name = $(this).val();
            const nameError = Auth.validateName(name);
            if (nameError) {
                AuthView.showError('name', nameError);
            } else if (name) {
                AuthView.showValid('name');
            }
        });

        $('#email').on('input', function () {
            AuthView.clearValidation('email');
            const email = $(this).val();
            const emailError = Auth.validateEmail(email);
            if (emailError) {
                AuthView.showError('email', emailError);
            } else if (email) {
                AuthView.showValid('email');
            }
        });

        $('#password').on('input', function () {
            AuthView.clearValidation('password');
            const password = $(this).val();
            const passwordError = Auth.validatePassword(password, true);
            if (passwordError) {
                AuthView.showError('password', passwordError);
            } else if (password) {
                AuthView.showValid('password');
            }
        });

        $('#phone').on('input', function () {
            AuthView.clearValidation('phone');
            const phone = $(this).val() || '';
            const phoneError = Auth.validatePhone(phone);
            if (phoneError) {
                AuthView.showError('phone', phoneError);
            } else if (phone) {
                AuthView.showValid('phone');
            }
        });

        $('#address').on('input', function () {
            AuthView.clearValidation('address');
            const address = $(this).val() || '';
            const addressError = Auth.validateAddress(address);
            if (addressError) {
                AuthView.showError('address', addressError);
            } else if (address) {
                AuthView.showValid('address');
            }
        });

        $(`#${formId}`).on('submit', function (e) {
            e.preventDefault();

            const role = $(this).find('#role').val() || '';
            const name = $(this).find('#name').val() || '';
            const email = $(this).find('#email').val() || '';
            const password = $(this).find('#password').val() || '';
            const phone = $(this).find('#phone').val() || '';
            const address = $(this).find('#address').val() || '';

            const nameError = Auth.validateName(name);
            const emailError = Auth.validateEmail(email);
            const passwordError = Auth.validatePassword(password, true);
            const phoneError = Auth.validatePhone(phone);
            const addressError = Auth.validateAddress(address);
            const saveError = Auth.saveUser({ email, password, role, name, phone, address });

            console.log('Validation Results:', {
                nameError,
                emailError,
                passwordError,
                phoneError,
                addressError,
                saveError
            });

            AuthView.clearError('name');
            AuthView.clearError('email');
            AuthView.clearError('password');
            AuthView.clearError('phone');
            AuthView.clearError('address');

            let isValid = true;
            if (nameError) {
                console.log('Name Error:', nameError);
                AuthView.showError('name', nameError);
                isValid = false;
            }
            if (emailError) {
                console.log('Email Error:', emailError);
                AuthView.showError('email', emailError);
                isValid = false;
            }
            if (passwordError) {
                console.log('Password Error:', passwordError);
                AuthView.showError('password', passwordError);
                isValid = false;
            }
            if (phoneError) {
                console.log('Phone Error:', phoneError);
                AuthView.showError('phone', phoneError);
                isValid = false;
            }
            if (addressError) {
                console.log('Address Error:', addressError);
                AuthView.showError('address', addressError);
                isValid = false;
            }
            if (saveError) {
                console.log('Save Error:', saveError);
                AuthView.showError('email', saveError);
                isValid = false;
            }

            console.log('Is Valid:', isValid);

            if (isValid) {
                AuthView.showSuccess(`Signed up successfully, welcome ${name}!`);
                AuthView.clearForm(formId);
                setTimeout(() => window.location.href = 'login.html', 3000);
            }
        });
    },

    handleLogout() {
        $('#logout_button').on('click', function () {
            const success = Auth.logoutUser();
            if (success) {
                AuthView.showSuccess('Logout successful!');
                AuthView.updateLoginState(false);
                setTimeout(() => window.location.href = 'login.html', 3000);
            } else {
                AuthView.showError('logout_button', 'Failed to logout');
            }
        });
    },
};

export default AuthController;