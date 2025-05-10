import { UserModel } from "../../../core/models/user_model.js";
import { ProductModel } from "../../../core/models/product_model.js";
import { AdminView } from "../view/admin_view.js";
import { AuthModel } from "../../../core/models/auth_model.js";



document.addEventListener("DOMContentLoaded", () => {
  const users = UserModel.getAll();
  const products = ProductModel.getAll();
  const user = AuthModel.getUser();
  const view = new AdminView("users-panel", "products-panel", 'profile');

  view.renderProducts(products);
  view.renderUsers(users);
  view.renderProfile(user);
  initializeEventListeners(view);
});

function initializeEventListeners(view) {
  document.getElementById("total_users").innerText = UserModel.getAll().length;
  document.getElementById("total-products").innerText = ProductModel.getAll().length;
  document.getElementById("total-sellers").innerText = UserModel.getAll().filter(user => user.role === 'seller').length;
  document.getElementById("total-customers").innerText = UserModel.getAll().filter(user => user.role === 'customer').length; 
  document.getElementById("add-user-btn").addEventListener("click", () => {
    view.renderAddUserForm();

    document.getElementById("add-user-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const newUser = {
        name: document.getElementById("user-name").value,
        email: document.getElementById("user-email").value,
        role: document.getElementById("user-role").value || "customer",
        address: document.getElementById("user-address").value || "Unknown",
        phone: document.getElementById("user-phone").value || "Unknown",
      };
      UserModel.add(newUser);
      const users = UserModel.getAll();
      view.renderUsers(users);
      alert("User added successfully!");

      initializeEventListeners(view);
    });

  });

  // document.getElementById("add-product-btn").addEventListener("click", () => {
  //   view.renderAddProductForm();

  //   document.getElementById("add-product-form").addEventListener("submit", (e) => {
  //     e.preventDefault();
  //     const newProduct = {
  //       name: document.getElementById("product-name").value,
  //       price: document.getElementById("product-price").value,
  //       description: document.getElementById("product-description").value,
  //       category: document.getElementById("product-category").value,
  //       stock: document.getElementById("product-stock").value,
  //       sellerId: document.getElementById("product-sellerId").value,
  //       measures: document.getElementById("product-measures").value,
  //     };
  //     ProductModel.add(newProduct);
  //     const products = ProductModel.getAll();
  //     view.renderProducts(products);
  //     alert("Product added successfully!");

  //     initializeEventListeners(view);
  //   });
  // });

  document.getElementById("users-panel").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-user")) {
      const userId = e.target.dataset.id;
      UserModel.delete(userId);
      const users = UserModel.getAll();
      view.renderUsers(users);

      initializeEventListeners(view);
    }
  });

  document.getElementById("products-panel").addEventListener("click", (e) => {

  if (e.target.classList.contains("delete-product")) {
    const productId = e.target.dataset.id;
if (confirm("Are you sure you want to delete this product?")) {
        ProductModel.delete(productId);
        const products = ProductModel.getAll();
        view.renderProducts(products);
        initializeEventListeners(view);
 }
  }
});
const logoutLink = document.getElementById('logout');
if (logoutLink) {
  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    logoutLink.classList.add('text-light');
    localStorage.removeItem(AuthModel.STORAGE_KEY);
    window.location.href = 'login.html';
  });
}
}