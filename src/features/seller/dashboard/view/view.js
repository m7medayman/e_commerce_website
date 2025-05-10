// import { UserModel } from "../../../../core/models/user_model.js";
// import{AuthModel} from "../../../../core/models/auth_model.js";
// export class DashboardView {
//   constructor() {
//     this.app = document.getElementById('app');
//   }

//   renderSection(section, data) {
//     switch (section) {
//       case 'dashboard':
//         this.renderDashboard(data);
//         break;
//       case 'orders':
//         this.renderOrders();
//         break;
//       case 'products':
//         this.renderProducts();
//         break;
//       case 'profile':
//         this.renderProfile(data);
//         break;
//     }
//   }

//   renderDashboard(data) {
//     const { stats, products, chartData } = data;
//     this.app.innerHTML = `
//         <h1 class="mb-4">Seller Dashboard</h1>
//         <div class="row g-4">
//           <div class="col-md-4">
//             <div class="card">
//               <div class="card-header text-center">Total Orders</div>
//               <div class="card-body text-center">
//                 <h3 class="text-primary">${stats.totalOrders.value}</h3>
//                 <p class="text-muted">${stats.totalOrders.change}</p>
//               </div>
//             </div>
//           </div>
//           <div class="col-md-4">
//             <div class="card">
//               <div class="card-header text-center">Revenue</div>
//               <div class="card-body text-center">
//                 <h3 class="text-success">${stats.revenue.value}</h3>
//                 <p class="text-muted">${stats.revenue.label}</p>
//               </div>
//             </div>
//           </div>
//           <div class="col-md-4">
//             <div class="card">
//               <div class="card-header text-center">Lifetime Value</div>
//               <div class="card-body text-center">
//                 <h3 class="text-info">${stats.lifetimeValue.value}</h3>
//                 <p class="text-muted">${stats.lifetimeValue.change}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div class="row mt-4">
//           <div class="col-md-4">
//             <div class="card">
//               <div class="card-header">Top Selling Product</div>
//               <div class="card-body">
//                 ${products.map(product => `
//                   <img src="${product.img}" class="product-img" alt="${product.name}">
//                   <p>${product.name}<br><span class="text-muted">${product.stock}</span></p>
//                 `).join('')}
//               </div>
//             </div>
//           </div>
//           <div class="col-md-8">
//             <div class="card">
//               <div class="card-header">Overview</div>
//               <div class="card-body">
//                 <div class="chart-container">
//                   <canvas id="salesChart"></canvas>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       `;
//     this.renderChart(chartData);
//   }

//   renderOrders() {
//     this.app.innerHTML = `
//         <h2>Orders Section</h2>
//         <p>Content for orders will be added here.</p>
//       `;
//   }

//   renderProducts() {
//     this.app.innerHTML = `
//         <h2>Products Section</h2>
//         <p>Content for products will be added here.</p>
//       `;
//   }
//   renderProfile(data) {
//     this.app.innerHTML = `
//     <h3>My Account</h3>
//       <form id="account-details-form" class="needs-validation" novalidate>
//                     <div class="row">
//                         <div class="col-md-6 mb-4">
//                             <label for="first-name" class="form-label">First name</label>
//                             <input type="text" class="form-control rounded" id="first-name" value="${data.name.split(' ')[0] || ''}" required>
//                             <div class="invalid-feedback">
//                                 Please enter your first name.
//                             </div>
//                         </div>
//                         <div class="col-md-6 mb-4">
//                             <label for="last-name" class="form-label">Last name</label>
//                             <input type="text" class="form-control rounded" id="last-name" value="${data.name.split(' ')[1] || ''}" required>
//                             <div class="invalid-feedback">
//                                 Please enter your last name.
//                             </div>
//                         </div>
//                     </div>
//                     <div class="mb-4">
//                         <label for="display-name" class="form-label">Display name</label>
//                         <input type="text" class="form-control rounded" id="display-name" value="${data.name || ''}" required>
//                         <div class="invalid-feedback">
//                             Please enter a display name.
//                         </div>
//                     </div>
//                     <div class="mb-4">
//                         <label for="email" class="form-label">Email</label>
//                         <input type="email" class="form-control rounded" id="email" value="${data.email || ''}" required>
//                         <div class="invalid-feedback">
//                             Please enter a valid email address.
//                         </div>
//                     </div>
//                     <div class="mb-4">
//                         <label for="phone" class="form-label">Phone (optional)</label>
//                         <input type="tel" class="form-control rounded" id="phone" value="${data.phone || ''}">
//                     </div>
//                     <h4 class="mb-4">Password change</h4>
//                     <div class="mb-4">
//                         <label for="old-password" class="form-label">Current password (leave blank to leave unchanged)</label>
//                         <input type="password" class="form-control rounded" id="old-password">
//                         <div class="invalid-feedback">
//                             Please enter your current password if changing.
//                         </div>
//                     </div>
//                     <div class="mb-4">
//                         <label for="new-password" class="form-label">New password (leave blank to leave unchanged)</label>
//                         <input type="password" class="form-control rounded" id="new-password">
//                         <div class="invalid-feedback">
//                             Please enter a new password if changing.
//                         </div>
//                     </div>
//                     <div class="mb-4">
//                         <label for="repeat-password" class="form-label">Confirm new password</label>
//                         <input type="password" class="form-control rounded" id="repeat-password">
//                         <div class="invalid-feedback">
//                             Passwords must match.
//                         </div>
//                     </div>
//                     <button type="submit" class="btn btn-dark rounded mb-3">Save changes</button>
//                 </form>
//                 <div id="validation-message" class="mt-3" style="display: none;"></div>
//             </div>
//     `;
//     const form = document.getElementById('account-details-form');
//         const newPasswordInput = document.getElementById('new-password');
//         const repeatPasswordInput = document.getElementById('repeat-password');
//         const validationMessage = document.getElementById('validation-message');

