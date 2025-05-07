import {ProfileModel} from '../model/profile_model.js';
import {UserModel} from '../../../core/models/user_model.js';
export class AccountView {
    render() {
        const accountSection = document.getElementById('account-section');
        if (!accountSection) return;

        const loggedInUserId = localStorage.getItem('loggedInUserId');
        const user = UserModel.getById(loggedInUserId);
        const orders = ProfileModel.getOrders();

        if (!user) {
            accountSection.innerHTML = `<p>Error: User not found. Please log in again.</p>`;
            return;
        }

        accountSection.innerHTML = `
        
                <form id="account-details-form" class="needs-validation" novalidate>
                    <div class="row">
                        <div class="col-md-6 mb-4">
                            <label for="first-name" class="form-label">First name</label>
                            <input type="text" class="form-control rounded" id="first-name" value="${user.name.split(' ')[0] || ''}" required>
                            <div class="invalid-feedback">
                                Please enter your first name.
                            </div>
                        </div>
                        <div class="col-md-6 mb-4">
                            <label for="last-name" class="form-label ">Last name</label>
                            <input type="text" class="form-control rounded" id="last-name" value="${user.name.split(' ')[1] || ''}" required>
                            <div class="invalid-feedback">
                                Please enter your last name.
                            </div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label for="display-name" class="form-label">Display name</label>
                        <input type="text" class="form-control rounded" id="display-name" value="${user.name || ''}" required>
                        <div class="invalid-feedback">
                            Please enter a display name.
                        </div>
                    </div>
                    <div class="mb-4">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control rounded" id="email" value="${user.email || ''}" required>
                        <div class="invalid-feedback">
                            Please enter a valid email address.
                        </div>
                    </div>
                    <div class="mb-4">
                        <label for="phone" class="form-label">Phone (optional)</label>
                        <input type="tel" class="form-control rounded" id="phone" value="${user.phone || ''}">
                    </div>
                    <h4 class="mb-4">Password change</h4>
                    <div class="mb-4">
                        <label for="old-password" class="form-label">Current password (leave blank to leave unchanged)</label>
                        <input type="password" class="form-control rounded" id="old-password">
                        <div class="invalid-feedback">
                            Please enter your current password if changing.
                        </div>
                    </div>
                    <div class="mb-4">
                        <label for="new-password" class="form-label">New password (leave blank to leave unchanged)</label>
                        <input type="password" class="form-control rounded" id="new-password">
                        <div class="invalid-feedback">
                            Please enter a new password if changing.
                        </div>
                    </div>
                    <div class="mb-4">
                        <label for="repeat-password" class="form-label">Confirm new password</label>
                        <input type="password" class="form-control rounded" id="repeat-password">
                        <div class="invalid-feedback">
                            Passwords must match.
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary rounded mb-3">Save changes</button>
                </form>
                <div id="validation-message" class="mt-3" style="display: none;"></div>
            </div>
        `;

        // Bootstrap form validation with checkout-style real-time feedback
        const form = document.getElementById('account-details-form');
        const newPasswordInput = document.getElementById('new-password');
        const repeatPasswordInput = document.getElementById('repeat-password');
        const validationMessage = document.getElementById('validation-message');

        // Real-time password match validation
        const validatePasswords = () => {
            const newPassword = newPasswordInput.value;
            const repeatPassword = repeatPasswordInput.value;
            if (newPassword && newPassword !== repeatPassword) {
                repeatPasswordInput.setCustomValidity('Passwords must match');
                repeatPasswordInput.classList.add('is-invalid');
            } else {
                repeatPasswordInput.setCustomValidity('');
                repeatPasswordInput.classList.remove('is-invalid');
                if (repeatPassword) repeatPasswordInput.classList.add('is-valid');
            }
        };

        newPasswordInput.addEventListener('input', validatePasswords);
        repeatPasswordInput.addEventListener('input', validatePasswords);

        // Form submission handler
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!form.checkValidity()) {
                e.stopPropagation();
                form.classList.add('was-validated');
                validationMessage.style.display = 'block';
                validationMessage.innerHTML = '<div class="alert alert-danger" role="alert">Please fix the errors in the form before submitting.</div>';
            } else {
                const firstName = document.getElementById('first-name').value;
                const lastName = document.getElementById('last-name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const newPassword = document.getElementById('new-password').value;
                const oldPassword = document.getElementById('old-password').value;

                // Validate old password if new password is provided
                if (newPassword && oldPassword !== user.password) {
                    validationMessage.style.display = 'block';
                    validationMessage.innerHTML = '<div class="alert alert-danger" role="alert">Current password is incorrect.</div>';
                    return;
                }

                // Prepare updates
                const updates = {
                    name: `${firstName} ${lastName}`,
                    email,
                    phone: phone || null
                };
                if (newPassword) {
                    updates.password = newPassword; // In production, hash this
                }

                try {
                    UserModel.update(loggedInUserId, updates);
                    form.classList.remove('was-validated');
                    validationMessage.style.display = 'block';
                    validationMessage.innerHTML = '<div class="alert alert-success" role="alert">Account details updated successfully!</div>';
                    setTimeout(() => {
                        validationMessage.style.display = 'none';
                        this.render(); // Re-render to show updated details
                    }, 3000);
                } catch (error) {
                    validationMessage.style.display = 'block';
                    validationMessage.innerHTML = `<div class="alert alert-danger" role="alert">${error.message}</div>`;
                }
            }
        });

        // Prevent submission if invalid on change
        form.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                if (!form.checkValidity()) {
                    form.classList.add('was-validated');
                }
            });
        });
    }
}