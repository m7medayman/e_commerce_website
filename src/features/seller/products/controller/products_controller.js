import { ProductsModel } from "../model/products_model.js";
import { ProductsView } from "../view/products_view.js";
export class ProductsController {
    constructor(sellerId) {
        this.sellerId = sellerId;
        this.model = new ProductsModel();
        this.data = this.model.getBySellerId('seller-2');
        this.view = new ProductsView(this.data);
        this.handleAddClick();
        this.setupEventListeners();
    }

    handleAddClick() {
        document.getElementById('add_button').addEventListener('click', () => {
            window.location.href = 'add_product.html';
        })
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
    }

    handleEditClick(productId) {
        window.location.href = `edit_product.html?productId=${productId}`;
    }

    handleDeleteClick(productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            ProductModel.delete(productId);
            this.model = ProductModel.getBySellerId(this.sellerId);
            this.view.render(this.model);
        }
    }


}