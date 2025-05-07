import { AddressesView } from './addresses_view.js';
import { AccountView } from './account_view.js';
import { OrdersView } from './orders_view.js';
import { WishlistView } from './wishlist_view.js';
import { AuthModel } from '../../../core/models/auth_model.js';

export class ProfileView {
    renderPage() {
        const profileDiv = document.getElementById('profile');
        if (!profileDiv) return;

        const user = AuthModel.getUser();
        const showDashboard = user && user.role === 'admin';

        profileDiv.innerHTML = `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-md-3" id="sidebar">
                        <h5>My Account</h5>
                        <ul>
                            <li><a href="#" class="active" data-section="account">Account</a></li>
                            <li><a href="#" data-section="addresses">Addresses</a></li>
                            <li><a href="#" data-section="orders">Orders</a></li>
                            <li><a href="#" data-section="wishlist">Wishlist</a></li>
                            ${showDashboard ? '<li><a href="#" data-section="dashboard">Dashboard</a></li>' : ''}
                            <li><a href="#" class="logout" data-section="logout">Log out</a></li>
                        </ul>
                    </div>
                    <div class="col-12 col-md-9">
                        <h1>Profile</h1>
                        <div id="account-section" class="content-section"></div>
                        <div id="addresses-section" class="content-section" style="display: none;"></div>
                        <div id="orders-section" class="content-section" style="display: none;"></div>
                        <div id="wishlist-section" class="content-section" style="display: none;"></div>
                        <div id="dashboard-section" class="content-section" style="display: none;">
                            <h3>Dashboard</h3>
                            <p>Admin dashboard content goes here.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.bindSidebarNavigation();
    }

    bindSidebarNavigation(handleNavigation) {
        document.querySelectorAll('#profile #sidebar a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                if (section === 'logout') {
                    AuthModel.signOut();
                    window.location.reload(); // Reload to reset the page
                } else {
                    handleNavigation(section);
                }
            });
        });
    }

    renderSection(section) {
        const views = {
            account: new AccountView(),
            addresses: new AddressesView(),
            orders: new OrdersView(),
            wishlist: new WishlistView(),
            dashboard: () => {} // Placeholder for dashboard view
        };
        const view = views[section];
        if (view && typeof view.render === 'function') {
            view.render();
        }
    }
}