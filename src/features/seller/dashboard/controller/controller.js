class DashboardController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
      this.init();
    }
  
    init() {
      this.setupEventListeners();
      this.showSection('dashboard');
    }
  
    setupEventListeners() {
      document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const section = link.getAttribute('data-section');
          this.showSection(section);
        });
      });
    }
  
    showSection(section) {
      if (section === 'dashboard') {
        const data = {
          stats: this.model.getStats(),
          products: this.model.getProducts(),
          chartData: this.model.getChartData()
        };
        this.view.renderSection(section, data);
      } else {
        this.view.renderSection(section);
      }
      this.view.setActiveLink(section);
    }
  }
  
  // Initialize MVC
  const model = new DashboardModel();
  const view = new DashboardView();
  const controller = new DashboardController(model, view);