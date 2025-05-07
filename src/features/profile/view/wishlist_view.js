import {WishlistModel} from '../../../core/models/wish_model.js';
import { AuthModel } from '../../../core/models/auth_model.js';

export class WishlistView {
    render(wishlist) {
        const wishlistSection = document.getElementById('wishlist-section');
        if (!wishlistSection) {
            console.error("Wishlist section element not found.");
            return;
        }

        const items = wishlist && wishlist.items ? wishlist.items : [];
        if (items.length === 0) {
            console.warn("No wishlist items found.");
            wishlistSection.innerHTML = `<p class="text-muted">No items in wishlist.</p>`;
            return;
        }

        try {
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
                        ${items.map(item => `
                            <tr>
                                <td>${item.name || 'Unnamed Item'}</td>
                                <td>${item.price || 'N/A'}</td>
                                <td>
                                    <button class="btn btn-dark btn-sm add-to-cart">${item.action || 'Add to Cart'}</button>
                                    <button class="btn btn-danger btn-sm remove-item ms-2" data-product-id="${item.productId}">Remove</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;

            // Bind remove functionality
            wishlistSection.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const productId = button.getAttribute('data-product-id');
                    const user = AuthModel.getUser();
                    if (!user) {
                        console.warn("No user logged in.");
                        return;
                    }

                    try {
                        WishlistModel.removeItem(user.userId, productId);
                        const updatedWishlist = WishlistModel.getByUserId(user.userId);
                        this.render(updatedWishlist); // Re-render with updated wishlist
                    } catch (error) {
                        console.error("Error removing wishlist item:", error.message);
                        alert("Failed to remove item from wishlist. Please try again.");
                    }
                });
            });

            // Placeholder for add-to-cart functionality
            wishlistSection.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert("Add to cart functionality not implemented yet.");
                });
            });
        } catch (error) {
            console.error("Error rendering wishlist:", error.message);
            wishlistSection.innerHTML = `<p class="text-danger">An error occurred while loading wishlist. Please try again.</p>`;
        }
    }
}