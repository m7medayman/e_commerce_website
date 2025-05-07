import {WishlistModel} from '../../../core/models/wish_model.js';
import { AuthModel } from '../../../core/models/auth_model.js';

export class WishlistView {
    render() {
        const wishlistSection = document.getElementById('wishlist-section');
        if (!wishlistSection) return;

        const user = AuthModel.getUser();
        if (!user) {
            wishlistSection.innerHTML = `<p class="text-muted">Please log in to view wishlist.</p>`;
            return;
        }

        const wishlistItems = WishlistModel.getByUserId(user.userId);
        if (!wishlistItems || wishlistItems.length === 0) {
            wishlistSection.innerHTML = `<p class="text-muted">No items in wishlist.</p>`;
            return;
        }

        wishlistSection.innerHTML = `
            <h3 class="mb-4">Wishlist</h3>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${wishlistItems.flatMap(item => item.items.map(w => `
                        <tr>
                            <td>${w.name || 'Unnamed Item'}</td>
                            <td>${w.price || 'N/A'}</td>
                            <td><button class="btn btn-dark btn-sm">${w.action || 'Add to Cart'}</button></td>
                        </tr>
                    `)).join('')}
                </tbody>
            </table>
        `;
    }
}