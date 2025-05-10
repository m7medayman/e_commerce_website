// core/models/auth_popup_model.js
export class AuthPopupModel {
    constructor() {
        this.isVisible = false;
        this.actionCallback = null;
        this.actionDescription = "this action";
        
        // Singleton pattern - ensure only one popup exists
        if (AuthPopupModel.instance) {
            return AuthPopupModel.instance;
        }
        AuthPopupModel.instance = this;
    }
    
    show(actionDescription = "this action", actionCallback = null) {
        this.isVisible = true;
        this.actionDescription = actionDescription;
        this.actionCallback = actionCallback;
        return this;
    }
    
    hide() {
        this.isVisible = false;
        return this;
    }
    
    // Handle when user clicks login button
    handleLogin() {
        // Redirect to login page
        window.location.href = './login.html';
    }
    
    // Handle when user completes an action after successful authentication
    handleActionAfterAuth() {
        if (this.actionCallback && typeof this.actionCallback === 'function') {
            this.actionCallback();
        }
    }
}