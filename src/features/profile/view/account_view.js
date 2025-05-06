import {ProfileModel} from '../model/profile_model.js';
export class AccountView {
  render() {
      const accountSection = document.getElementById('account-section');
      if (!accountSection) return;

      const user = ProfileModel.getUserData();

      accountSection.innerHTML = `
          <div class="mb-4">
              <h3>Account Details</h3>
              <form id="account-details-form" class="needs-validation" novalidate>
                  <div class="row">
                      <div class="col-md-6 mb-3">
                          <label for="first-name" class="form-label">First name</label>
                          <input type="text" class="form-control" id="first-name" value="${user.name.split(' ')[0] || ''}" required>
                          <div class="invalid-feedback">
                              Please enter your first name.
                          </div>
                      </div>
                      <div class="col-md-6 mb-3">
                          <label for="last-name" class="form-label">Last name</label>
                          <input type="text" class="form-control" id="last-name" value="${user.name.split(' ')[1] || ''}" required>
                          <div class="invalid-feedback">
                              Please enter your last name.
                          </div>
                      </div>
                  </div>
                  <div class="mb-3">
                      <label for="display-name" class="form-label">Display name</label>
                      <input type="text" class="form-control" id="display-name" value="${user.name || ''}" required>
                      <div class="invalid-feedback">
                          Please enter a display name.
                      </div>
                  </div>
                  <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <input type="email" class="form-control" id="email" value="${user.email || ''}" required>
                      <div class="invalid-feedback">
                          Please enter a valid email address.
                      </div>
                  </div>
                  <h4>Password</h4>
                  <div class="mb-3">
                      <label for="old-password" class="form-label">Old password</label>
                      <input type="password" class="form-control" id="old-password">
                      <div class="invalid-feedback">
                          Please enter your old password if changing.
                      </div>
                  </div>
                  <div class="mb-3">
                      <label for="new-password" class="form-label">New password</label>
                      <input type="password" class="form-control" id="new-password">
                      <div class="invalid-feedback">
                          Please enter a new password if changing.
                      </div>
                  </div>
                  <div class="mb-3">
                      <label for="repeat-password" class="form-label">Repeat new password</label>
                      <input type="password" class="form-control" id="repeat-password">
                      <div class="invalid-feedback">
                          Passwords must match.
                      </div>
                  </div>
                  <button type="submit" class="btn btn-dark">Save changes</button>
              </form>
          </div>
      `;

      // Bootstrap form validation
      const form = document.getElementById('account-details-form');
      form.addEventListener('submit', (e) => {
          e.preventDefault();
          if (!form.checkValidity()) {
              e.stopPropagation();
          }
          form.classList.add('was-validated');

          // Custom validation for password match
          const newPassword = document.getElementById('new-password').value;
          const repeatPassword = document.getElementById('repeat-password').value;
          if (newPassword && newPassword !== repeatPassword) {
              document.getElementById('repeat-password').setCustomValidity('Passwords must match');
          } else {
              document.getElementById('repeat-password').setCustomValidity('');
          }
      });
  }
}