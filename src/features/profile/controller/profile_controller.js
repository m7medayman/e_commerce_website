import {ProfileView} from '../view/profile_view.js';
import {UserModel} from '../../../core/models/user_model.js';
export class ProfileController {
    constructor() {
        this.profileView = new ProfileView();
        this.init();
    }

    init() {
        // Simulate a logged-in user by adding a user if none exists
        let loggedInUserId = localStorage.getItem('loggedInUserId');
        if (!loggedInUserId) {
            try {
                const newUser = UserModel.add({
                    email: "sofia.haverz@example.com",
                    password: "password123", // In production, hash this
                    role: "customer",
                    name: "Sofia Haverz",
                    address: "123 Main St, New York, NY, USA",
                    phone: "555-123-4567"
                });
                loggedInUserId = newUser.userId;
                localStorage.setItem('loggedInUserId', loggedInUserId);
            } catch (error) {
                console.error("Error adding user:", error.message);
            }
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