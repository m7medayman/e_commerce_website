import { ProductsModel } from "../model/products_model.js";
import { ProductsView } from "../view/products_view.js";
import { ProductModel } from "../../../../core/models/product_model.js";
import { ProductFormController } from "../../add_product/controller/product_form_controller.js";
import { EditProductController } from "../../edit_product/controller/edit_product_controller.js";
export class ProductsController {
    constructor() {
    }
    init() {
        this.model = new ProductsModel();
        this.view = new ProductsView();
        this.data = this.model.getBySellerId();
        this.view.render(this.data);
        this.handleAddClick();
        this.setupEventListeners();
        
    }

    // handleAddClick() {
    //     document.getElementById('add_button').addEventListener('click', () => {
    //         window.location.href = 'add_product.html';
    //     })
    // }
    handleAddClick() {
        document.getElementById('add_button').addEventListener('click', () => {
          new ProductFormController(() => {
            this.init();
          });
        });
    }
    setupEventListeners() {
        const container = document.getElementById('container');
        container.addEventListener('click', (e) => {
            const editIcon = e.target.closest('.edit-icon');
            const deleteIcon = e.target.closest('.delete-icon');

            if (editIcon) {
                const productId = editIcon.dataset.id;
                this.handleEditClick(productId);
            } else if (deleteIcon) {
                const productId = deleteIcon.dataset.id;
                this.handleDeleteClick(productId);
            }
        });
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                this.filterProducts(searchTerm);
            });
        }
    }

    handleEditClick(productId) {
        this.view.app.innerHTML = `<div id="container"></div>`;
        // window.location.href = `edit_product.html?productId=${productId}`;
        new EditProductController(productId, () => {
                 this.init();
          }).init();
    }

    handleDeleteClick(productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            ProductModel.delete(productId);
            this.init();
        }
    }



    filterProducts(searchTerm) {
        let filteredProducts = this.data;
        if (searchTerm) {
             filteredProducts = this.data.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
            this.view.render(filteredProducts,searchTerm);
        }
        
        
    }


}