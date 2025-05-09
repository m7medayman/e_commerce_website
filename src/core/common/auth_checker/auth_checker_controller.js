// core/controllers/auth_popup_controller.js
import { AuthPopupModel } from './auth_checker_model.js';
import { AuthPopupView } from './auth_checker_view.js';

export class AuthPopupController {
    constructor() {
        this.model = new AuthPopupModel();
        this.view = new AuthPopupView();

        // Singleton pattern
        if (AuthPopupController.instance) {
            return AuthPopupController.instance;
        }
        AuthPopupController.instance = this;

        // Initialize the popup
        this.init();
    }

    init() {
        // Render the popup
        this.view.render();

        // Add event listeners
        this.view.addEventListeners(() => {
            this.model.handleLogin();
        });
    }

    showAuthPopup(actionDescription = "perform this action", callback = null) {
        // Update model
        this.model.show(actionDescription, callback);

        // Update view
        this.view.updateMessage(actionDescription);
        this.view.show();
    }

    hideAuthPopup() {
        this.model.hide();
        this.view.hide();
    }

    // Static method for easy access
    static show(actionDescription, callback) {
        const controller = new AuthPopupController();
        controller.showAuthPopup(actionDescription, callback);
    }
}