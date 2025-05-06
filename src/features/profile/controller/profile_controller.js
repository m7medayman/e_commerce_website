import {ProfileView} from '../view/profile_view.js';
export class ProfileController {
    constructor() {
        this.profileView = new ProfileView();
        this.init();
    }

    init() {
        this.profileView.renderPage();
        this.profileView.bindSidebarNavigation(this.handleNavigation.bind(this));
        this.handleNavigation('home'); // Set "home" as default
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

        document.querySelectorAll('#profile .sidebar a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === section) {
                link.classList.add('active');
            }
        });
    }
}

export default new ProfileController();