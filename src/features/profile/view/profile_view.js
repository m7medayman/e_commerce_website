import { AuthModel } from '../../../core/models/auth_model.js';
import { FooterWidget } from '../../../core/common/footer.js';
import { NavBar } from '../../../core/common/nav_bar.js';
export class ProfileView {
    constructor() {

        this.styles = document.createElement('link');
        this.styles.rel = 'stylesheet';
        this.styles.href = '../styles/pages/profile.css';
        document.head.appendChild(this.styles);
        new FooterWidget().render();
        new NavBar().render();

    }
    renderPage() {
        const profileDiv = document.getElementById('profile');
        if (!profileDiv) {
            console.error("Profile element not found.");
            return;
        }

        const user = AuthModel.getUser();
        if (!user) {
            console.warn("No user logged in.");
            return;
        }

        const showDashboard = user.role === 'seller' || user.role === 'admin';
        let dashboardLink = '';
        if (showDashboard) {
            dashboardLink = `<li><a href="#" data-section="dashboard" data-role="${user.role}">Dashboard</a></li>`;
        }

        try {
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
                                ${dashboardLink}
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
        } catch (error) {
            console.error("Error rendering profile page:", error.message);
            profileDiv.innerHTML = `<p class="text-danger">An error occurred while loading the profile page. Please try again.</p>`;
        }
    }

    bindSidebarNavigation(handleNavigation) {
        try {
            document.querySelectorAll('#profile #sidebar a').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const section = link.getAttribute('data-section');
                    if (section === 'logout') {
                        AuthModel.signOut();
                        window.location.href = 'login.html';
                    } else if (section === 'dashboard') {
                        const role = link.getAttribute('data-role');
                        const dashboardUrl = role === 'admin' ? 'admin_panel.html' : '../../../../public/seller/dashboard.html';
                        window.location.href = dashboardUrl;
                    } else {
                        handleNavigation(section);
                    }
                });
            });
        } catch (error) {
            console.error("Error binding sidebar navigation:", error.message);
        }
    }
}