import { AuthModel } from '../../../core/models/auth_model'; // تأكدي من المسار
import AuthView from '../view/auth_view';
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
                const user = AuthModel.getUser(); // استخدام AuthModel
                AuthView.showSuccess('Login successful!');
                AuthView.updateLoginState(true, user.email, user.role);
            }
        });
    },

    handleSignup(formId) {
        $('#role').on('change', function () {
            const isSeller = $(this).val() === 'seller';
            AuthView.toggleBusinessNameField(isSeller);
            if (isSeller) {
                $('#business_name').attr('required', true);
                $('#business_name').on('input', function () {
                    AuthView.clearValidation('business_name');
                    const businessName = $(this).val();
                    const businessNameError = Auth.validateBusinessName(businessName);
                    if (businessNameError) {
                        AuthView.showError('business_name', businessNameError);
                    } else if (businessName) {
                        AuthView.showValid('business_name');
                    }
                });
            } else {
                $('#business_name').removeAttr('required');
            }
        });

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

        $(`#${formId}`).on('submit', function (e) {
            e.preventDefault();

            const role = $(this).find('#role').val();
            const name = $(this).find('#name').val();
            const email = $(this).find('#email').val();
            const password = $(this).find('#password').val();
            const businessName = role === 'seller' ? $(this).find('#business_name').val() : null;

            const nameError = Auth.validateName(name);
            const emailError = Auth.validateEmail(email);
            const passwordError = Auth.validatePassword(password, true);
            const businessNameError = role === 'seller' ? Auth.validateBusinessName(businessName) : null;
            const saveError = Auth.saveUser({ role, name, email, password, businessName });

            AuthView.clearError('name');
            AuthView.clearError('email');
            AuthView.clearError('password');
            if (role === 'seller') AuthView.clearError('business_name');

            let isValid = true;
            if (nameError) {
                AuthView.showError('name', nameError);
                isValid = false;
            }
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

            if (isValid) {
                AuthView.showSuccess('Signup successful!');
                AuthView.clearForm(formId);
            }
        });
    },

    handleLogout() {
        $('#logout_button').on('click', function () {
            AuthModel.signOut(); // استخدام AuthModel
            AuthView.showSuccess('Logout successful!');
            AuthView.updateLoginState(false);
        });
    },
};

export default AuthController;