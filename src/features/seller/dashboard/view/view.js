class DashboardView {
    constructor() {
      this.app = document.getElementById('app');
    }
  
    renderSection(section, data) {
      switch (section) {
        case 'dashboard':
          this.renderDashboard(data);
          break;
        case 'orders':
          this.renderOrders();
          break;
        case 'products':
          this.renderProducts();
          break;
      }
    }
  
    renderDashboard(data) {
      const { stats, products, chartData } = data;
      this.app.innerHTML = `
        <h1 class="mb-4">Seller Dashboard</h1>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card">
              <div class="card-header text-center">Total Orders</div>
              <div class="card-body text-center">
                <h3 class="text-primary">${stats.totalOrders.value}</h3>
                <p class="text-muted">${stats.totalOrders.change}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <div class="card-header text-center">Revenue</div>
              <div class="card-body text-center">
                <h3 class="text-success">${stats.revenue.value}</h3>
                <p class="text-muted">${stats.revenue.label}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <div class="card-header text-center">Lifetime Value</div>
              <div class="card-body text-center">
                <h3 class="text-info">${stats.lifetimeValue.value}</h3>
                <p class="text-muted">${stats.lifetimeValue.change}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-4">
            <div class="card">
              <div class="card-header">Top Selling Product</div>
              <div class="card-body">
                ${products.map(product => `
                  <img src="${product.img}" class="product-img" alt="${product.name}">
                  <p>${product.name}<br><span class="text-muted">${product.stock}</span></p>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">Overview</div>
              <div class="card-body">
                <div class="chart-container">
                  <canvas id="salesChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      this.renderChart(chartData);
    }
  
    renderOrders() {
      this.app.innerHTML = `
        <h2>Orders Section</h2>
        <p>Content for orders will be added here.</p>
      `;
    }
  
    renderProducts() {
      this.app.innerHTML = `
        <h2>Products Section</h2>
        <p>Content for products will be added here.</p>
      `;
    }
  
    renderChart(chartData) {
      const ctx = document.getElementById('salesChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [{
            label: 'Sales',
            data: chartData.data,
            borderColor: '#ff6384',
            fill: false,
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  
    setActiveLink(section) {
      document.querySelectorAll('.sidebar a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === section) {
          link.classList.add('active');
        }
      });
    }
  }