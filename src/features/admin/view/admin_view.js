
export class AdminView {
  constructor(usersContainerId, productsContainerId) {
    this.usersContainer = document.getElementById(usersContainerId);
    this.productsContainer = document.getElementById(productsContainerId);
  }

  renderUsers(users) {
    const usersHTML = `
      <h2>Users</h2>
      <button id="add-user-btn" class="btn btn-primary mb-3">Add User</button>
      <input type="text" id="user-search" class="form-control mb-3" placeholder="Search users by name...">
      <table class="table overflow-x-auto">
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
        <tbody id="users-table-body">
          
          ${users.map(user => this.createUserRow(user)).join('')}
        </tbody>
      </table>
    `;
    this.usersContainer.innerHTML = usersHTML;
    document.getElementById("user-search").addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm));
      this.updateUsersTable(filteredUsers);
    });
  }
  createUserRow(user) {
    return `
      <tr>
        <td>${user.userId}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>${user.address}</td>
        <td>${user.phone}</td>
        <td>
          <button class="btn btn-warning btn-sm edit-user" data-id="${user.userId}">Edit</button>
          <button class="btn btn-danger btn-sm delete-user" data-id="${user.userId}">Delete</button>
        </td>
      </tr>
    `;
  }
  updateUsersTable(filteredUsers) {
    const tableBody = document.getElementById("users-table-body");
    tableBody.innerHTML = filteredUsers.map(user => this.createUserRow(user)).join('');
  }

  renderAddUserForm(user = {}) {
    const formHTML = `
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
    this.usersContainer.innerHTML = formHTML;
  }

  renderProducts(products) {
    const productsHTML = `
      <h2>Products</h2>
      <button id="add-product-btn" class="btn btn-primary mb-3">Add Product</button>
      <input type="text" id="product-search" class="form-control mb-3" placeholder="Search products by name...">
      <table class="table overflow-x-auto">
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
        <tbody id="products-table-body">
        ${products.map(product => this.createProductRow(product)).join('')}
        </tbody>
      </table>
   
    `;
    this.productsContainer.innerHTML = productsHTML;
    document.getElementById("product-search").addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
      this.updateProductsTable(filteredProducts);
    });
    
  }
  createProductRow(product) {
    return `
      <tr>
        <td>${product.productId}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td>${product.category}</td>
        <td>${product.stock}</td>
        <td>${product.sellerId}</td>
        <td>${product.measures}</td>
        <td>
          <button class="btn btn-warning btn-sm edit-product" data-id="${product.productId}">Edit</button>
          <button class="btn btn-danger btn-sm delete-product" data-id="${product.productId}">Delete</button>
        </td>
      </tr>
    `;
  }
  updateProductsTable(filteredProducts) {
    const tableBody = document.getElementById("products-table-body");
    tableBody.innerHTML = filteredProducts.map(product => this.createProductRow(product)).join('');
  }
  renderAddProductForm(product = {}) {
    const formHTML = `
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
    this.productsContainer.innerHTML = formHTML;
  }
}