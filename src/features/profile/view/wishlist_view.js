import {ProfileModel} from '../model/profile_model.js';
export class WishlistView {
  render() {
      const wishlistSection = document.getElementById('wishlist-section');
      if (!wishlistSection) return;

      const wishlist = ProfileModel.getWishlist();

      wishlistSection.innerHTML = `
          <h3>Your Wishlist</h3>
          <table class="table">
              <thead>
                  <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  ${wishlist.map(item => `
                      <tr>
                          <td><img src="https://via.placeholder.com/50" alt="${item.name}" style="width: 50px;"> ${item.name}</td>
                          <td>${item.price}</td>
                          <td><button class="btn btn-dark">${item.action}</button></td>
                      </tr>
                  `).join('')}
              </tbody>
          </table>
      `;
  }
}