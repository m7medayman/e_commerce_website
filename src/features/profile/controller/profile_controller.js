import { ProfileView } from '../view/profile_view.js';
import { AuthModel } from '../../../core/models/auth_model.js';
export class ProfileController {
    constructor() {
        this.profileView = new ProfileView();
        this.init();
    }

    init() {
        const user = AuthModel.getUser();
        if (!user) {
            // Redirect to login page if no user is logged in
            window.location.href = 'login.html';
            return;
        }

        this.profileView.renderPage();
        this.profileView.bindSidebarNavigation(this.handleNavigation.bind(this));
        this.handleNavigation('account'); // Set "account" as default
    }

    handleNavigation(section) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });

        const selectedSection = document.getElementById(`${section}-section`);
        if (selectedSection) {
            selectedSection.style.display = 'block';
            this.profileView.renderSection(section);
        }

        document.querySelectorAll('#profile #sidebar a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === section) {
                link.classList.add('active');
            }
        });
    }
}

export default new ProfileController();