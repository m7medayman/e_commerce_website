
export class AdminView {
  constructor(usersContainerId, productsContainerId,profileId) {
    this.usersContainer = document.getElementById(usersContainerId);
    this.productsContainer = document.getElementById(productsContainerId);
    this.profileContainer=document.getElementById(profileId);
  }

  renderUsers(users) {
    const usersHTML = `
      <h2>Users</h2>
      <div class=" col-12 col-md-3 ">
      <button id="add-user-btn" class="btn btn-primary mb-3">Add User</button> </div>
      <input type="text" id="user-search" class="form-control mb-3" placeholder="Search users by name...">
      <div class="overflow-x-auto">
      <table class="table">
        <thead class="table-dark text-white">
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
      </div>
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
      <input type="text" id="product-search" class="form-control mb-3" placeholder="Search products by name...">
      <div class="overflow-x-auto">
      <table class="table">
        <thead class="table-dark text-white">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Stock</th>
            <th>SellerID</th>
            <th>Measuarment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="products-table-body">
        ${products.map(product => this.createProductRow(product)).join('')}
        </tbody>
      </table>
      </div>
   
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
        <td>${product.measuarment}</td>
        <td>
          <button class="btn btn-danger btn-sm delete-product" data-id="${product.productId}">Delete</button>
        </td>
      </tr>
    `;
  }
  updateProductsTable(filteredProducts) {
    const tableBody = document.getElementById("products-table-body");
    tableBody.innerHTML = filteredProducts.map(product => this.createProductRow(product)).join('');
  }
  // renderAddProductForm(product = {}) {
  //   const formHTML = `
  //     <h2>${product.id ? "Edit Product" : "Add Product"}</h2>
  //     <form id="add-product-form">
  //       <div class="mb-3">
  //         <label for="product-name" class="form-label">Product Name</label>
  //         <input type="text" class="form-control" id="product-name" value="${product.name || ""}" required>
  //       </div>
  //       <div class="mb-3">
  //         <label for="product-price" class="form-label">Price</label>
  //         <input type="text" class="form-control" id="product-price" value="${product.price || ""}" required>
  //       </div>
  //       <div class="mb-3">
  //         <label for="product-description" class="form-label">Description</label>
  //         <textarea class="form-control" id="product-description" rows="3">${product.description || ""}</textarea>
  //       </div>
  //       <div class="mb-3">
  //         <label for="product-category" class="form-label">Category</label>
  //         <input type="text" class="form-control" id="product-category" value="${product.category || ""}">
  //       </div>
  //       <div class="mb-3">
  //         <label for="product-stock" class="form-label">Stock</label>
  //         <input type="number" class="form-control" id="product-stock" value="${product.stock || ""}">
  //       </div>
  //       <div class="mb-3">
  //         <label for="product-sellerId" class="form-label">Seller ID</label>
  //         <input type="text" class="form-control" id="product-sellerId" value="${product.sellerId || ""}">
  //       </div>
  //       <div class="mb-3">
  //         <label for="product-measuarment" class="form-label">Measuarment</label>
  //         <input type="text" class="form-control" id="product-measuarment" value="${product.measuarment || ""}">
  //       </div>
  //       <button type="submit" class="btn btn-primary">${product.id ? "Update Product" : "Add Product"}</button>
  //     </form>
  //   `;
  //   this.productsContainer.innerHTML = formHTML;
  // }
  renderProfile(data) {
      this.profileContainer.innerHTML = `
      <h3>My Account</h3>
        <form id="account-details-form" class="needs-validation" novalidate>
                      <div class="row">
                          <div class="col-md-6 mb-4">
                              <label for="first-name" class="form-label">First name</label>
                              <input type="text" class="form-control rounded" id="first-name" value="${data.name.split(' ')[0] || ''}" required>
                              <div class="invalid-feedback">
                                  Please enter your first name.
                              </div>
                          </div>
                          <div class="col-md-6 mb-4">
                              <label for="last-name" class="form-label">Last name</label>
                              <input type="text" class="form-control rounded" id="last-name" value="${data.name.split(' ')[1] || ''}" required>
                              <div class="invalid-feedback">
                                  Please enter your last name.
                              </div>
                          </div>
                      </div>
                      <div class="mb-4">
                          <label for="display-name" class="form-label">Display name</label>
                          <input type="text" class="form-control rounded" id="display-name" value="${data.name || ''}" required>
                          <div class="invalid-feedback">
                              Please enter a display name.
                          </div>
                      </div>
                      <div class="mb-4">
                          <label for="email" class="form-label">Email</label>
                          <input type="email" class="form-control rounded" id="email" value="${data.email || ''}" required>
                          <div class="invalid-feedback">
                              Please enter a valid email address.
                          </div>
                      </div>
                      <div class="mb-4">
                          <label for="phone" class="form-label">Phone (optional)</label>
                          <input type="tel" class="form-control rounded" id="phone" value="${data.phone || ''}">
                      </div>
                      <h4 class="mb-4">Password change</h4>
                      <div class="mb-4">
                          <label for="old-password" class="form-label">Current password (leave blank to leave unchanged)</label>
                          <input type="password" class="form-control rounded" id="old-password">
                          <div class="invalid-feedback">
                              Please enter your current password if changing.
                          </div>
                      </div>
                      <div class="mb-4">
                          <label for="new-password" class="form-label">New password (leave blank to leave unchanged)</label>
                          <input type="password" class="form-control rounded" id="new-password">
                          <div class="invalid-feedback">
                              Please enter a new password if changing.
                          </div>
                      </div>
                      <div class="mb-4">
                          <label for="repeat-password" class="form-label">Confirm new password</label>
                          <input type="password" class="form-control rounded" id="repeat-password">
                          <div class="invalid-feedback">
                              Passwords must match.
                          </div>
                      </div>
                      <button type="submit" class="btn btn-dark rounded mb-3">Save changes</button>
                  </form>
                  <div id="validation-message" class="mt-3" style="display: none;"></div>
              </div>
      `;
      const form = document.getElementById('account-details-form');
          const newPasswordInput = document.getElementById('new-password');
          const repeatPasswordInput = document.getElementById('repeat-password');
          const validationMessage = document.getElementById('validation-message');
  
          // Real-time password match validation
          const validatePasswords = () => {
              const newPassword = newPasswordInput.value;
              const repeatPassword = repeatPasswordInput.value;
              if (newPassword && newPassword !== repeatPassword) {
                  repeatPasswordInput.setCustomValidity('Passwords must match');
                  repeatPasswordInput.classList.add('is-invalid');
              } else {
                  repeatPasswordInput.setCustomValidity('');
                  repeatPasswordInput.classList.remove('is-invalid');
                  if (repeatPassword) repeatPasswordInput.classList.add('is-valid');
              }
          };
  
          newPasswordInput.addEventListener('input', validatePasswords);
          repeatPasswordInput.addEventListener('input', validatePasswords);
  
          // Form submission handler
          form.addEventListener('submit', (e) => {
              e.preventDefault();
  
              if (!form.checkValidity()) {
                  e.stopPropagation();
                  form.classList.add('was-validated');
                  validationMessage.style.display = 'block';
                  validationMessage.innerHTML = '<div class="alert alert-danger" role="alert">Please fix the errors in the form before submitting.</div>';
              } else {
                  const firstName = document.getElementById('first-name').value;
                  const lastName = document.getElementById('last-name').value;
                  const email = document.getElementById('email').value;
                  const phone = document.getElementById('phone').value;
                  const newPassword = document.getElementById('new-password').value;
                  const oldPassword = document.getElementById('old-password').value;
  
                  if (newPassword && oldPassword !== data.password) {
                      validationMessage.style.display = 'block';
                      validationMessage.innerHTML = '<div class="alert alert-danger" role="alert">Current password is incorrect.</div>';
                      return;
                  }
  
                  const updates = {
                      name: `${firstName} ${lastName}`,
                      email,
                      phone: phone || null
                  };
                  if (newPassword) {
                      updates.password = newPassword; // In production, hash this
                  }
  
                  try {
                      UserModel.update(data.userId, updates);
                      AuthModel.signIn(email, newPassword || data.password); // Re-sign in with updated credentials
                      form.classList.remove('was-validated');
                      validationMessage.style.display = 'block';
                      validationMessage.innerHTML = '<div class="alert alert-success" role="alert">Account details updated successfully!</div>';
                      setTimeout(() => {
                          validationMessage.style.display = 'none';
                          this.render(); // Re-render to show updated details
                      }, 3000);
                  } catch (error) {
                      validationMessage.style.display = 'block';
                      validationMessage.innerHTML = `<div class="alert alert-danger" role="alert">${error.message}</div>`;
                  }
              }
          });
  
          // Prevent submission if invalid on change
          form.querySelectorAll('input').forEach(input => {
              input.addEventListener('input', () => {
                  if (!form.checkValidity()) {
                      form.classList.add('was-validated');
                  }
              });
          });
    }
}