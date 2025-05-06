import { ProfileModel } from "../model/profile_model.js";
export class AddressesView {
  render() {
      const addressesSection = document.getElementById('addresses-section');
      if (!addressesSection) return;

      const addresses = ProfileModel.getAddresses();

      addressesSection.innerHTML = `
          <h3 class="mb-4">Addresses</h3>
          <p class="mb-4">The following addresses will be used on the checkout page by default.</p>
          <div class="row">
              ${addresses.map(addr => `
                  <div class="col-12 col-md-6 mb-4">
                      <h5 class="address-type">${addr.type} Address <a href="#" class="edit-address">Edit</a></h5>
                      <p class="address-details">
                          ${addr.street}<br>
                          ${addr.city}, ${addr.state}, ${addr.country}
                      </p>
                  </div>
              `).join('')}
          </div>
      `;
  }
}