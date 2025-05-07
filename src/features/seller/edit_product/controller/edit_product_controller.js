import { EditProductModel } from "../model/edit_product_model.js";
import { EditProductView } from "../view/edit_product_view.js";
import { ProductModel } from "../../../../core/models/product_model.js";
export class EditProductController{
    constructor(productId , onDone){
        this.onDone = onDone;
        this.productId = productId;
        this.model= new EditProductModel(productId);
        this.view = new EditProductView();
    }
    init(){
        this.product = this.model.getProduct();
        this.view.render(this.product);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const form = document.getElementById('editProductForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }

        const cancelButton = document.querySelector('.btn-danger');
        if (cancelButton) {
            cancelButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.onDone();
                // window.location.href = 'products.html';
            });
        }
    }

    handleFormSubmit() {
        const updates = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            price: parseFloat(document.getElementById('price').value),
            stock: parseInt(document.getElementById('stock').value),
            category: document.getElementById('category').value,
            discount: parseInt(document.getElementById('discount').value) || 0,
            detailedImages: JSON.parse(document.getElementById('newImagesBase64')?.value || '[]'),
            measuarment: parseFloat(document.getElementById('measuarment').value),
            sellerId:'seller-2'
        };
        console.log(updates);

        try {
            ProductModel.update(this.productId, updates);
            // window.location.href = 'products.html';
            this.onDone();
        } catch (error) {
            alert('Error updating product: ' + error.message);
        }
    }
}