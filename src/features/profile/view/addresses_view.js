import { UserModel } from "../../../core/models/user_model.js";

export class AddressesView {
    render(address, user) {
        const addressesSection = document.getElementById('addresses-section');
        if (!addressesSection) {
            console.error("Addresses section element not found.");
            return;
        }

        if (!user) {
            console.warn("No user data provided.");
            addressesSection.innerHTML = `<p class="text-muted">Please log in to view addresses.</p>`;
            return;
        }

        try {
            addressesSection.innerHTML = `
                <h3 class="mb-4">Addresses</h3>
                <div class="row">
                    <div class="col-12 col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title d-flex justify-content-between align-items-center">
                                    Address
                                    <a href="#" class="edit-address btn btn-link p-0 text-decoration-none" data-index="0">Edit</a>
                                </h5>
                                <p class="card-text">${user.name}</p>
                                <p class="card-text">${address || 'No address provided'}</p>
                                <div class="edit-form" style="display: none;" data-index="0">
                                    <form class="mt-3">
                                        <div class="mb-3">
                                            <label class="form-label">Address</label>
                                            <textarea class="form-control" rows="3" id="address-input">${address || ''}</textarea>
                                            <div class="invalid-feedback">
                                                Please enter an address.
                                            </div>
                                        </div>
                                        <div>
                                        <button type="submit" class="btn btn-dark btn-sm">Save</button>
                                        <button type="button" class="btn btn-secondary btn-sm ms-2 cancel-edit">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Edit functionality
            const editButton = addressesSection.querySelector('.edit-address');
            const editForm = addressesSection.querySelector('.edit-form');
            if (editButton && editForm) {
                editButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    editForm.style.display = 'block';
                    editButton.style.display = 'none';
                });

                const cancelButton = addressesSection.querySelector('.cancel-edit');
                if (cancelButton) {
                    cancelButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        editForm.style.display = 'none';
                        editButton.style.display = 'inline';
                    });
                }

                const form = addressesSection.querySelector('.edit-form form');
                if (form) {
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        const newAddress = document.getElementById('address-input').value.trim();
                        if (!newAddress) {
                            alert('Address cannot be empty.');
                            return;
                        }

                        try {
                            UserModel.update(user.userId, { address: newAddress });
                            this.render(newAddress, user); // Re-render with updated address
                        } catch (error) {
                            console.error("Error updating address:", error.message);
                            alert(error.message);
                        }
                    });
                }
            }
        } catch (error) {
            console.error("Error rendering addresses:", error.message);
            addressesSection.innerHTML = `<p class="text-danger">An error occurred while loading addresses. Please try again.</p>`;
        }
    }
}