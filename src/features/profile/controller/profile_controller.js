import { ProfileView } from '../view/profile_view.js';
import { AuthModel } from '../../../core/models/auth_model.js';
import { AccountView } from '../view/account_view.js';
import { AddressesView } from '../view/addresses_view.js';
import { OrdersView } from '../view/orders_view.js';
import { WishlistView } from '../view/wishlist_view.js';
import { OrderModel } from '../../../core/models/order_model.js';
import { WishlistModel } from '../../../core/models/wish_model.js';

export class ProfileController {
    constructor() {
        this.profileView = new ProfileView();
        this.views = {
            account: new AccountView(),
            addresses: new AddressesView(),
            orders: new OrdersView(),
            wishlist: new WishlistView(),
            dashboard: () => {} // Placeholder for dashboard view
        };
        this.init();
    }

    init() {
        const user = AuthModel.getUser();
        if (!user) {
            console.warn("No user logged in, redirecting to login.");
            window.location.href = 'login.html';
            return;
        }

        try {
            // Fetch data for the logged-in user
            this.userData = {
                user: user,
                address: user.address || null, // Single address string as per UserModel
                orders: OrderModel.getByUserId(user.userId) || [],
                wishlist: WishlistModel.getByUserId(user.userId) || []
            };
            console.log("Fetched user data:", this.userData);

            this.profileView.renderPage();
            this.profileView.bindSidebarNavigation(this.handleNavigation.bind(this));
            this.handleNavigation('account'); // Set "account" as default
        } catch (error) {
            console.error("Error initializing ProfileController:", error.message);
            document.getElementById('profile').innerHTML = `<p class="text-danger">An error occurred while loading the profile. Please try again.</p>`;
        }
    }

    handleNavigation(section) {
        try {
            // Hide all sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });

            const selectedSection = document.getElementById(`${section}-section`);
            if (selectedSection) {
                selectedSection.style.display = 'block';
                this.renderSection(section);
            }

            // Update active link in sidebar
            document.querySelectorAll('#profile #sidebar a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === section) {
                    link.classList.add('active');
                }
            });
        } catch (error) {
            console.error(`Error handling navigation to ${section}:`, error.message);
        }
    }

    renderSection(section) {
        try {
            const view = this.views[section];
            if (view && typeof view.render === 'function') {
                if (section === 'account') {
                    view.render(this.userData.user, this.userData.orders);
                } else if (section === 'addresses') {
                    view.render(this.userData.address, this.userData.user);
                } else if (section === 'orders') {
                    view.render(this.userData.orders);
                } else if (section === 'wishlist') {
                    view.render(this.userData.wishlist);
                } else {
                    view(); // For dashboard or other sections
                }
            } else {
                console.warn(`No render method found for section: ${section}`);
            }
        } catch (error) {
            console.error(`Error rendering section ${section}:`, error.message);
            const sectionElement = document.getElementById(`${section}-section`);
            if (sectionElement) {
                sectionElement.innerHTML = `<p class="text-danger">An error occurred while loading this section. Please try again.</p>`;
            }
        }
    }
}

export default new ProfileController();