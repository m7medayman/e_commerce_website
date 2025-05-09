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

    validatePhone(phone) {
        const phoneRegex = /^(010|011|012|015)\d{8}$/;
        return phoneRegex.test(phone) ? null : 'Phone number must be 11 digits and start with 010, 011, 012, or 015';
    },

    validateAddress(address) {
        if (!address || typeof address !== 'string' || address.trim() === '') {
            return 'Address is required';
        }
        return null;
    },

    authenticateUser(email, password) {
        try {
            AuthModel.signIn(email, password);
            return null;
        } catch (error) {
            return error.message;
        }
    },

    saveUser({ email, password, role, name, address, phone }) {
        try {
            const user = AuthModel.signUp({ email, password, role, name, address, phone });
            return null;
        } catch (error) {
            return error.message;
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