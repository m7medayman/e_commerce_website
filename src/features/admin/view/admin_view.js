export class AdminView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }
     // عرض لوحة التحكم
  renderDashboard(users, products) {
    this.container.innerHTML = `
      <div class="dashboard">
        <h1>Admin Dashboard</h1>
        <div class="stats">
          <div class="stat">
            <h3>Total Users</h3>
            <p>${users.length}</p>
          </div>
          <div class="stat">
            <h3>Total Products</h3>
            <p>${products.length}</p>
          </div>
        </div>
        <div class="chart-container">
          <canvas id="productsChart"></canvas>
        </div>
      </div>
    `;

    // رسم الرسم البياني
    this.renderChart(products);
  }
   // رسم الرسم البياني باستخدام Chart.js
   renderChart(products) {
    const ctx = document.getElementById("productsChart").getContext("2d");
    const categories = [...new Set(products.map(product => product.category))];
    const categoryCounts = categories.map(category =>
      products.filter(product => product.category === category).length
    );

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: categories,
        datasets: [
          {
            label: "Products by Category",
            data: categoryCounts,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Products Distribution by Category",
          },
        },
      },
    });
  }
  renderUsers(users) {
    const usersHTML = `
      <h2>Users</h2>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${users.map(user => `
            <tr>
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.role}</td>
              <td>${user.address}</td>
              <td>${user.phone}</td>
              <td>
                <button class="btn btn-warning btn-sm edit-user" data-id="${user.id}">Edit</button>
                <button class="btn btn-danger btn-sm delete-user" data-id="${user.id}">Delete</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    return usersHTML;
  }

  
  renderProducts(products) {
    const productsHTML = `
      <h2>Products</h2>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Seller ID</th>
            <th>Measurement</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${products.map(product => `
            <tr>
              <td>${product.id}</td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>${product.description}</td>
              <td>${product.category}</td>
              <td>${product.stock}</td>
              <td>${product.sellerId}</td>
              <td>${product.measures}</td>
              <td>
                <button class="btn btn-warning btn-sm edit-product" data-id="${product.id}">Edit</button>
                <button class="btn btn-danger btn-sm delete-product" data-id="${product.id}">Delete</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    return productsHTML;
  }

  
  renderMainPage(users, products) {
    this.container.innerHTML = `
      <div class="mb-3">
        <button id="add-user-btn" class="btn btn-primary">Add User</button>
        <button id="add-product-btn" class="btn btn-secondary">Add Product</button>
      </div>
      <div id="users-section">
        ${this.renderUsers(users)}
      </div>
      <div id="products-section">
        ${this.renderProducts(products)}
      </div>
    `;
  }

  
  renderAddUserForm(user = {}) {
    this.container.innerHTML = `
      <h2>${user.id ? "Edit User" : "Add User"}</h2>
      <form id="add-user-form">
        <div class="mb-3">
          <label for="user-name" class="form-label">Name</label>
          <input type="text" class="form-control" id="user-name" value="${user.name || ""}" required>
        </div>
        <div class="mb-3">
          <label for="user-email" class="form-label">Email</label>
          <input type="email" class="form-control" id="user-email" value="${user.email || ""}" required>
        </div>
        <div class="mb-3">
          <label for="user-role" class="form-label">Role</label>
          <input type="text" class="form-control" id="user-role" value="${user.role || ""}">
        </div>
        <div class="mb-3">
          <label for="user-address" class="form-label">Address</label>
          <input type="text" class="form-control" id="user-address" value="${user.address || ""}">
        </div>
        <div class="mb-3">
          <label for="user-phone" class="form-label">Phone</label>
          <input type="text" class="form-control" id="user-phone" value="${user.phone || ""}">
        </div>
        <button type="submit" class="btn btn-primary">${user.id ? "Update User" : "Add User"}</button>
      </form>
    `;
  }

  renderAddProductForm(product = {}) {
    this.container.innerHTML = `
      <h2>${product.id ? "Edit Product" : "Add Product"}</h2>
      <form id="add-product-form">
        <div class="mb-3">
          <label for="product-name" class="form-label">Product Name</label>
          <input type="text" class="form-control" id="product-name" value="${product.name || ""}" required>
        </div>
        <div class="mb-3">
          <label for="product-price" class="form-label">Price</label>
          <input type="text" class="form-control" id="product-price" value="${product.price || ""}" required>
        </div>
        <div class="mb-3">
          <label for="product-description" class="form-label">Description</label>
          <textarea class="form-control" id="product-description" rows="3">${product.description || ""}</textarea>
        </div>
        <div class="mb-3">
          <label for="product-category" class="form-label">Category</label>
          <input type="text" class="form-control" id="product-category" value="${product.category || ""}">
        </div>
        <div class="mb-3">
          <label for="product-stock" class="form-label">Stock</label>
          <input type="number" class="form-control" id="product-stock" value="${product.stock || ""}">
        </div>
        <div class="mb-3">
          <label for="product-sellerId" class="form-label">Seller ID</label>
          <input type="text" class="form-control" id="product-sellerId" value="${product.sellerId || ""}">
        </div>
        <div class="mb-3">
          <label for="product-measures" class="form-label">Measurement</label>
          <input type="text" class="form-control" id="product-measures" value="${product.measures || ""}">
        </div>
        <button type="submit" class="btn btn-primary">${product.id ? "Update Product" : "Add Product"}</button>
      </form>
    `;
  }
}