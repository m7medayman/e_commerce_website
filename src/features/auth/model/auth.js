import { AuthModel } from '../../../core/models/auth_model.js';

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

    validateName(name) {
        return name.trim() === '' ? 'Name is required' : null;
    },

    authenticateUser(email, password) {
        try {
            AuthModel.signIn(email, password);
            return null; // نجاح
        } catch (error) {
            return error.message; // خطأ زي 'Invalid email or password'
        }
    },

    saveUser({ email, password, role, name, address, phone }) {
        try {
            const user = AuthModel.signUp({ email: email, password: password, role: role, name: name, address: address, phone: phone });
            // هنستخدم AuthModel.signIn عشان نسجل المستخدم مباشرة بعد التسجيل
            // AuthModel.signIn(data.email, data.password); // 
            return null; // نجاح
        } catch (error) {
            return error.message; // خطأ زي 'Email already exists'
        }
    },

    logoutUser() {
        try {
            AuthModel.signOut();
            return true;
        } catch (error) {
            return false;
        }
    },
};

export default Auth;