//         // Real-time password match validation
//         const validatePasswords = () => {
//             const newPassword = newPasswordInput.value;
//             const repeatPassword = repeatPasswordInput.value;
//             if (newPassword && newPassword !== repeatPassword) {
//                 repeatPasswordInput.setCustomValidity('Passwords must match');
//                 repeatPasswordInput.classList.add('is-invalid');
//             } else {
//                 repeatPasswordInput.setCustomValidity('');
//                 repeatPasswordInput.classList.remove('is-invalid');
//                 if (repeatPassword) repeatPasswordInput.classList.add('is-valid');
//             }
//         };

//         newPasswordInput.addEventListener('input', validatePasswords);
//         repeatPasswordInput.addEventListener('input', validatePasswords);

//         // Form submission handler
//         form.addEventListener('submit', (e) => {
//             e.preventDefault();

//             if (!form.checkValidity()) {
//                 e.stopPropagation();
//                 form.classList.add('was-validated');
//                 validationMessage.style.display = 'block';
//                 validationMessage.innerHTML = '<div class="alert alert-danger" role="alert">Please fix the errors in the form before submitting.</div>';
//             } else {
//                 const firstName = document.getElementById('first-name').value;
//                 const lastName = document.getElementById('last-name').value;
//                 const email = document.getElementById('email').value;
//                 const phone = document.getElementById('phone').value;
//                 const newPassword = document.getElementById('new-password').value;
//                 const oldPassword = document.getElementById('old-password').value;

//                 if (newPassword && oldPassword !== data.password) {
//                     validationMessage.style.display = 'block';
//                     validationMessage.innerHTML = '<div class="alert alert-danger" role="alert">Current password is incorrect.</div>';
//                     return;
//                 }

//                 const updates = {
//                     name: `${firstName} ${lastName}`,
//                     email,
//                     phone: phone || null
//                 };
//                 if (newPassword) {
//                     updates.password = newPassword; // In production, hash this
//                 }

//                 try {
//                     UserModel.update(data.userId, updates);
//                     AuthModel.signIn(email, newPassword || data.password); // Re-sign in with updated credentials
//                     form.classList.remove('was-validated');
//                     validationMessage.style.display = 'block';
//                     validationMessage.innerHTML = '<div class="alert alert-success" role="alert">Account details updated successfully!</div>';
//                     setTimeout(() => {
//                         validationMessage.style.display = 'none';
//                         this.render(); // Re-render to show updated details
//                     }, 3000);
//                 } catch (error) {
//                     validationMessage.style.display = 'block';
//                     validationMessage.innerHTML = `<div class="alert alert-danger" role="alert">${error.message}</div>`;
//                 }
//             }
//         });

//         // Prevent submission if invalid on change
//         form.querySelectorAll('input').forEach(input => {
//             input.addEventListener('input', () => {
//                 if (!form.checkValidity()) {
//                     form.classList.add('was-validated');
//                 }
//             });
//         });
//   }

//   renderChart(chartData) {
//     const ctx = document.getElementById('salesChart').getContext('2d');
//     new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: chartData.labels,
//         datasets: [{
//           label: 'Sales',
//           data: chartData.data,
//           borderColor: '#ff6384',
//           fill: false,
//           tension: 0.1
//         }]
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });
//   }

//   setActiveLink(section) {
//     document.querySelectorAll('.sidebar a').forEach(link => {
//       link.classList.remove('active');
//       if (link.getAttribute('data-section') === section) {
//         link.classList.add('active');
//       }
//     });
//   }
  
