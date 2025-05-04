import { UserModel } from './user_model';
export class AuthModel {
    static STORAGE_KEY = 'auth_user_id';

    // Sign in a user if no one is signed in
    static signIn(email, password) {
        if (this.isSignedIn()) {
            throw new Error('A user is already signed in');
        }

        const user = UserModel.getByEmail(email);
        if (!user || user.password !== password) {
            throw new Error('Invalid email or password');
        }

        localStorage.setItem(this.STORAGE_KEY, user.userId);
        return true;
    }

    // Sign out the currently signed-in user
    static signOut() {
        if (!this.isSignedIn()) {
            throw new Error('No user is currently signed in');
        }
        localStorage.removeItem(this.STORAGE_KEY);
        return true;
    }

    // Check if a user is currently signed in
    static isSignedIn() {
        return !!localStorage.getItem(this.STORAGE_KEY);
    }

    // Get the full user data of the signed-in user
    static getUser() {
        const userId = localStorage.getItem(this.STORAGE_KEY);
        if (!userId) return null;
        return UserModel.getById(userId);
    }
    static signUp({ email, password, role, name, address, phone }) {
        return UserModel.add({ email, password, role, name, address, phone });
    }
}