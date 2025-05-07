import { UserModel } from "../../../core/models/user_model.js";
export class AddressesView {
    render() {
        const addressesSection = document.getElementById('addresses-section');
        if (!addressesSection) return;

        const loggedInUserId = localStorage.getItem('loggedInUserId');
        const user = UserModel.getById(loggedInUserId);

        if (!user || !user.addresses || user.addresses.length === 0) {
            addressesSection.innerHTML = `<p class="text-muted">No addresses found. Please add an address.</p>`;
            return;
        }

        addressesSection.innerHTML = `
            <h3 class="mb-4">Address</h3>
            <div class="row">
                ${user.addresses.map((address, index) => `
                    <div class="col-12 col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title d-flex justify-content-between align-items-center">
                                    ${address.type.charAt(0).toUpperCase() + address.type.slice(1)} Address
                                    <a href="#" class="edit-address btn btn-link p-0 text-decoration-none" data-index="${index}">Edit</a>
                                </h5>
                                <p class="card-text">${user.name}</p>
                                <p class="card-text">${address.street}, ${address.city}, ${address.country}</p>
                                <div class="edit-form" style="display: none;" data-index="${index}">
                                    <form class="mt-3">
                                        <div class="mb-3">
                                            <label class="form-label">Street</label>
                                            <input type="text" class="form-control" value="${address.street}">
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">City</label>
                                            <input type="text" class="form-control" value="${address.city}">
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Country</label>
                                            <input type="text" class="form-control" value="${address.country}">
                                        </div>
                                        <button type="submit" class="btn btn-primary btn-sm">Save</button>
                                        <button type="button" class="btn btn-secondary btn-sm ms-2 cancel-edit">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Edit functionality
        addressesSection.querySelectorAll('.edit-address').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const index = button.getAttribute('data-index');
                const editForm = addressesSection.querySelector(`.edit-form[data-index="${index}"]`);
                editForm.style.display = 'block';
                button.style.display = 'none';
            });
        });

        addressesSection.querySelectorAll('.cancel-edit').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const index = button.closest('.edit-form').getAttribute('data-index');
                const editForm = addressesSection.querySelector(`.edit-form[data-index="${index}"]`);
                const editButton = addressesSection.querySelector(`.edit-address[data-index="${index}"]`);
                editForm.style.display = 'none';
                editButton.style.display = 'inline';
            });
        });

        addressesSection.querySelectorAll('.edit-form form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const index = form.closest('.edit-form').getAttribute('data-index');
                const street = form.querySelector('input:nth-child(2)').value;
                const city = form.querySelector('input:nth-child(4)').value;
                const country = form.querySelector('input:nth-child(6)').value;

                const addresses = user.addresses.map((addr, i) => 
                    i === parseInt(index) ? { ...addr, street, city, country } : addr
                );
                try {
                    UserModel.update(loggedInUserId, { addresses });
                    this.render(); // Re-render to show updated address
                } catch (error) {
                    alert(error.message);
                }
            });
        });
    }
}