// }
import { UserModel } from "../../../../core/models/user_model.js";
import { AuthModel } from "../../../../core/models/auth_model.js";

export class DashboardView {
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
      case 'profile':
        this.renderProfile(data);
        break;
    }
  }

  renderDashboard(data) {
    const { stats, products, chartData } = data;
    this.app.innerHTML = `
      <div class="container-fluid py-3">
        <h1 class="mb-4">Seller Dashboard</h1>
        <div class="row g-4">
          <div class="col-12 col-sm-6 col-md-4">
            <div class="card h-100">
              <div class="card-header text-center">Total Orders</div>
              <div class="card-body text-center">
                <h3 class="text-primary">${stats.totalOrders.value}</h3>
                <p class="text-muted">${stats.totalOrders.change}</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <div class="card h-100">
              <div class="card-header text-center">Revenue</div>
              <div class="card-body text-center">
                <h3 class="text-success">${stats.revenue.value}</h3>
                <p class="text-muted">${stats.revenue.label}</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <div class="card h-100">
              <div class="card-header text-center">Lifetime Value</div>
              <div class="card-body text-center">
                <h3 class="text-info">${stats.lifetimeValue.value}</h3>
                <p class="text-muted">${stats.lifetimeValue.change}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-4 mt-3">
          <div class="col-12 col-md-4">
            <div class="card h-100">
              <div class="card-header">Top Selling Products</div>
              <div class="card-body">
                ${products.map(product => `
                  <div class="d-flex align-items-center mb-3">
                    <img src="${product.img}" alt="${product.name}" class="img-fluid rounded me-3" style="max-width: 60px; max-height: 60px;">
                    <div>
                      <p class="mb-0">${product.name}</p>
                      <span class="text-muted">${product.stock}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="col-12 col-md-8">
            <div class="card h-100">
              <div class="card-header">Overview</div>
              <div class="card-body">
                <div class="chart-container" style="position: relative; height: 300px;">
                  <canvas id="salesChart"></canvas>
                </div>
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
      <div class="container-fluid py-3">
        <h2 class="mb-3">Orders Section</h2>
        <p>Content for orders will be added here.</p>
      </div>
    `;
  }

  renderProducts() {
    this.app.innerHTML = `
      <div class="container-fluid py-3">
        <h2 class="mb-3">Products Section</h2>
        <p>Content for products will be added here.</p>
      </div>
    `;
  }

  renderProfile(data) {
    this.app.innerHTML = `
      <div class="container-fluid py-3">
        <h3 class="mb-3">My Account</h3>
        <form id="account-details-form" class="needs-validation row g-3" novalidate>
          <div class="col-12 col-md-6">
            <label for="first-name" class="form-label">First Name</label>
            <input type="text" class="form-control" id="first-name" value="${data.name?.split(' ')[0] || ''}" required>
            <div class="invalid-feedback">Please enter your first name.</div>
          </div>
          <div class="col-12 col-md-6">
            <label for="last-name" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="last-name" value="${data.name?.split(' ')[1] || ''}" required>
            <div class="invalid-feedback">Please enter your last name.</div>
          </div>
          <div class="col-12">
            <label for="display-name" class="form-label">Display Name</label>
            <input type="text" class="form-control" id="display-name" value="${data.name || ''}" required>
            <div class="invalid-feedback">Please enter a display name.</div>
          </div>
          <div class="col-12 col-md-6">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" value="${data.email || ''}" required>
            <div class="invalid-feedback">Please enter a valid email address.</div>
          </div>
          <div class="col-12 col-md-6">
            <label for="phone" class="form-label">Phone (optional)</label>
            <input type="tel" class="form-control" id="phone" value="${data.phone || ''}">
          </div>
          <div class="col-12">
            <h4 class="mb-3">Password Change</h4>
          </div>
          <div class="col-12 col-md-6">
            <label for="old-password" class="form-label">Current Password</label>
            <input type="password" class="form-control" id="old-password" placeholder="Leave blank to keep unchanged">
            <div class="invalid-feedback">Please enter your current password if changing.</div>
          </div>
          <div class="col-12 col-md-6">
            <label for="new-password" class="form-label">New Password</label>
            <input type="password" class="form-control" id="new-password" placeholder="Leave blank to keep unchanged">
            <div class="invalid-feedback">Please enter a new password if changing.</div>
          </div>
          <div class="col-12 col-md-6">
            <label for="repeat-password" class="form-label">Confirm New Password</label>
            <input type="password" class="form-control" id="repeat-password" placeholder="Confirm new password">
            <div class="invalid-feedback">Passwords must match.</div>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-dark w-100 w-md-auto">Save Changes</button>
          </div>
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
            this.renderSection('profile', data); // Re-render to show updated details
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
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
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
