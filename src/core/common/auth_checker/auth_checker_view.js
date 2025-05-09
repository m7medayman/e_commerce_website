// core/common/auth_popup.js
export class AuthPopupView {
    constructor() {
        this.popupId = 'auth-popup-modal';
        this.popupElement = null;
    }

    render() {
        // Create modal if it doesn't exist
        if (!document.getElementById(this.popupId)) {
            const modalElement = document.createElement('div');
            modalElement.className = 'modal fade';
            modalElement.id = this.popupId;
            modalElement.tabIndex = -1;
            modalElement.setAttribute('aria-labelledby', `${this.popupId}-label`);
            modalElement.setAttribute('aria-hidden', 'true');

            modalElement.innerHTML = `
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header  text-white">
                            <h5 class="modal-title" id="${this.popupId}-label">Authentication Required</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="d-flex align-items-center mb-3">
                                <i class="fas fa-exclamation-circle text-warning fs-1 me-3"></i>
                                <p class="mb-0 message-text">You are not authenticated to perform this action. Please login to continue.</p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            
                            <button type="button" class="btn btn-primary login-btn">
                                <i class="fas fa-sign-in-alt me-2"></i>Login
                            </button>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modalElement);
            this.popupElement = modalElement;
        } else {
            this.popupElement = document.getElementById(this.popupId);
        }

        return this.popupElement;
    }

    updateMessage(actionDescription) {
        const messageElement = this.popupElement.querySelector('.message-text');
        messageElement.textContent = `You are not authenticated to ${actionDescription}. Please login to continue.`;
    }

    show() {
        const modal = new bootstrap.Modal(this.popupElement);
        modal.show();
    }

    hide() {
        const modal = bootstrap.Modal.getInstance(this.popupElement);
        if (modal) {
            modal.hide();
        }
    }

    addEventListeners(loginHandler) {
        // Add event listener to login button
        this.popupElement.querySelector('.login-btn').addEventListener('click', () => {
            this.hide();
            loginHandler();
        });
    }
}