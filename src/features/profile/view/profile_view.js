import { AddressesView } from './addresses_view.js';
import { AccountView } from './account_view.js';
import { OrdersView } from './orders_view.js';
import { WishlistView } from './wishlist_view.js';

export class ProfileView {
    constructor() {
        this.addressesView = new AddressesView();
        this.accountView = new AccountView();
        this.ordersView = new OrdersView();
        this.wishlistView = new WishlistView();
    }

    renderPage() {
        const profileDiv = document.getElementById('profile');
        if (!profileDiv) return;

        // Hardcode userType as 'seller' to show Dashboard (change to 'buyer' to hide)
        const userType = 'seller';

        const sidebarHtml = `
            <div class="col-12 col-md-3 bg-light sidebar" id="sidebar">
                <div class="position-sticky pt-3">
                    <h5 class="sidebar-heading">My Account</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link active" href="#" data-section="account">Account</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-section="addresses">Addresses</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-section="orders">Orders</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-section="wishlist">Wishlist</a>
                        </li>
                        ${userType === 'seller' ? `
                            <li class="nav-item">
                                <a class="nav-link" href="dashboard.html">Dashboard</a>
                            </li>
                        ` : ''}
                        <li class="nav-item">
                            <a class="nav-link logout" href="login.html">Log Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        `;

        const mainContentHtml = `
            <div class="col-12 col-md-9 main-content">
                <h1 class="my-4">My Account</h1>
                <div class="content-section" id="account-section" style="display: block;"></div>
                <div class="content-section" id="addresses-section" style="display: none;"></div>
                <div class="content-section" id="orders-section" style="display: none;"></div>
                <div class="content-section" id="wishlist-section" style="display: none;"></div>
            </div>
        `;

        profileDiv.innerHTML = `
            <div class="container">
                <div class="row justify-content-center">
                    <!-- Sidebar -->           
                    ${sidebarHtml}               
                    <!-- Main Content -->
                    ${mainContentHtml}
                   
                </div>
            </div>
        `;
    }

    bindSidebarNavigation(handler) {
        document.querySelectorAll('#profile #sidebar a').forEach(link => {
            link.addEventListener('click', (e) => {
                const section = e.target.getAttribute('data-section');
                if (section) {
                    e.preventDefault();
                    handler(section);
                }
            });
        });
    }

    renderSection(section) {
        if (section === 'account') {
            this.accountView.render();
        } else if (section === 'addresses') {
            this.addressesView.render();
        } else if (section === 'orders') {
            this.ordersView.render();
        } else if (section === 'wishlist') {
            this.wishlistView.render();
        }
    }
}