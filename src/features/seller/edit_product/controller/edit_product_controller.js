import { EditProductModel } from "../model/edit_product_model.js";
import { EditProductView } from "../view/edit_product_view.js";
import { ProductModel } from "../../../../core/models/product_model.js";
export class EditProductController{
    constructor(productId){
        this.productId = productId;
        this.model= new EditProductModel(productId);
        
        this.view = new EditProductView();
    }
    init(){
        this.product = this.model.getProduct();
        this.view.render(this.product);
        this.setupEventListeners();
    }


    // handleSubmit(form, formData) {
    //     if (!form.checkValidity()) {
    //         form.classList.add('was-validated');
    //         return;
    //     }
    //     const productData = {
    //       name: formData.get('productName'),
    //       description: formData.get('description'),
    //       category: formData.get('productCategory'),
    //       price: parseFloat(formData.get('productPrice')),
    //       stock: parseInt(formData.get('productStock')),
    //       detailedImages: formData.get('imageUrl').split(','),
    //       measuarment: formData.get('productMeasurement'),
    //       discount: parseFloat(formData.get('productDiscount')) || 0,
    //       sellerId: 'seller-2'
    //     };
    //     ProductModel.add(productData);
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
                window.location.href = 'products.html';
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
            detailedImages: [document.getElementById('image').value],
            measuarment: parseFloat(document.getElementById('measuarment').value),
            sellerId:'seller-2'
        };
        console.log(updates);

        try {
            ProductModel.update(this.productId, updates);
            window.location.href = 'products.html';
        } catch (error) {
            alert('Error updating product: ' + error.message);
        }
    }
}