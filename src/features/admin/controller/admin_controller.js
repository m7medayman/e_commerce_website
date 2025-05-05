import { AdminModel } from "../model/admin_model.js";
import { AdminView } from "../view/admin_view.js";

document.addEventListener("DOMContentLoaded", () => {
  const view = new AdminView("admin-panel");

  const users = AdminModel.getUsers();
  const products = AdminModel.getProducts();

  view.renderMainPage(users, products);

  document.getElementById("add-user-btn").addEventListener("click", () => {
    view.renderAddUserForm();

    document.getElementById("add-user-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const newUser = {
        id: Date.now(),
        name: document.getElementById("user-name").value,
        email: document.getElementById("user-email").value,
        role: document.getElementById("user-role").value || "customer",
        address: document.getElementById("user-address").value || "Unknown",
        phone: document.getElementById("user-phone").value || "Unknown",
      };
      AdminModel.addUser(newUser);
      view.renderMainPage(AdminModel.getUsers(), AdminModel.getProducts());
      window.location.reload(); 
      });
    });
     
  document.getElementById("add-product-btn").addEventListener("click", () => {
    view.renderAddProductForm();
  
    document.getElementById("add-product-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const newProduct = {
        id: Date.now(),
        name: document.getElementById("product-name").value,
        price: document.getElementById("product-price").value,
        description: document.getElementById("product-description").value,
        category: document.getElementById("product-category").value,
        stock: document.getElementById("product-stock").value,
        sellerId: document.getElementById("product-sellerId").value,
        measures: document.getElementById("product-measures").value,
      };
      AdminModel.addProduct(newProduct);
      view.renderMainPage(AdminModel.getUsers(), AdminModel.getProducts());
      window.location.reload();  
    });
  });
  
  });

 

  

  
  
   
